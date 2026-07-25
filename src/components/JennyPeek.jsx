import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

/*
 * Jenny's peek-over-the-ledge hero. Four separate meshopt GLBs — head, left
 * hand, right hand, tongue (body cut off, exported from Nomad) — assembled here
 * rather than rigged: the hands stay put gripping her wordmark while the head
 * bobs up and down behind it on scroll and turns to face the cursor. The tongue
 * hangs off the head, so it rides along and stretches on hover.
 *
 * There is no ledge geometry: the "ledge" is a clipping plane at LEDGE_Y that
 * cuts head, hands and tongue off in a straight line, and the JENNY ZHANG
 * wordmark sits on that line with her fingers curling over the letters.
 *
 * Interactions all read the *window* pointer/scroll, and the canvas is
 * pointer-events-none, so nothing here ever eats a click meant for the page.
 */

const HEAD_URL = "/ip/jenny-head.glb"
const LH_URL = "/ip/jenny-lh.glb"
const RH_URL = "/ip/jenny-rh.glb"
const TONGUE_URL = "/ip/jenny-tongue.glb"
useGLTF.preload(HEAD_URL)
useGLTF.preload(LH_URL)
useGLTF.preload(RH_URL)
useGLTF.preload(TONGUE_URL)

// --- tunables (world units; head is normalised to HEAD_H tall) -------------
const RIG_X = 0 // centred in the frame
const HEAD_H = 2.6
const HEAD_Z = -0.25
const HEAD_YAW0 = -Math.PI / 2 // export faces +X; turn her to face the camera
/*
 * Head centre at the top of the page. The export's lowest point is HEAD_H/2
 * below the centre (just under her collar), so seating the centre at
 * LEDGE_Y + HEAD_H/2 lands the cut right on that collar — the most neck the model
 * has, sitting on the ledge. Any higher and the cut edge lifts clear of the line
 * and she floats. This tracks HEAD_H, so the neck stays on the line as she scales.
 */
const HEAD_UP_Y = 0.48
const HEAD_DOWN_Y = -2.6 // head centre once scrolled past the hero (hidden)
const REVEAL_PX = 420 // scroll distance over which she ducks away

const HAND_W = 0.8 // width of each hand
const HANDS_GAP = 3.25 // centre-to-centre distance between the two hands
const HANDS_UP_Y = -0.78 // fingers clear the top of the letters, palm sits behind them
/*
 * How far they get before they are gone. Deliberately short: the lettering runs
 * out at its baseline, roughly half a hand below the ledge, and past that there
 * is nothing to hide behind — a hand that travels further is a hand hanging in
 * open background under the wordmark. The fade below is what actually removes
 * them; this is only how far they slide while it happens.
 */
const HANDS_DOWN_Y = -1.1
/*
 * Neutral multipliers on the two exports — luminance only, no hue shift.
 *
 * The head texture carries baked shading and came out of the export dark, so it
 * is lifted above 1 to bring her face up. The two exports were also baked with
 * different skin — the head's median is (171,140,111) against the hands'
 * (218,171,129) — so the hands still sit well under the head to land on the same
 * tone. The ratio between the two is what keeps face and hands matched; move one
 * and move the other with it.
 */
const HEAD_TINT = 1.16
const HAND_TINT = 0.94
/*
 * The hands travel in depth with their grip. Gripping, they sit in *front* of the
 * wordmark (HANDS_Z_GRIP > NAME_Z) so the fingers hooking over the top edge paint
 * on top of the letters. As they let go they pull back behind the wall
 * (HANDS_Z_GONE < WALL_Z), so the wall occludes them cleanly the moment they are
 * below the line — no stray fingertips left floating in front of it. Interpolated
 * by `grip`, so the pull-back reads as part of the release.
 */
const HANDS_Z_GRIP = 0.0
const HANDS_Z_GONE = -0.5
const HAND_ROT = [0, -Math.PI / 2, 0]
// Scroll window over which the hands let go, as a fraction of REVEAL_PX. Tied to
// the head fade (HEAD_FADE_TOP..BOT lands ~0.06..0.28 of the scroll): the hands
// leave with her, so there are never disembodied hands gripping the letters once
// her head is gone.
const GRIP_OUT = [0.06, 0.28]
/*
 * How far the hands tip out of the ledge plane once they are fully off it.
 * Rotation is about X, and the sign is the direction of travel, so from a seat
 * out to her left the hand turns anticlockwise all the way down — falling away
 * over the back of the ledge until it is gone — and clockwise on the way back,
 * swinging in from behind and flattening onto the letters as it takes hold.
 *
 * Near a quarter turn: at that angle the hand is edge-on and has read as gone
 * before the fade finishes it off.
 */
