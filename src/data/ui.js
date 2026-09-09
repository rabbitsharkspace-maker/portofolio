/*
 * Interface copy in both languages — section labels, home page lines, the small
 * words around the content. Data (bios, works, cases) live in their own files.
 */
export const ui = {
  en: {
    // ——— home hero ———
    heroTitle: "Two people. Ideas taken all the way to launch.",
    heroBody:
      "We're Jenny and Jane. Product strategy, AI systems and experience design — from working out the real problem to shipping the thing that fixes it, done by the two of us.",
    heroJenny: "Systems · engineering · strategy",
    heroJane: "Design · experience · brand",
    seeWork: "See the work",
    meetUs: "Meet us",
    heroShotNote: "One screen from My Kitchen Rules — the case below opens it up.",

    // ——— featured cases ———
    workLabel: "Selected work",
    workTitle: "Real problems. Working products.",
    workIntro:
      "Three products, from the problem to the interface. Explore the design and systems details; each project credits its contributors.",
    caseViews: "Case views",
    viewFinished: "The finished thing",
    viewThinking: (who) => `${who} · walkthrough`,
    pinHint: "Click a marker to read why it was built that way.",
    caseProblem: "The problem",
    caseDid: "What we did",
    close: "Close",
    allWork: "All eight projects →",

    // ——— recognition ———
    recognition: "Recognition",
    recognitionEvent: "Google AI Vibe-a-thon 2026 · GDG Hangzhou",

    // ——— founders ———
    whoWeAre: "Who we are",
    whoWeAreTitle: "Two founders. One complete product team.",
    turnHint: "Design and engineering in one studio. Joint and independent projects are credited individually.",
    evidenceLabel: "What that looks like",
    enterSide: (who) => `${who}'s work in full →`,

    // ——— services ———
    howWeWork: "What you might need",
    howWeWorkTitle: "Three problems we take on.",
    servicesNote: "Start with the problem. We’ll work out the scope together.",

    // ——— contact ———
    contact: "Contact",
    contactTitle: "What are you trying to solve?",
    contactBody:
      "Tell us roughly where things stand and what you want to be different. We reply within 24 hours with concrete next steps.",
    footer: "© 2026 RabbitShark Studio · Remote worldwide · English & Mandarin",

    // ——— contact form ———
    formName: "Your name",
    formProblem: "What's the problem? A couple of sentences is plenty.",
    formEmail: "Where should we reply?",
    formSend: "Compose email ↗",
    formSubject: "New enquiry —",
    formIncomplete: "All three, please.",
    formBadEmail: "That address doesn't look right.",
    formSent: "Continue in your email app to send your enquiry.",
    formDirect: "Or write to us directly:",

    // ——— shared small words ———
    builtBy: "Built by",
    visit: "Visit",
    both: "Both",

    // ——— person pages ———
    whoIAm: "Who I am",
    judgementLabel: "Inside the work",
    judgementTitle: "Selected work, in detail.",
    capabilitiesLabel: "What I can do",
    capabilities: "Capabilities",
    work: "Work",
    awards: "Awards",
    backgroundLabel: "Background",
    training: "Track record",
    contactPerson: "Contact",
    studioFooter: "© 2026 RabbitShark Studio",
  },

  zh: {
    // ——— 首屏 ———
    heroTitle: "两个人，把想法做到上线。",
    heroBody:
      "我们是 Jenny 和 Jane。产品策略、AI 系统与体验设计——从把真正的问题找出来，到把解决它的东西交付上线，都由我们两个人完成。",
    heroJenny: "系统 · 工程 · 策略",
    heroJane: "设计 · 体验 · 品牌",
    seeWork: "看作品",
    meetUs: "认识我们",
    heroShotNote: "My Kitchen Rules 的一屏——下面那个案例会把它拆开讲。",

    // ——— 精选案例 ———
    workLabel: "代表作品",
    workTitle: "真实问题，已交付的产品。",
    workIntro: "从问题到界面，展开三个产品。切换视角查看功能细节，合作与独立作品分别署名。",
    caseViews: "案例视角",
    viewFinished: "成品",
    viewThinking: (who) => `${who} · 解读`,
    pinHint: "点开标记，看当时为什么这么做。",
    caseProblem: "要解决的问题",
    caseDid: "我们做了什么",
    close: "收起",
    allWork: "全部八个项目 →",

    // ——— 外部核验 ———
    recognition: "外部核验",
    recognitionEvent: "Google AI 出海创想赛 Vibe-a-thon 2026 · GDG Hangzhou",

    // ——— 两位创始人 ———
    whoWeAre: "我们是谁",
    whoWeAreTitle: "两位创始人，一支完整的产品团队。",
    turnHint: "设计与工程，在同一个工作室。合作项目和独立作品，分别标注真实归属。",
    evidenceLabel: "具体是什么样",
    enterSide: (who) => `${who} 的完整作品 →`,

    // ——— 服务 ———
    howWeWork: "你可能需要什么",
    howWeWorkTitle: "我们接的三类问题。",
    servicesNote: "从你遇到的问题开始，一起确定需要交付什么。",

    // ——— 联系 ———
    contact: "联系",
    contactTitle: "你正在解决什么问题？",
    contactBody: "大致说说现在是什么情况、你希望它变成什么样。24 小时内回复，附具体的下一步。",
    footer: "© 2026 RabbitShark Studio · 全球远程 · 中英双语",

    // ——— 表单 ———
    formName: "怎么称呼你",
    formProblem: "现在遇到的问题是什么？两三句话就够。",
    formEmail: "回信寄到哪里",
    formSend: "打开邮件撰写 ↗",
    formSubject: "新的咨询 —",
    formIncomplete: "三格都要填。",
    formBadEmail: "这个邮箱地址好像不对。",
    formSent: "请在你的邮件应用中完成发送。",
    formDirect: "或者直接写信给我们：",

    // ——— 通用 ———
    builtBy: "作者",
    visit: "访问",
    both: "两人",

    // ——— 个人页 ———
    whoIAm: "我是谁",
    judgementLabel: "作品解读",
    judgementTitle: "从作品，看专业。",
    capabilitiesLabel: "我会什么",
    capabilities: "能力",
    work: "作品",
    awards: "奖项",
    backgroundLabel: "背景",
    training: "履历与背景",
    contactPerson: "联系",
    studioFooter: "© 2026 RabbitShark Studio",
  },
}
