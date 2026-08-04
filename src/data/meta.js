/*
 * What each page calls itself. One source, read twice: `scripts/prerender.mjs`
 * bakes it into a real HTML file per route at build time, and `useDocumentMeta`
 * re-applies it in the browser when the route or the language changes.
 *
 * Both are needed, and for different readers. Link-preview crawlers — WeChat,
 * LinkedIn, WhatsApp, Slack, iMessage — fetch the URL and parse the HTML without
 * ever running JavaScript, so anything React sets arrives too late for them; the
 * baked file is what they see. Google does run the page, and a visitor's browser
 * tab has to follow the language toggle, which the baked file cannot.
 *
 * Titles are front-loaded on purpose. A tab with three or four pages open shows
 * about the first twenty characters, so the part that tells these three pages
 * apart — RabbitShark / Jenny Zhang / Jane Zhang — comes first and the studio
 * credit trails behind where being cut off costs nothing.
 */
export const SITE = "https://rabbitshark.space"

export const META = {
  "/": {
    image: "/og/studio.png",
    en: {
      title: "RabbitShark — AI systems, built by two people",
      desc: "A two-person studio. You get a full product team — strategy, engineering, design — without hiring one. Eight products shipped.",
    },
    zh: {
      title: "RabbitShark — 两个人的 AI 产品工作室",
      desc: "两个人的工作室。你拿到的是一支完整的产品团队——策略、工程、设计——但不用招人。八个产品已上线。",
    },
  },
  "/jenny": {
    image: "/og/jenny.png",
    en: {
      title: "Jenny Zhang — AI Product Engineer · RabbitShark",
      desc: "I build the system your business actually needs. Seven products shipped, one automation handling 100+ requests a day.",
    },
    zh: {
      title: "Jenny Zhang — AI 产品工程师 · RabbitShark",
      desc: "把复杂的问题，做成能用的产品。已上线七个产品，一套自动化每天处理 100 多条工单。",
    },
  },
  "/jane": {
    image: "/og/jane.png",
    en: {
      title: "Jane Zhang — Product & Brand Design · RabbitShark",
      desc: "Product experience, interface design and brand direction — a screen carried from first wireframe through to shipped React.",
    },
    zh: {
      title: "Jane Zhang — 产品与品牌设计 · RabbitShark",
      desc: "产品体验、界面设计与品牌方向：一块屏，从第一张线框图做到上线的 React。",
    },
  },
}

// /jenny/ and /jenny?x=1 are the same page; anything unknown falls back to the
// studio's card rather than shipping a blank one.
export const metaFor = (pathname) => {
  const first = (pathname || "").split("/").filter(Boolean)[0]
  return META["/" + (first ?? "")] ?? META["/"]
}