const TIP_MAX = 1.5
/*
 * The tip hinges here rather than at the middle of the hand — roughly the wrist,
 * measured down from the piece's own centre — so it falls over the ledge instead
 * of spinning on the spot. It is taken back out of the group's Y so the resting
 * heights above still mean where the hand actually sits.
 */
const HAND_PIVOT = 0.34

const smoothstep = (a, b, x) => {
  const u = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return u * u * (3 - 2 * u)
}

// The ledge line — the top edge of the wall. The wordmark is treated as a solid
// wall: everything below this line is hidden *behind* it, everything above peeks
// over. The Wall below is an invisible occluder that enforces that for the whole
// band (gaps between letters included), so nothing shows through the wordmark.
// The head is also clipped here, purely so its cut edge stays crisp on the line.
const LEDGE_Y = -0.82
// The wall plane's depth. Just behind the letters, so it hides the head and the
// palms (which sit further back) while the fingers hooking over the front — which
// the rig keeps in front of the letters — stay visible above the line. As a hand
// lets go it rotates back through this plane and is occluded, no fade needed.
const WALL_Z = -0.05

// The wordmark that replaces the ledge: cap-height top sits on LEDGE_Y, and it
// sits in front of both the head and the hands, so the letters paint over the
// palms while the fingers hook over the top edge.
const NAME = "JENNY ZHANG"
const NAME_W = 5.85 // world width of the lettering
const NAME_Z = -0.02
const NAME_COLOR = "#0b2b45" // --ink for [data-world="jenny"]

const MAX_YAW = 0.5
// the head pivots about its bounding-box centre, which sits well below the face,
// so a little pitch swings the face a long way — keep it small or she nods over
const MAX_PITCH = 0.1

// tongue, parented to the head (in the mouse-follow frame, +Z = mouth-forward).
// Anchored at the mouth, tilted forward, stretches down on hover.
// Anchored to the mouth in head-local units, so every distance here scales with
// HEAD_H (tuned at 2.0, now 2.6 → ×1.3) to stay stuck to the lip as she grows.
const TONGUE = { x: -0.052, y: -0.845, z: 0.858, w: 0.286, tilt: 0.45, restLen: 0.117, pullLen: 0.39 }

/*
 * useGLTF caches the parsed scene and `scene.clone()` shares its materials, so
 * this always assigns — passing no plane has to actively clear one set earlier,
 * or the piece stays clipped for the life of the cache entry. Same for the tint.
 */
function applyMaterial(root, clip, tint) {
  root.traverse((o) => {
    if (!o.isMesh) return
    const mats = Array.isArray(o.material) ? o.material : [o.material]
    mats.forEach((m) => {
      m.clippingPlanes = clip ?? null
      m.color.setScalar(tint)
      // Opaque, so the pieces write depth and the wall can occlude them cleanly.
      m.transparent = false
      m.opacity = 1
      m.needsUpdate = true
    })
  })
}

// One reusable box/vec so per-frame framing math allocates nothing.
function Piece({ url, targetSize, mode = "height", clip, tint = 1 }) {
  const { scene } = useGLTF(url)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const { scale, center } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    const c = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(c)
    const dim = mode === "height" ? size.y : mode === "width" ? size.x : size.z
    return { scale: targetSize / dim, center: c }
  }, [cloned, targetSize, mode])
  useMemo(() => applyMaterial(cloned, clip, tint), [cloned, clip, tint])
  return (
    <group scale={scale}>
      <primitive object={cloned} position={[-center.x, -center.y, -center.z]} />
    </group>
  )
}

/*
 * The tongue GLB stands up its own +Y with the root at the top and the tip at
 * the bottom, and it is flat across Z rather than X — so it is hung from its
 * root at the origin and yawed a quarter turn to face the camera broad-side.
 * Normalised to unit length, so the parent group's Y scale alone sets how far
 * it lolls out.
 */
function Tongue({ clip }) {
  const { scene } = useGLTF(TONGUE_URL)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const s = new THREE.Vector3()
    const c = new THREE.Vector3()
    box.getSize(s)
    box.getCenter(c)
    // width is the model's Z, so TONGUE.w reads as the on-screen width
    const w = TONGUE.w / s.z
    return { scale: [w, 1 / s.y, w], offset: [-c.x, -box.max.y, -c.z] }
  }, [cloned])
  useMemo(() => applyMaterial(cloned, clip, 1), [cloned, clip])
  return (
    <group rotation={[0, -Math.PI / 2, 0]} scale={scale}>
      <primitive object={cloned} position={offset} />
    </group>
  )
}

