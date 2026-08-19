import { useState } from "react"
import { studio } from "../data/people"
import { ui } from "../data/ui"
import { useLang } from "../lang"

/*
 * Three boxes instead of an address. An email link asks a visitor to open a mail
 * client, invent a subject line and work out what we need to know; three labelled
 * fields ask for the three things and take about fifteen seconds.
 *
 * There is no server behind this site, so submitting composes the mail and hands
 * it to the visitor's own client already filled in — name, problem and reply
 * address in the body, so nothing they typed is lost on the way. The address
 * stays visible underneath for anyone whose machine has no mail client set up.
 *
 * ponytail: mailto is the whole backend. If enquiries ever justify it, a
 * Cloudflare Pages Function posting to an email API replaces `send` and nothing
 * above it changes.
 */
export default function ContactForm({ accent = "var(--brand)" }) {
  const { lang } = useLang()
  const T = ui[lang]
  const [form, setForm] = useState({ name: "", problem: "", email: "" })
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const problem = form.problem.trim()
    const email = form.email.trim()

    if (!name || !problem || !email) return setError(T.formIncomplete)
    // Deliberately loose: something@something.something. Anything stricter
    // rejects real addresses, and the reply itself is the real check.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError(T.formBadEmail)

    setError(null)
    const body = `${problem}\n\n— ${name}\n${email}`
    window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(
      `${T.formSubject} ${name}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    color: "var(--ink)",
  }

  return (
    <form onSubmit={send} noValidate className="mt-8 max-w-[560px]">
      <div className="space-y-3">
        <input
          value={form.name}
          onChange={set("name")}
          placeholder={T.formName}
          aria-label={T.formName}
          autoComplete="name"
          className="w-full rounded-2xl px-4 py-3 text-[14px] outline-none focus:ring-2"
          style={field}
        />
        <textarea
          value={form.problem}
          onChange={set("problem")}
          placeholder={T.formProblem}
          aria-label={T.formProblem}
          rows={4}
          className="w-full resize-y rounded-2xl px-4 py-3 text-[14px] outline-none focus:ring-2"
          style={field}
        />
        <input
          value={form.email}
          onChange={set("email")}
          placeholder={T.formEmail}
          aria-label={T.formEmail}
          type="email"
          autoComplete="email"
          className="w-full rounded-2xl px-4 py-3 text-[14px] outline-none focus:ring-2"
          style={field}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full px-6 py-3 text-[14px] transition-transform hover:scale-[1.03]"
          style={{ background: accent, color: "#12212e" }}
        >
          {T.formSend}
        </button>
        {error && (
          <span className="text-[13px]" style={{ color: "#b3261e" }}>
            {error}
          </span>
        )}
        {sent && !error && (
          <span className="text-[13px]" style={{ color: "var(--dim)" }}>
            {T.formSent}
          </span>
        )}
      </div>

      <p className="mt-5 text-[12.5px]" style={{ color: "var(--dim)" }}>
        {T.formDirect}{" "}
        <a href={`mailto:${studio.email}`} className="underline underline-offset-4">
          {studio.email}
        </a>
      </p>
    </form>
  )
}
