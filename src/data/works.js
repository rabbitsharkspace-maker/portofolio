// owner drives the card border colour. Nothing else needs to know who built what.
import { BLUE, YELLOW, GREEN } from "../theme"

export const OWNER = {
  jenny: { label: { en: "Jenny", zh: "Jenny" }, color: BLUE },
  jane: { label: { en: "Jane", zh: "Jane" }, color: YELLOW },
  both: { label: { en: "Jenny & Jane", zh: "Jenny 与 Jane" }, color: GREEN },
}

// Interleaved on purpose: Jenny, Jane, Jenny, both, ... The ring wraps, so
// the last entry sits next to the first — keep that pair different too.
// name/kind/what/who are bilingual; id/owner/stack/link/image are shared.
// `image` is what hangs in the gallery frame on a person's page; null leaves the
// frame empty rather than breaking the layout.
export const works = [
  {
    id: "kno",
    owner: "jenny",
    stack: ["Gemini", "Knowledge graph", "Full-stack"],
    link: "https://knoko.space",
    embed: "https://knoko.space/", // live preview shown in Jenny's work section
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "Kno",
      kind: "AI knowledge platform",
      what: "Drop anything in — PDFs, links, voice notes — and it becomes a knowledge graph you can walk.",
      who: "For people who save everything and reopen nothing.",
    },
    zh: {
      name: "Kno",
      kind: "AI 知识平台",
      what: "资料丢进去,自动变成一张能走进去的知识图谱。",
      who: "给什么都存下来、却从不打开的人。",
    },
  },
  {
    id: "fastresume",
    owner: "jane",
    stack: ["AI", "Full-stack", "Voice"],
    link: "https://fastresume.xyz",
    embed: "https://www.fastresume.xyz/", // live preview shown in the work section
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "FastResume",
      kind: "AI career suite",
      what: "Scores ATS fit, rewrites your experience in STAR form, translates to 8 languages, runs voice mock interviews.",
      who: "For job seekers applying across borders.",
    },
    zh: {
      name: "FastResume",
      kind: "AI 求职平台",
      what: "上传简历和职位描述,自动打 ATS 分、按 STAR 法改写、翻成 8 种语言,还能做语音模拟面试。",
      who: "给跨国求职的人。",
    },
  },
  {
    id: "serene",
    owner: "jenny",
    stack: ["Gemini Vision", "Firebase", "Server-side AI"],
    link: null,
    embed: "https://serene-msmi.onrender.com/", // live preview shown in Jenny's work section
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "Serene",
      kind: "AI advocacy assistant",
      what: "Photograph an English fine or warning letter. It reads it and writes your formal appeal.",
      who: "For migrants and international students in Australia.",
    },
    zh: {
      name: "Serene",
      kind: "AI 维权助手",
      what: "拍下英文罚单,自动生成申诉信。",
      who: "给在澳洲的移民和留学生。",
    },
  },
  {
    id: "mkr",
    owner: "both",
    stack: ["Role-based access", "Fair Work", "Audit logs"],
    link: null,
    // No `embed`, deliberately. Nothing renders it now that there is a still,
    // and leaving it would ship the address in the bundle for anyone reading
    // the source — which is the one thing hiding it from the browser bar was
    // supposed to achieve.
    address: "My Kitchen Rules",
    // A still, not a frame. Live, this one opens on its sign-in screen, which
    // is the least of what it does — and hanging a working password box on the
    // wall says nothing about the work. The shot is the stock and costs view
    // instead. `image` wins over `embed`, so no frame boots at all: the address
    // never appears in the page, and there is nothing to click into.
    image: "/ip/mkr.webp",
    en: {
      name: "My Kitchen Rules",
      kind: "Restaurant operations",
      what: "POS, kitchen display, blind cash reconciliation and rostering in one system. It stays quiet until something needs the owner.",
      who: "For small restaurant owners doing four jobs at once.",
    },
    zh: {
      name: "My Kitchen Rules",
      kind: "餐厅运营系统",
      what: "收银、后厨、对账、排班合成一套。老板、经理、员工三套界面。",
      who: "给一个人干四份活的小餐厅老板。",
    },
  },
  {
    id: "championship",
    owner: "jenny",
    stack: ["Storyboard", "Animation", "Sound"],
    link: null,
    embed: "https://youtu.be/3z5-F9V2XIQ?si=pfH0UMzDAd9pUwc1", // YouTube, embedded in Jenny's work section
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "The 8th Annual Human Disturbance Championship",
      kind: "Animated short",
      what: "An insect stadium under an overturned flower pot. They compete to startle a human.",
      who: "3 min 48 sec · 1080P · 2026",
    },
    zh: {
      name: "第八届人类干扰锦标赛",
      kind: "动画短片",
      what: "花盆底下的昆虫运动会,比谁能吓到人类。",
      who: "3 分 48 秒 · 1080P · 2026",
    },
  },
  {
    id: "sunrise",
    owner: "jane",
    stack: ["Care operations", "AI monitoring"],
    // Same address as the preview, on purpose: the wall shows the sign-in
    // screen, so a click lands exactly where the picture promised.
    link: "https://agecare-1.onrender.com/login",
    embed: "https://agecare-1.onrender.com/login",
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "Sunrise Care",
      kind: "AI caregiver support",
      what: "Hands the paperwork, monitoring and repetition to AI so carers can spend their time on people.",
      who: "For care teams losing hours to forms.",
    },
    zh: {
      name: "Sunrise Care",
      kind: "AI 照护支持平台",
      what: "把文书、监测、重复的活儿交给 AI,让照护者有时间做人该做的事。",
      who: "给被表格吃掉时间的照护团队。",
    },
  },
  {
    id: "ticketing",
    owner: "jenny",
    stack: ["n8n", "Gemini", "WeCom API", "AES"],
    link: null,
    embed: "https://youtu.be/6UMtuA_LSOs?si=QnDXTTMBFvvPZO94", // YouTube, embedded in Jenny's work section
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "Community Ticketing",
      kind: "Workflow automation",
      what: "100+ maintenance requests a day, classified, prioritised and assigned automatically. Response goes from hours to seconds.",
      who: "For a residential community drowning in manual entry.",
    },
    zh: {
      name: "社区智能工单",
      kind: "企业自动化",
      what: "每天 100+ 条报修,AI 自动分类派单。响应从几小时变成几秒。",
      who: "给淹没在手工录入里的社区。",
    },
  },
  {
    id: "liftppt",
    owner: "both",
    stack: ["React 19", "Supabase", "pptxgenjs"],
    link: "https://liftppt.com",
    embed: "https://liftppt.com/", // live preview shown in Jenny's work section
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "liftppt",
      kind: "Worship projection tool",
      what: "Lyrics paginate, choruses expand, pinyin annotates, exports to PPT pixel-for-pixel. 2,254 songs in the library.",
      who: "For whoever is up until midnight formatting slides.",
    },
    zh: {
      name: "liftppt",
      kind: "敬拜投影工具",
      what: "歌词自动排版、注音、导出 PPT,像素级还原。2254 首曲库。",
      who: "给每周熬夜排幻灯片的人。",
    },
  },
]
