import { useState } from "react"
import OptionWheel from "./OptionWheel"
import WorkCard from "./WorkCard"
import { ui } from "../data/ui"
import { useLang } from "../lang"

/*
 * Works as a wheel instead of a ring: the titles curl around the left edge and
 * you flick, scroll or drag through them one at a time — one notch, one card.
 * Whatever the wheel settles on is the card shown alongside it, so the swipe is
 * the whole navigation.
 */
export default function WorkWheel({ works, textColor, activeColor }) {
  const { lang } = useLang()
  const T = ui[lang]
  const [i, setI] = useState(0)
  const items = works.map((w) => w[lang].name)
  const current = works[i]

  return (
    <div className="mx-auto max-w-[1000px] px-6">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:gap-10">
        {/* the wheel — one flick per card — on its own tinted panel so the
            titles read against a clean surface rather than the moving water */}
        <div
          className="relative h-[380px] overflow-hidden rounded-3xl"
          aria-label={T.work}
          style={{
            background: "color-mix(in srgb, var(--surface) 82%, transparent)",
            border: "1px solid var(--line)",
          }}
        >
          <OptionWheel
            items={items}
            defaultSelected={0}
            side="left"
            fontSize={1.5}
            spacing={1.9}
            curve={1}
            tilt={6}
            blur={1.1}
            fade={0.4}
            minOpacity={0.12}
            inset={28}
            smoothing={220}
            textColor={textColor}
            activeColor={activeColor}
            onChange={(idx) => setI(idx)}
          />
        </div>

        {/* the card the wheel is pointing at */}
        <div className="mx-auto w-full max-w-[360px]">
          {current && <WorkCard key={current.id} work={current} />}
        </div>
      </div>

      <p className="mt-6 text-center text-[12px]" style={{ color: "var(--dim)" }}>
        {T.spinHint}
      </p>
    </div>
  )
}
