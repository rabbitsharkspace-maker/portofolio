import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { flushSync } from "react-dom"

/*
 * Site language. English and Mandarin are peers — the studio is bilingual, so
 * the whole site switches at once from one control. Choice is remembered.
 */
const LangCtx = createContext({ lang: "en", setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("rs-lang") || "en")

  /*
   * The whole page changes language at once, and swapping every word on one
   * frame reads as a glitch. The browser's own view transition cross-fades the
   * before and after for us — flushSync so the swap happens inside the
   * transition's callback rather than a tick later. Where the API is missing the
   * language still changes, just instantly, which is what it did before.
   */
  const setLang = useCallback((next) => {
    if (next === lang) return
    if (!document.startViewTransition) return setLangState(next)
    document.startViewTransition(() => flushSync(() => setLangState(next)))
  }, [lang])

  useEffect(() => {
    localStorage.setItem("rs-lang", lang)
    document.documentElement.lang = lang === "zh" ? "zh" : "en"
  }, [lang])

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}

/*
 * Toggle. Reads "中文 / English" with the inactive language dimmed — the same
 * wording the bios use.
 */
export function LangToggle({ className = "" }) {
  const { lang, setLang } = useLang()
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] backdrop-blur-md ${className}`}
      style={{
        background: "color-mix(in srgb, var(--surface) 78%, transparent)",
        border: "1px solid var(--line)",
      }}
    >
      <button
        onClick={() => setLang("zh")}
        style={{ color: lang === "zh" ? "var(--ink)" : "var(--dim)", fontWeight: lang === "zh" ? 600 : 400 }}
      >
        中文
      </button>
      <span style={{ color: "var(--line)" }}>/</span>
      <button
        onClick={() => setLang("en")}
        style={{ color: lang === "en" ? "var(--ink)" : "var(--dim)", fontWeight: lang === "en" ? 600 : 400 }}
      >
        English
      </button>
    </div>
  )
}
