import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

/*
 * The rabbit and the shark, alive and in colour.
 *
 * The site says "a rabbit, a shark" in its first paragraph. This draws the pair:
 * one silhouette each, generated per frame, in the two colours the rest of the
 * site already uses for the two people — Jane's warm, Jenny's cool.
 *
 * How the drawing works:
 *
 *   1. The outline is polar. A radius function r(angle) starts from an ellipse
 *      and adds bumps: round ones for ears and cheeks, straight-sided cones for
 *      fins. Everything an animal is made of is a bump on a circle, so the ears
 *      can twitch and the fins can sweep without a second shape or a keyframe.
 *   2. Those samples become one closed Catmull-Rom curve, so the creature is a
 *      single path and can never come apart at a seam.
 *   3. Belly, mouth, teeth and eyes are painted on top and clipped to that same
 *      path, which is why the belly can run right off the edge of the body and
 *      still stop exactly at the outline while the outline is still moving.
 *
 * How the acting works: a cycle of short acts, roughly two seconds each, the way
 * a real idle animation is built — think, wink, grin, startle, spark, then back
 * to breathing. Each act only writes a handful of numbers (how open the eyes
 * are, how much they smile, where the body is, which little thing floats over
 * the head), and every one of those numbers is eased toward rather than set, so
 * acts run into each other instead of cutting. The two creatures start at
 * different points in the cycle with their own jitter, so they never perform in
 * lockstep — which is the thing that would give the whole trick away.
 *
 * React renders the markup once. Everything after that is attribute writes
 * inside one rAF, which stops the moment the pair scrolls off screen.
 */

const TAU = Math.PI * 2
const UP = -Math.PI / 2

// Shortest signed distance between two angles, so a bump sitting at the top
// doesn't tear where the angle list wraps past 2π.
function delta(a, b) {
  let d = (a - b) % TAU
  if (d > Math.PI) d -= TAU
  if (d < -Math.PI) d += TAU
  return d
}

// A bump that grew: round tip, soft shoulders. Ears, cheeks, bellies.
const soft = (d, w) => Math.exp(-((d / w) ** 2))
// A bump that was cut: flat sides, a point at the end. Fins, only ever fins.
const sharp = (d, w) => Math.max(0, 1 - Math.abs(d) / w) ** 0.85

const lerp = (a, b, k) => a + (b - a) * k
const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n)
const n2 = n => Math.round(n * 100) / 100
// Out and back: every pop, jolt and hop in here is one of these.
const pop = p => Math.sin(Math.PI * clamp(p, 0, 1))
// On at the start, off at the end, flat in the middle — for anything that has
// to appear, be looked at, and leave.
const hold = (p, rise = 0.18, fall = 0.82) =>
  p < rise ? clamp(p / rise, 0, 1) : p > fall ? clamp((1 - p) / (1 - fall), 0, 1) : 1

/*
 * Where to take samples. Uniform spacing wastes points on the plain sides of the
 * body and starves the ears — an ear only 0.12rad wide falls between two samples
 * of a 96-point ring and disappears. So each species declares the arcs it keeps
 * detail in, and those get their own run of points.
 */
function angleRing(dense) {
  const out = []
  for (let i = 0; i < 84; i++) out.push((i / 84) * TAU)
  for (const [center, span] of dense)
    for (let i = 0; i <= 16; i++) out.push(center + (i / 16 - 0.5) * span)
  return out.map(a => ((a % TAU) + TAU) % TAU).sort((x, y) => x - y)
}

/*
 * Samples to one closed curve. Tangents are weighted by chord length rather than
 * assuming even spacing: the sample ring deliberately isn't even, and plain
 * Catmull-Rom would overshoot into a loop exactly where the points bunch up —
 * which is to say at the tip of every ear.
 */
