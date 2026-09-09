import { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Center, OrbitControls, useAnimations, useGLTF } from "@react-three/drei"

/*
 * A character's 3D self, replacing the keyed sprite. A Tripo-exported GLB shown
 * on a transparent canvas so the background reads behind them.
 *
 * The clip is optional. Jenny's export has an idle baked in and it plays; Jane's
 * is a static pose and simply doesn't, which is why the play below is guarded
 * rather than assumed. Neither is standing still on the page regardless — the
 * roster wraps both in .character-float, so the breathing is CSS either way.
 *
 * She's a thin standing figure, so <Bounds> (which fits the bounding *sphere*
 * to the portrait's narrow width) left her small and floating. Instead <Center>
 * parks her on the origin and a fixed camera frames her by height — CAM_DIST is
 * the one dial for how big she reads, independent of the canvas width. That lets
 * the box share Jane's 46:100 ratio so both characters' arrows land in the same
 * place. OrbitControls give the turntable — drag to spin, zoom/pan off, vertical
 * orbit clamped upright.
 */

// Smaller pulls the camera in and she fills more of the frame; tuned to match
// the height Jane's still stands at in the roster.
const CAM_DIST = 1.68

// Only the roster's opening pick is worth fetching up front. Preloading every
// character would cost each visitor the other models too, and these files are
// megabytes apiece — the rest can load when someone actually switches to them.
useGLTF.preload("/ip/jenny.glb")

// The roster calls this on the one who isn't on stage, once the section is in
// view and the browser is idle, so switching doesn't pay for the fetch.
export const preloadCharacter = (src) => useGLTF.preload(src)

function Model({ src, spin }) {
  const group = useRef(null)
  const { scene, animations } = useGLTF(src)
  const { actions, names } = useAnimations(animations, group)

  // Loop whatever clip the export carries, if it carries one at all (Tripo bakes
  // idle/bow into a single track). A static export leaves `names` empty.
  useEffect(() => {
    const name = names[0]
    const action = name ? actions[name] : null
    if (action) action.reset().fadeIn(0.4).play()
    return () => {
      if (action) action.fadeOut(0.2)
    }
  }, [actions, names])

  return (
    <group ref={group} rotation={[0, spin, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function CharacterModel({
  src,
  spin = 0,
  height = "clamp(340px, 58vh, 560px)",
}) {
  // A definite width, not aspect-ratio: the canvas is a block child and would
  // otherwise stretch to the column instead of deriving its width from height.
  // height * 0.46 is exactly Jane's bare CharacterStage box (46 / 100), so the
  // flanking arrows land in the identical position for both characters.
  const width = `calc(${height} * 0.46)`
  return (
    <div style={{ height, width, cursor: "grab" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, CAM_DIST], fov: 35 }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, -3]} intensity={1.2} />
        <Suspense fallback={null}>
          <Center>
            <Model src={src} spin={spin} />
          </Center>
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.45}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
      </Canvas>
    </div>
  )
}
