import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { flushSync } from "react-dom"

/*
 * Site language. English and Mandarin are peers — the studio is bilingual, so
 * the whole site switches at once from one control. Choice is remembered.
 */
const LangCtx = createContext({ lang: "en", setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("rs-lang") === "zh" ? "zh" : "en")

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
 *
 * On a phone it shortens to 中 / EN. The nav is a fixed pill centred on the
 * viewport and this sits fixed in the top-right corner; at full width the two
 * collided under about 420px and the toggle covered the third tab, which made
 * Jane's page unreachable from a phone.
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
        aria-label="切换为中文"
        aria-pressed={lang === "zh"}
        onClick={() => setLang("zh")}
        style={{ color: lang === "zh" ? "var(--ink)" : "var(--dim)", fontWeight: lang === "zh" ? 600 : 400 }}
      >
        <span className="sm:hidden">中</span>
        <span className="hidden sm:inline">中文</span>
      </button>
      <span style={{ color: "var(--line)" }}>/</span>
      <button
        aria-label="Switch to English"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        style={{ color: lang === "en" ? "var(--ink)" : "var(--dim)", fontWeight: lang === "en" ? 600 : 400 }}
      >
        <span className="sm:hidden">EN</span>
        <span className="hidden sm:inline">English</span>
      </button>
    </div>
  )
}