function curve(points) {
  const n = points.length
  const dist = i => Math.hypot(points[(i + 1) % n][0] - points[i][0], points[(i + 1) % n][1] - points[i][1]) || 1e-4
  let d = `M${n2(points[0][0])} ${n2(points[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n], p1 = points[i], p2 = points[(i + 1) % n], p3 = points[(i + 2) % n]
    const d0 = dist((i - 1 + n) % n), d1 = dist(i), d2 = dist((i + 1) % n)
    const k1 = d1 / (d0 + d1) / 3, k2 = d1 / (d1 + d2) / 3
    d += `C${n2(p1[0] + (p2[0] - p0[0]) * k1)} ${n2(p1[1] + (p2[1] - p0[1]) * k1)} ` +
         `${n2(p2[0] - (p3[0] - p1[0]) * k2)} ${n2(p2[1] - (p3[1] - p1[1]) * k2)} ` +
         `${n2(p2[0])} ${n2(p2[1])}`
  }
  return d + "Z"
}

// A point on a quadratic, used to hang teeth off the curve of a mouth.
const onQuad = (a, b, c, s) => [
  (1 - s) ** 2 * a[0] + 2 * (1 - s) * s * b[0] + s * s * c[0],
  (1 - s) ** 2 * a[1] + 2 * (1 - s) * s * b[1] + s * s * c[1],
]

/*
 * One eye. Open, it is a vertical capsule — the same pill bloub uses, and the
 * reason that face reads as a face with nothing else drawn on it. Shut, that
 * capsule flattens through a circle into a rounded bar, because the corner
 * radius is always half the short side: blinking is one number, and there is no
 * second drawing to keep in sync.
 */
function pill(cx, cy, w, h) {
  const ww = Math.max(1.5, w)
  const hh = Math.max(ww * 0.22, h)
  const x = cx - ww / 2, y = cy - hh / 2, r = Math.min(ww, hh) / 2
  return `M${n2(x + r)} ${n2(y)}h${n2(ww - 2 * r)}a${n2(r)} ${n2(r)} 0 0 1 ${n2(r)} ${n2(r)}` +
    `v${n2(hh - 2 * r)}a${n2(r)} ${n2(r)} 0 0 1 ${n2(-r)} ${n2(r)}h${n2(-(ww - 2 * r))}` +
    `a${n2(r)} ${n2(r)} 0 0 1 ${n2(-r)} ${n2(-r)}v${n2(-(hh - 2 * r))}a${n2(r)} ${n2(r)} 0 0 1 ${n2(r)} ${n2(-r)}Z`
}

/*
 * The one shape a rectangle cannot make: the arch of a smile. It is a spine,
 * stroked with round caps, so its ends match the capsule's exactly. Swapping
 * between the two would pop, so the act that calls for it shuts the eyes on the
 * way in and the swap happens behind a blink — which is also what a face does.
 */
function archEye(cx, cy, w, h) {
  // Kept inside the footprint of the capsule it replaces. An arch as wide as
  // the eye is tall stops reading as a smile and starts reading as eyebrows.
  const r = w * 0.6
  return `M${n2(cx - r)} ${n2(cy + h * 0.1)}Q${n2(cx)} ${n2(cy - h * 0.5)} ${n2(cx + r)} ${n2(cy + h * 0.1)}`
}

// Both eyes of one face, at whatever the acts have set them to.
function eyePair(cx, cy, w, h, gap, e) {
  const smiling = e.curve > 0.5
  const one = (x, lid) => smiling
    ? { d: archEye(x, cy, w, h), arch: true, thick: w * 0.48 }
    : { d: pill(x, cy, w, h * clamp(lid, 0, 1.3)), arch: false }
  return [one(cx - gap, e.lid), one(cx + gap, e.lid * e.winkR)]
}

/*
 * Morph targets.
 *
 * A creature here is a radius function, so becoming something else is just
 * easing toward a different radius function — no second drawing, no keyframes,
 * and the ears and fins disappear on their own because the target hasn't got
 * any. Both targets below are written as polar formulas for that reason.
 *
 * The shapes are ours rather than the generic egg/hexagon/triangle: turning our
 * rabbit into a hexagon costs us the only thing that makes it our rabbit. An
 * exclamation mark says something, and the six-armed asterisk is already the
 * studio's own mark, printed all over the rest of the site.
 */

// A superellipse, tall and narrow with soft corners: the stroke of a "!".
function bangR(a) {
  const n = 6
  return 1 / ((Math.abs(Math.cos(a) / 11.5) ** n + Math.abs(Math.sin(a) / 56) ** n) ** (1 / n))
}

// Six arms, because |cos 3θ| has six lobes. The exponent is how fast an arm
// falls away to nothing: low and the arms fatten until the thing is a flower,
// high and they taper the way the studio's own asterisk does.
function starR(a) {
  return 80 * (0.15 + 0.85 * Math.abs(Math.cos(3 * a)) ** 1.8)
}

const MORPH = { bang: bangR, star: starR }

// Ease with no corners at either end, for the squeeze into a shape and back.
const smooth = p => p * p * (3 - 2 * p)

/* ---------------------------------------------------------------- rabbit -- */

const rabbit = {
  dense: [[UP - 0.31, 1.1], [UP + 0.33, 1.1]],
  hover: [72, -70],
  // Ears are two tall soft bumps that lean apart and flick independently; the
  // body is very nearly a circle, which is what keeps it reading as a rabbit
  // rather than a hare.
  radius(a, t, e) {
    const rx = 50, ry = 47
    let r = (rx * ry) / Math.hypot(ry * Math.cos(a), rx * Math.sin(a))
    const flick = Math.sin(t * 2.3) * 0.02 + e.flick * 0.5
    const perk = 1 + e.perk * 0.18
    r += 64 * perk * soft(delta(a, UP - 0.31 - flick), 0.12)
    r += 57 * perk * soft(delta(a, UP + 0.33 + flick * 1.4), 0.11)
    r += 5 * soft(delta(a, 0.55), 0.45) + 5 * soft(delta(a, Math.PI - 0.55), 0.45) // cheeks
    return r
  },
  // A pale chest, kept below the teeth: pale teeth on a pale chest is no teeth
  // at all, and the teeth are the reason anyone reads it as a rabbit.
  belly: "M-46 34C-26 24 26 24 46 34C46 70 -46 70 -46 34Z",
  // Two eyes, a triangle of a nose and the two front teeth underneath it. The
  // teeth are the whole joke; they are why it is a rabbit at 40px.
  face(e) {
    const lx = e.look.x * 4.5, ly = e.look.y * 3.5
    const s = e.eyeScale
    return {
      eyes: eyePair(lx, -3 + ly, 16 * s, 25 * s, 15.5, e),
      mouth: `M${n2(-5.6 + lx * 0.4)} ${n2(9 + ly * 0.4)} L${n2(5.6 + lx * 0.4)} ${n2(9 + ly * 0.4)} ` +
             `L${n2(lx * 0.4)} ${n2(15.4 + ly * 0.4)} Z`,
      teeth: `M${n2(-5.2 + lx * 0.4)} ${n2(16.2 + ly * 0.4 + e.open * 5)} h4.4 v6.2 a2.2 2.2 0 0 1-4.4 0 Z` +
             `M${n2(0.8 + lx * 0.4)} ${n2(16.2 + ly * 0.4 + e.open * 5)} h4.4 v6.2 a2.2 2.2 0 0 1-4.4 0 Z`,
    }
  },
  // The deep colour lives inside the ears, following the ray each ear grew along.
  marks(t, e, r) {
    return [UP - 0.31, UP + 0.33].map((base, i) => {
      const flick = Math.sin(t * 2.3) * 0.02 + e.flick * 0.5
      const a = base + (i ? flick * 1.4 : -flick)
      const tip = r(a)
      const at = tip * 0.62
      return {
        cx: Math.cos(a) * at, cy: Math.sin(a) * at,
        rx: 5.2, ry: (tip - 50) * 0.3,
        rot: (a * 180) / Math.PI - 90,
      }
    })
  },
}

/* ----------------------------------------------------------------- shark -- */

const shark = {
  dense: [[UP, 0.9], [0.5, 1.0], [Math.PI - 0.5, 1.0]],
  hover: [54, -74],
  // One dorsal cone on top, two pectoral cones sweeping at the sides. Wider
  // than the rabbit and flatter on top, so the fin has something to sit on.
  radius(a, t, e) {
    const rx = 55, ry = 45
    let r = (rx * ry) / Math.hypot(ry * Math.cos(a), rx * Math.sin(a))
    const swim = Math.sin(t * 1.5)
    r += (38 + e.perk * 9) * sharp(delta(a, UP - 0.03 + swim * 0.03), 0.135)
    r += 19 * sharp(delta(a, 0.5 + swim * 0.07), 0.17)
    r += 19 * sharp(delta(a, Math.PI - 0.5 + swim * 0.07), 0.17)
    return r
  },
  // The countershading every shark has: pale underneath, cut by a wave.
  belly: "M-58 20C-34 32 -18 26 2 30C22 34 40 26 58 16C58 70 -58 70 -58 20Z",
  // The grin is a lens with teeth hung along both edges. It opens on a poke,
  // which is the one thing everybody tries first.
  face(e) {
    const lx = e.look.x * 4.5, ly = e.look.y * 3
    const s = e.eyeScale
    const open = e.open
    const w = 25, y0 = 9 + ly * 0.4, x0 = lx * 0.4
    const top = [[x0 - w, y0], [x0, y0 - 7 - open * 6], [x0 + w, y0]]
    const bot = [[x0 + w, y0], [x0, y0 + 13 + open * 27], [x0 - w, y0]]
    const mouth = `M${n2(top[0][0])} ${n2(top[0][1])}Q${n2(top[1][0])} ${n2(top[1][1])} ${n2(top[2][0])} ${n2(top[2][1])}` +
                  `Q${n2(bot[1][0])} ${n2(bot[1][1])} ${n2(bot[2][0])} ${n2(bot[2][1])}Z`
    // Teeth point in from whichever edge they hang off, and grow as the mouth
    // opens, because a closed grin only has room for a hint of them.
    let teeth = ""
    const size = 4.2 + open * 3.4
    for (let i = 0; i < 6; i++) {
      const s2 = (i + 0.5) / 6
      const [x, y] = onQuad(top[0], top[1], top[2], s2)
      teeth += `M${n2(x - 3.1)} ${n2(y - 0.6)}L${n2(x + 3.1)} ${n2(y - 0.6)}L${n2(x)} ${n2(y + size)}Z`
    }
    if (open > 0.15) for (let i = 0; i < 5; i++) {
      const s2 = (i + 0.5) / 5
      const [x, y] = onQuad(bot[0], bot[1], bot[2], s2)
      teeth += `M${n2(x - 2.6)} ${n2(y + 0.6)}L${n2(x + 2.6)} ${n2(y + 0.6)}L${n2(x)} ${n2(y - size * 0.8)}Z`
    }
    return { eyes: eyePair(lx, -13 + ly, 15.2 * s, 23 * s, 17, e), mouth, teeth }
  },
  // Gills: three strokes on the cheek, in the deep colour.
  marks() {
    return [0, 1, 2].map(i => ({
      cx: 44 - i * 6.5, cy: -9 + i * 1.4,
      rx: 1.6, ry: 6.8 - i * 0.9,
      rot: -12,
    }))
  },
}

const SPECIES = { rabbit, shark }

const SKIN = {
  rabbit: { body: "#d1552b", deep: "#8f3517", pale: "#fbe7dc" },
  shark: { body: "#1d5fb5", deep: "#123f7e", pale: "#e6eefb" },
}

/*
 * The cycle. Each act is a name and how long it runs; `idle` between the louder
 * ones is what keeps the whole thing from reading as a showreel. `signature` is
 * whatever that species does best — the rabbit leaves the ground, the shark
 * opens the only thing it has.
 */
const CYCLE = [
  ["idle", 2.8], ["think", 3.0], ["idle", 2.2], ["grin", 2.4],
  ["wink", 1.8], ["alert", 2.6], ["idle", 2.4], ["startle", 2.2],
  ["signature", 2.4], ["idle", 2.4], ["spark", 2.8], ["mark", 2.8],
  ["idle", 3.0], ["peer", 2.4],
]

/*
 * What each act actually changes. Everything returned here is a target the
 * frame loop eases toward, except the outright movements (bounce, jolt) which
 * are read straight — those are meant to be sudden.
 */
function perform(act, p) {
  switch (act) {
    // Eyes up and away, three dots rising over the head, one at a time.
    case "think":
      return {
        lid: 0.8, gaze: [-0.55, -0.75], perk: 0.2,
        dots: hold(p, 0.15, 0.8),
        dotStep: p,
      }
    // Both eyes to arches, and the bounce that has to come with them.
    case "grin":
      return {
        curve: 1, perk: 0.5,
        shut: p < 0.18 ? pop(p / 0.18) : 0,
        bounce: -Math.abs(Math.sin(p * Math.PI * 2)) * 9,
      }
    // One eye shut, head cocked. The other eye smiles a little, or it reads as
    // a twitch rather than a wink.
    case "wink":
      return { winkR: 1 - hold(p, 0.25, 0.6), tilt: 5 * hold(p, 0.25, 0.7) }
    // Startle: eyes wide, a bang over the head, and a shiver that dies out.
    case "startle":
      return {
        eyeScale: 1 + 0.3 * hold(p, 0.1, 0.55), lid: 1.15, perk: 1,
        bang: hold(p, 0.08, 0.62),
        jolt: Math.sin(p * 34) * 4 * Math.max(0, 1 - p * 1.9),
        bounce: -pop(clamp(p * 3, 0, 1)) * 5,
      }
    // A mark of the other person's colour, swinging past. The eyes follow it,
    // which is most of what sells it.
    case "spark": {
      const swing = Math.sin(p * Math.PI)
      return {
        star: hold(p, 0.12, 0.7),
        starAt: p,
        gaze: [0.5 + swing * 0.3, -0.6],
        perk: 0.6 * swing,
      }
    }
    // The whole body folds into an exclamation mark, holds long enough to be
    // read, and springs back. It stops being an animal for about a second,
    // which is the point — you only notice a shape change that goes far enough.
    case "alert":
      return { morph: "bang", m: smooth(hold(p, 0.2, 0.72)) }
    // The same trick, landing on the studio's own asterisk, turning as it goes.
    case "mark":
      return { morph: "star", m: smooth(hold(p, 0.22, 0.74)) }
    // Half-lidded, leaning in. The one act that is about the reader, not itself.
    case "peer":
      return { lid: 0.5, eyeScale: 1.05, tilt: -3, bounce: 3 }
    case "signature":
      return { hop: pop(clamp(p / 0.55, 0, 1)), open: pop(clamp(p / 0.5, 0, 1)), perk: 0.8 }
    // Idle is not an act. It is what the breathing underneath looks like when
    // nothing is written on top of it.
    default:
      return {}
  }
}

export default function Mascot({
  species = "rabbit",
  spark = "var(--accent)",
  skin,
  size = 190,
  label,
  asleep = false,
  className = "",
}) {
  const reduced = useReducedMotion()
  // One id per instance: two mascots on a page would otherwise share a clip and
  // the second one would wear the first one's outline.
  const uid = useRef(Math.random().toString(36).slice(2, 8))
  const svg = useRef(null)
  const body = useRef(null)
  const shape = useRef(null)
  const clipShape = useRef(null)
  const eyes = useRef([])
  const mouth = useRef(null)
  const teeth = useRef(null)
  const marks = useRef([])
  const shade = useRef(null)
  const facePaint = useRef(null)
  const bangDot = useRef(null)
  const dots = useRef(null)
  const dotKids = useRef([])
  const bang = useRef(null)
  const star = useRef(null)
  const sleepy = useRef(null)
  // Read inside the loop so changing the prop doesn't tear down the animation.
  const sleeping = useRef(asleep)
  sleeping.current = asleep

  useEffect(() => {
    const spec = SPECIES[species] || rabbit
    const ring = angleRing(spec.dense)
    const el = svg.current
    const start = performance.now()
    const [hx, hy] = spec.hover

    // Pointer in the creature's own terms: -1 to 1 either side of its face, so
    // a mascot in the corner of the page still looks the right way.
    const aim = { x: 0, y: 0 }
    const look = { x: 0, y: 0 }
    let lastMove = 0
    let blink = 0, blinkAt = 1.5 + Math.random() * 3
    let flick = 0, flickAt = 3 + Math.random() * 4
    let poked = -9, perk = 0

    // Each creature starts somewhere else in the cycle, at its own tempo. Two
    // of them nodding in unison would look like one animation played twice.
    let step = Math.floor(Math.random() * CYCLE.length)
    let actStart = 0
    let actLen = CYCLE[step][1] * (0.85 + Math.random() * 0.3)
    // Everything continuous is eased toward its target rather than set, so one
    // act runs into the next.
    const now = { lid: 1, curve: 0, winkR: 1, eyeScale: 1, tilt: 0, gaze: [0, 0] }

    function draw(t) {
      // Left alone long enough, they doze off — and wake the moment the pointer
      // moves again. It is the cheapest way to make them feel like they are
      // waiting for you rather than looping at you.
      const dozing = sleeping.current || t - lastMove > 30

      if (!dozing && t - actStart > actLen) {
        actStart = t
        step = (step + 1) % CYCLE.length
        actLen = CYCLE[step][1] * (0.85 + Math.random() * 0.3)
      }
      const act = dozing ? "idle" : CYCLE[step][0]
      const p = clamp((t - actStart) / actLen, 0, 1)
      const a = perform(act, p)

      // Mid-morph the creature is somewhere between itself and a symbol, so
      // every radius is read twice and mixed. Declared up here because the
      // transforms below need it as much as the outline does.
      const m = a.m || 0
      const into = MORPH[a.morph]

      // A poke interrupts whatever was going on with the species' own move.
      const pokeP = poked < 0 ? 0 : (t - poked) / 0.62
      const live = pokeP > 0 && pokeP < 1 ? pop(pokeP) : 0
      const jump = (species === "rabbit" ? a.hop || 0 : 0) + (species === "rabbit" ? live : 0)
      const open = (species === "shark" ? a.open || 0 : 0) + (species === "shark" ? live : 0)

      const target = {
        lid: dozing ? 0.07 : a.lid ?? 1,
        curve: dozing ? 0 : a.curve ?? 0,
        winkR: a.winkR ?? 1,
        eyeScale: a.eyeScale ?? 1,
        tilt: a.tilt ?? 0,
      }
      for (const key of ["lid", "winkR", "eyeScale", "tilt"]) now[key] = lerp(now[key], target[key], 0.18)
      now.curve = lerp(now.curve, target.curve, 0.4)
      // An act that wants the eyes somewhere overrides the pointer, but only as
      // far as it is willing to ease.
      const wantGaze = dozing ? [0, 0.35] : a.gaze || [look.x, look.y]
      now.gaze[0] = lerp(now.gaze[0], wantGaze[0], a.gaze ? 0.12 : 0.2)
      now.gaze[1] = lerp(now.gaze[1], wantGaze[1], a.gaze ? 0.12 : 0.2)

      const breath = dozing ? 1 + Math.sin(t * 0.9) * 0.05 : 1 + Math.sin(t * 1.45) * 0.022
      const sway = species === "shark" ? Math.sin(t * 0.9) * 5 : Math.sin(t * 1.1) * 1.5
      // The bar of a "!" sits above its dot, so the whole thing rides up to
      // stay centred while it is one.
      const float = (dozing ? Math.sin(t * 0.9) * 3 : Math.sin(t * 1.45) * 2) - jump * 30 + (a.bounce || 0) -
        (a.morph === "bang" ? m * 16 : 0)
      const squash = 1 - jump * 0.12 + Math.min(1, open) * 0.05
      const stretch = 1 + jump * 0.16 - Math.min(1, open) * 0.05
      const tilt = now.tilt + now.gaze[0] * 4 + (a.jolt || 0) + (a.morph === "star" ? m * 60 : 0) +
        Math.sin(t * 0.9 + 0.6) * (species === "shark" ? 2.4 : 0.8)

      perk = lerp(perk, dozing ? -0.5 : (a.perk ?? 0) + jump * 0.6, 0.12)
      const env = {
        look: { x: now.gaze[0], y: now.gaze[1] },
        flick, perk, open,
        lid: Math.min(1.3, now.lid * (1 - blink) * (1 - (a.shut || 0))),
        curve: now.curve,
        winkR: now.winkR,
        eyeScale: now.eyeScale,
      }

      const r = ang => {
        const own = spec.radius(ang, t, env)
        return into && m > 0.002 ? lerp(own, into(ang), m) : own
      }
      const d = curve(ring.map(ang => { const rr = r(ang); return [Math.cos(ang) * rr, Math.sin(ang) * rr] }))
      shape.current.setAttribute("d", d)
      clipShape.current.setAttribute("d", d)

      const face = spec.face(env)
      // A symbol has no face. Everything painted on top fades out as the body
      // goes, and comes back with it.
      facePaint.current.setAttribute("opacity", n2(clamp(1 - m * 1.7, 0, 1)))
      bangDot.current.setAttribute("opacity", n2(a.morph === "bang" ? clamp((m - 0.45) * 3.5, 0, 1) : 0))

      face.eyes.forEach((eye, i) => {
        const node = eyes.current[i]
        if (!node) return
        node.setAttribute("d", eye.d)
        node.setAttribute("fill", eye.arch ? "none" : "var(--surface)")
        node.setAttribute("stroke", eye.arch ? "var(--surface)" : "none")
        if (eye.arch) node.setAttribute("stroke-width", n2(eye.thick))
      })
      mouth.current.setAttribute("d", face.mouth)
      teeth.current.setAttribute("d", face.teeth)

      spec.marks(t, env, r).forEach((m, i) => {
        const node = marks.current[i]
        if (!node) return
        node.setAttribute("transform", `translate(${n2(m.cx)} ${n2(m.cy)}) rotate(${n2(m.rot)})`)
        node.setAttribute("rx", n2(m.rx))
        node.setAttribute("ry", n2(Math.max(1.5, m.ry)))
      })

      body.current.setAttribute(
        "transform",
        `translate(${n2(sway + now.gaze[0] * 5)} ${n2(float)}) rotate(${n2(tilt)}) scale(${n2(stretch * (1 / breath))} ${n2(squash * breath)})`,
      )
      // The shadow is the only cue that the hop left the ground.
      shade.current.setAttribute("rx", n2(46 - jump * 12))
      shade.current.setAttribute("opacity", n2(0.16 - jump * 0.07))

      // The things that float over the head. Each is one opacity and one
      // transform; nothing is in the DOM twice.
      const dotOn = a.dots || 0
      dots.current.setAttribute("opacity", n2(dotOn))
      if (dotOn > 0.01) dotKids.current.forEach((node, i) => {
        const up = clamp((a.dotStep - 0.1 - i * 0.13) * 5, 0, 1)
        node?.setAttribute("transform", `translate(${i * 13} ${n2(-up * 7)}) scale(${n2(0.4 + up * 0.6)})`)
      })
      bang.current.setAttribute("opacity", n2(a.bang || 0))
      if (a.bang) bang.current.setAttribute("transform", `translate(${hx} ${hy}) scale(${n2(0.6 + a.bang * 0.5)})`)
      const starOn = a.star || 0
      star.current.setAttribute("opacity", n2(starOn))
      if (starOn > 0.01) {
        const swing = a.starAt * Math.PI
        star.current.setAttribute(
          "transform",
          `translate(${n2(hx - 26 + Math.sin(swing) * 30)} ${n2(hy + 8 - Math.sin(swing) * 14)}) rotate(${n2(a.starAt * 160)})`,
        )
      }
      sleepy.current.setAttribute("opacity", dozing ? 1 : 0)
      if (dozing) sleepy.current.setAttribute("transform", `translate(0 ${n2(-Math.sin(t * 0.7) * 4)})`)
    }

    if (reduced) {
      draw(0)
      return
    }

    const onMove = e => {
      lastMove = (performance.now() - start) / 1000
      const r = el.getBoundingClientRect()
      aim.x = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 1.1), -1, 1)
      aim.y = clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 1.1), -1, 1)
    }
    const poke = () => {
      const t = (performance.now() - start) / 1000
      lastMove = t
      poked = t
      flickAt = t + 0.1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerdown", poke)

    let raf = 0
    const frame = now2 => {
      const t = (now2 - start) / 1000
      look.x = lerp(look.x, aim.x, 0.08)
      look.y = lerp(look.y, aim.y, 0.08)

      if (t > blinkAt) {
        const p = (t - blinkAt) / 0.16
        blink = p < 1 ? pop(p) : ((blinkAt = t + 2 + Math.random() * 4), 0)
      }
      if (t > flickAt) {
        const p = (t - flickAt) / 0.35
        flick = p < 1 ? Math.sin(p * Math.PI * 2) * 0.09 : ((flickAt = t + 3 + Math.random() * 5), 0)
      }

      draw(t)
      raf = requestAnimationFrame(frame)
    }

    // A first frame straight away, so the creature is never an empty box while
    // the observer makes up its mind.
    draw(0)

    /*
     * Nothing animates off screen. Two creatures rebuilding a 150-segment path
     * every frame is cheap, but not so cheap that it should keep happening
     * while the reader is four sections further down the page.
     */
    const watch = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (raf) return
        // Coming back, everything is due at once — a blink, a flick and a whole
        // act all firing on the first visible frame. Push them into the future
        // instead, and treat the return as a sign of life so they wake up.
        const t = (performance.now() - start) / 1000
        lastMove = t
        actStart = t
        blinkAt = t + 1 + Math.random() * 3
        flickAt = t + 2 + Math.random() * 4
        raf = requestAnimationFrame(frame)
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }, { rootMargin: "120px" })
    watch.observe(el)

    return () => {
      watch.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerdown", poke)
    }
  }, [species, reduced])

  const paint = { ...(SKIN[species] || SKIN.rabbit), ...skin }
  const clipId = `mascot-${species}-${uid.current}`
  const [hx, hy] = (SPECIES[species] || rabbit).hover

  return (
    <svg
      ref={svg}
      className={className}
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      // Inside a button that already names it, the creature is decoration —
      // announcing it twice is worse than not announcing it at all.
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : "true"}
      style={{ display: "block", overflow: "visible", touchAction: "manipulation" }}
    >
      <ellipse ref={shade} cx="0" cy="86" rx="46" ry="7" fill={paint.deep} opacity="0.16" />
      <g ref={body}>
        <defs>
          <clipPath id={clipId}>
            <path ref={clipShape} />
          </clipPath>
        </defs>
        {/* The body itself. Drawn rather than clipped, so its edge stays soft. */}
        <path ref={shape} fill={paint.body} />
        {/* Everything after this is clipped to that same outline, which is how
            the belly can run off the bottom and still stop at the body. */}
        {/* The dot, which is only ever seen while the body is a bar. */}
        <circle ref={bangDot} cx="0" cy="76" r="11.5" fill={paint.body} opacity="0" />
        <g ref={facePaint} clipPath={`url(#${clipId})`}>
          <path d={(SPECIES[species] || rabbit).belly} fill={paint.pale} opacity="0.9" />
          <path ref={mouth} fill={paint.deep} />
          <path ref={teeth} fill={paint.pale} />
          <path ref={n => (eyes.current[0] = n)} fill="var(--surface)" strokeLinecap="round" />
          <path ref={n => (eyes.current[1] = n)} fill="var(--surface)" strokeLinecap="round" />
          <ellipse ref={n => (marks.current[0] = n)} fill={paint.deep} />
          <ellipse ref={n => (marks.current[1] = n)} fill={paint.deep} />
          <ellipse ref={n => (marks.current[2] = n)} fill={paint.deep} />
        </g>
      </g>
      {/* Thinking. */}
      <g ref={dots} opacity="0" fill={paint.deep} transform={`translate(${hx - 13} ${hy + 6})`}>
        {[0, 1, 2].map(i => (
          <g key={i} ref={n => (dotKids.current[i] = n)}>
            <circle r="4.6" />
          </g>
        ))}
      </g>
      {/* Startled. */}
      <g ref={bang} opacity="0" fill={paint.deep}>
        <rect x="-3.2" y="-19" width="6.4" height="20" rx="3.2" />
        <circle cx="0" cy="7" r="3.8" />
      </g>
      {/* An idea, in the other one's colour — they spark off each other. */}
      <g ref={star} opacity="0" fill={spark}>
        <path d="M0 -13L3 -3.6L12.3 -6.5L6 1L12.3 8.5L3 5.6L0 15L-3 5.6L-12.3 8.5L-6 1L-12.3 -6.5L-3 -3.6Z" />
      </g>
      {/* Asleep. */}
      <g ref={sleepy} opacity="0" fill={paint.deep} fontFamily="Georgia, serif" fontStyle="italic">
        <text x="46" y="-54" fontSize="15">z</text>
        <text x="58" y="-70" fontSize="20">z</text>
        <text x="74" y="-88" fontSize="26">z</text>
      </g>
    </svg>
  )
}
