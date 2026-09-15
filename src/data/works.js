// `owner` is "jenny" | "jane" | "both". Who made what is painted from the two
// accents in theme.js — nothing in the data needs to carry a colour.

// Interleaved on purpose: two entries by the same person should not sit next to
// each other in the cabinet list, which is read straight down.
// name/kind/what/who are bilingual; id/owner/stack/link/image are shared.
// `image` is what hangs in the gallery frame on a person's page; null leaves the
// frame empty rather than breaking the layout.
export const works = [
  {
    id: "serene",
    owner: "jenny",
    stack: ["Gemini Vision", "Firebase", "Server-side AI"],
    link: null,
    embed: "https://serene-msmi.onrender.com/", // unused while `image` stands in
    address: "Serene — AI advocacy assistant for new migrants in Australia",
    /*
     * A still, not the live frame. The app sleeps on a free Render dyno, so a
     * cold visit hung the wall on a black rectangle for the better part of a
     * minute — the frame was showing a loading state, not the product.
     */
    image: "/ip/serene.webp",
    en: {
      name: "Serene",
      kind: "A landing copilot for newcomers",
      ground: "I have had that phone call myself. More than once.",
      what: "Photograph an English fine or warning letter. It reads it and writes your formal appeal.",
      who: "For migrants and international students in Australia.",
    },
    zh: {
      name: "Serene",
      kind: "AI 应急与维权助手",
      ground: "这通电话，我也接到过，而且不止一次",
      what: "拍下英文罚单,自动生成申诉信",
      who: "给在澳洲的移民和留学生",
    },
  },
  {
    id: "kno",
    owner: "jenny",
    stack: ["Gemini", "Knowledge graph", "Full-stack"],
    link: "https://knoko.space",
    embed: "https://knoko.space/", // unused while `image` stands in
    // A still for the same reason as the rest of the wall: three live frames on
    // one screen is three third-party page loads before anything is readable.
    image: "/ip/kno.webp",
    en: {
      name: "Kno",
      kind: "AI knowledge platform",
      what: "Drop anything in — PDFs, links, voice notes — and it becomes a knowledge graph you can walk.",
      who: "For people who save everything and reopen nothing.",
    },
    zh: {
      name: "Kno",
      kind: "AI 知识平台",
      what: "资料丢进去,自动变成一张能走进去的知识图谱",
      who: "给什么都存下来、却从不打开的人",
    },
  },
  {
    id: "fastresume",
    owner: "jane",
    stack: ["AI", "Full-stack", "Voice"],
    link: "https://fastresume.xyz",
    embed: "https://www.fastresume.xyz/", // unused while `image` stands in
    /*
     * A still of the landing page rather than the live site. Framed live, the app
     * opens its email gate over the top on every load, so the wall showed a modal
     * instead of the product. The frame is cross-origin — nothing here can reach
     * in and close it — so until the app takes a flag to skip that on load, the
     * homepage is shown as a picture and the plaque's link goes to the real thing.
     */
    image: "/ip/fastresume-home.webp",
    en: {
      name: "FastResume",
      kind: "AI career suite",
      what: "Scores ATS fit, rewrites your experience in STAR form, translates to 8 languages, runs voice mock interviews.",
      who: "For job seekers applying across borders.",
    },
    zh: {
      name: "FastResume",
      kind: "AI 求职平台",
      what: "上传简历和职位描述,自动打 ATS 分、按 STAR 法改写、翻成 8 种语言,还能做语音模拟面试",
      who: "给跨国求职的人",
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
      what: "收银、后厨、对账、排班合成一套。老板、经理、员工三套界面",
      who: "给一个人干四份活的小餐厅老板",
    },
  },
  {
    id: "championship",
    owner: "jenny",
    stack: ["Storyboard", "Animation", "Sound"],
    link: null,
    // The film plays in the cabinet itself; the id is the one thing kept, and
    // the watch link is built from it, so there is no second copy to forget.
    film: { youtube: "3z5-F9V2XIQ" },
    address: "The 8th Annual Human Disturbance Championship — animated short",
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
      what: "花盆底下的昆虫运动会,比谁能吓到人类",
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
    address: "Sunrise Care",
    image: null, // artwork for the gallery plate — drop a path in when there is one
    en: {
      name: "Sunrise Care",
      kind: "AI caregiver support",
      // Why this one and not a generic care app: Jane does the round herself.
      ground: "Built by a caregiver, for the round she works.",
      what: "Hands the paperwork, monitoring and repetition to AI so carers can spend their time on people.",
      who: "For care teams losing hours to forms.",
    },
    zh: {
      name: "Sunrise Care",
      kind: "AI 照护支持平台",
      ground: "护工做给自己这一行的工具",
      what: "把文书、监测、重复的活儿交给 AI,让照护者有时间做人该做的事",
      who: "给被表格吃掉时间的照护团队",
    },
  },
  {
    id: "sharonecc",
    owner: "jenny",
    /*
     * From the shipped bundle and the page itself, not from a spec: the app is
     * served as a Vite/React build behind Cloudflare, and the site advertises
     * WeChat Pay and Alipay at the till. Correct this line if the build moved.
     */
    stack: ["React", "WeChat Pay", "Alipay"],
    link: "https://sharonecc.com",
    embed: "https://sharonecc.com/", // unused while `image` stands in
    address: "Sharon ECC — course platform for a culture and leadership educator",
    // The home page as it stands, at the width the rest of the wall is shot at.
    image: "/ip/sharonecc.webp",
    en: {
      name: "Sharon ECC",
      kind: "Course and membership platform",
      ground: "Her last site was built for her. She could not move a single button on it.",
      what: "Courses with free preview chapters, WeChat Pay and Alipay at the till, and a member area that keeps what you bought. She rearranges the modules herself.",
      who: "For an educator who had been renting shelf space on somebody else's platform.",
    },
    zh: {
      name: "Sharon ECC · 沙仑创库中心",
      kind: "课程与会员平台",
      ground: "上一个网站是别人做给她的,她连一个按钮都动不了",
      what: "课程可以免费试看,微信和支付宝直接收款,买过的永久留在会员中心。模块她自己排",
      who: "给一位一直把课寄放在别人平台上的讲师",
    },
  },
  {
    id: "ticketing",
    owner: "jenny",
    stack: ["n8n", "Gemini", "WeCom API", "AES"],
    link: null,
    // Our own cut, one per language, served from here. The YouTube id stays as
    // the elsewhere link — nothing reaches YouTube until someone asks for it.
    film: {
      youtube: "6UMtuA_LSOs",
      en: "/media/ticketing-en-1080p.mp4",
      zh: "/media/ticketing-cn-1080p.mp4",
    },
    // The film's own cover: the 34-node graph it opens on, under the line each
    // language tells it with. Kept at 1080p — the source is a screen recording
    // of small labels, and 720p turns the node names to mush.
    poster: { en: "/ip/ticketing-film.webp", zh: "/ip/ticketing-film-zh.webp" },
    address: "Community Ticketing — workflow automation",
    image: null, // the poster above stands in for the gallery plate
    en: {
      name: "Community Ticketing",
      kind: "Workflow automation",
      what: "100+ maintenance requests a day, classified, prioritised and assigned automatically. Response goes from hours to seconds.",
      who: "For a residential community drowning in manual entry.",
    },
    zh: {
      name: "社区智能工单",
      kind: "企业自动化",
      what: "每天 100+ 条报修,AI 自动分类派单。响应从几小时变成几秒",
      who: "给淹没在手工录入里的社区",
    },
  },
]