/*
 * "JENNY ZHANG" rasterised into a canvas texture rather than loaded as a 3D
 * font: it is one flat word, the site has no webfont to reuse, and this keeps
 * the type in the page's own system stack. The plane is sized from the measured
 * glyph box so the cap-height top lands exactly on LEDGE_Y.
 */
function Wordmark() {
  const { texture, px } = useMemo(() => {
    const fontPx = 360
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const font = `900 ${fontPx}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`
    ctx.letterSpacing = "0.04em"
    ctx.font = font
    const m = ctx.measureText(NAME)
    const textW = m.width
    const capH = m.actualBoundingBoxAscent
    const pad = Math.ceil(fontPx * 0.12) // breathing room for antialiasing
    canvas.width = Math.ceil(textW + pad * 2)
    canvas.height = Math.ceil(capH + pad * 2)
    // resizing the canvas resets the 2d state, so re-apply it
    ctx.letterSpacing = "0.04em"
    ctx.font = font
    ctx.fillStyle = NAME_COLOR
    ctx.textBaseline = "alphabetic"
    ctx.fillText(NAME, pad, pad + capH)

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8

    return { texture: tex, px: { w: canvas.width, h: canvas.height, textW, pad } }
  }, [])

  // On a narrow viewport the full-width lettering would run off both edges, so
  // the wordmark shrinks to fit rather than getting cropped.
  const vw = useThree((s) => s.viewport.width)
  const { planeW, planeH, y } = useMemo(() => {
    const u = Math.min(NAME_W, vw * 0.9) / px.textW // px → world units
    // centre the plane so its cap-height top (pad below the plane top) is LEDGE_Y
    return { planeW: px.w * u, planeH: px.h * u, y: LEDGE_Y - (px.h * u) / 2 + px.pad * u }
  }, [px, vw])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <mesh position={[RIG_X, y, NAME_Z]}>
      <planeGeometry args={[planeW, planeH]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

/*
 * The wall. An invisible plane filling the whole frame below the ledge line: it
 * writes depth but paints no colour (colorWrite off), so wherever the head or a
 * palm sits behind it below the line, that pixel is left as page background —
 * the wordmark reads as a solid wall the character hides behind, gaps and all.
 * Drawn first (renderOrder -1) so its depth is laid down before the pieces test
 * against it. Sized off the viewport so it always reaches every edge.
 */
function Wall() {
  const vw = useThree((s) => s.viewport.width)
  const vh = useThree((s) => s.viewport.height)
  const W = vw * 2
  const H = vh * 2
  return (
    <mesh position={[RIG_X, LEDGE_Y - H / 2, WALL_Z]} renderOrder={-1}>
      <planeGeometry args={[W, H]} />
      <meshBasicMaterial colorWrite={false} />
    </mesh>
  )
}

function Rig() {
  const head = useRef(null)
  const tongue = useRef(null)
  const hands = [useRef(null), useRef(null)]
  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  const tongueTarget = useRef(0)
  const tongueNow = useRef(0)
  const time = useRef(0) // own clock for the idle fidget
  // keeps only what is above the ledge line — this is the "ledge". Head and tongue
  // share it, so the tongue is cut at the top edge too and never lolls below the
  // line in front of the wall (where the wall could not hide it).
  const clip = useMemo(() => [new THREE.Plane(new THREE.Vector3(0, 1, 0), -LEDGE_Y)], [])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
      // Tongue reacts to the cursor sitting in the upper third — where her face
      // lives — without needing raycast hits on a pointer-events-none canvas.
      tongueTarget.current = e.clientY < window.innerHeight * 0.5 ? 1 : 0
    }
    const onScroll = () => {
      scroll.current = Math.min(Math.max(window.scrollY / REVEAL_PX, 0), 1)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useFrame((_, dt) => {
    time.current += dt
    const t = time.current
    const h = head.current
    if (h) {
      const y = THREE.MathUtils.lerp(HEAD_UP_Y, HEAD_DOWN_Y, scroll.current)
      h.position.y = THREE.MathUtils.damp(h.position.y, y, 6, dt)
      h.rotation.y = THREE.MathUtils.damp(h.rotation.y, pointer.current.x * MAX_YAW, 8, dt)
      h.rotation.x = THREE.MathUtils.damp(h.rotation.x, pointer.current.y * MAX_PITCH, 8, dt)
    }
    tongueNow.current = THREE.MathUtils.damp(tongueNow.current, tongueTarget.current, 9, dt)
    if (tongue.current) {
      // Snap back early in the duck: the tongue's clip line sits down at the
      // letters' baseline, so it has to be gone before the head carries it there.
      const duck = 1 - Math.min(scroll.current / 0.15, 1)
      const len = (TONGUE.restLen + (TONGUE.pullLen - TONGUE.restLen) * tongueNow.current) * duck
      tongue.current.scale.y = Math.max(len, 0.0001)
      tongue.current.visible = len > 0.005
    }

    /*
     * The hands are a beat behind the head, both ways: she starts ducking before
     * they let go, and they only reach back up over the letters once she is on her
     * way up. `grip` is 1 while they are hooked over the wordmark and 0 once they
     * have dropped away — it drives the drop and how much of the idle fidget
     * survives. The depth and tip are driven off the hand's real height instead.
     */
    const grip = 1 - smoothstep(GRIP_OUT[0], GRIP_OUT[1], scroll.current)

    hands.forEach((ref, i) => {
      const g = ref.current
      if (!g) return
      const dir = i === 0 ? -1 : 1 // left hand, right hand
      const bob = Math.sin(t * 1.5 + i * 2.1) * 0.028 * grip
      const sway = pointer.current.x * 0.05 * grip
      const y = THREE.MathUtils.lerp(HANDS_DOWN_Y, HANDS_UP_Y, grip) + bob
      const x = RIG_X + dir * (HANDS_GAP / 2) + sway
      // idle wobble only — the tip out of the plane is what carries the release
      const roll = Math.sin(t * 1.1 + i * 1.4) * 0.05 * grip
      g.position.y = THREE.MathUtils.damp(g.position.y, y - HAND_PIVOT, 5, dt)
      g.position.x = THREE.MathUtils.damp(g.position.x, x, 5, dt)
      /*
       * Both the depth and the tip read off where the hand *actually is*, not off
       * the scroll — a single `show` that is 1 when it is up gripping the ledge and
       * 0 once it has dropped below the line. That gates the visible pose (forward
       * over the letters, flat) to at-or-above the line: below it the hand is always
       * pulled behind the wall AND tilted back, so nothing ever poked forward under
       * the wordmark. It reads the same regardless of scroll direction or speed, so
       * going down the fingers tuck away and coming up they come back out to grip —
       * no latched turn direction that races the position and shows a stray fingertip.
       */
      const handY = g.position.y + HAND_PIVOT
      const show = smoothstep(LEDGE_Y - 0.03, HANDS_UP_Y, handY)
      // Straight off `show` (already smooth via the damped height), so depth and
      // tip never lag the position — no window where one is forward while the hand
      // is below the line.
      g.position.z = THREE.MathUtils.lerp(HANDS_Z_GONE, HANDS_Z_GRIP, show)
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, roll, 5, dt)
      g.rotation.x = -TIP_MAX * (1 - show)
    })
  })

  return (
    <>
      <group ref={head} position={[RIG_X, HEAD_UP_Y, HEAD_Z]}>
        <group rotation={[0, HEAD_YAW0, 0]}>
          <Piece url={HEAD_URL} targetSize={HEAD_H} mode="height" clip={clip} tint={HEAD_TINT} />
        </group>
        {/* tongue: unit-length model pivoted at the mouth, scaled in Y to stretch */}
        <group ref={tongue} position={[TONGUE.x, TONGUE.y, TONGUE.z]} rotation={[TONGUE.tilt, 0, 0]}>
          <Tongue clip={clip} />
        </group>
      </group>

      {/* Outer group is the animated one, and its origin is the hinge down at the
          wrist; the inner group lifts the piece back off that hinge and keeps the
          export's fixed quarter-turn out of the way of the animation. */}
      {[LH_URL, RH_URL].map((url, i) => (
        <group
          key={url}
          ref={hands[i]}
          position={[RIG_X + (i === 0 ? -1 : 1) * (HANDS_GAP / 2), HANDS_UP_Y - HAND_PIVOT, HANDS_Z_GRIP]}
        >
          <group position={[0, HAND_PIVOT, 0]} rotation={HAND_ROT}>
            <Piece url={url} targetSize={HAND_W} mode="width" tint={HAND_TINT} />
          </group>
        </group>
      ))}

      <Wall />
      <Wordmark />

      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, 2, -3]} intensity={0.9} />
    </>
  )
}

export default function JennyPeek() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, localClippingEnabled: true }}
        camera={{ position: [0, 0, 6], fov: 30 }}
      >
        <Suspense fallback={null}>
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  )
}
