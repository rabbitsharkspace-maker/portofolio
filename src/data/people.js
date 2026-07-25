/*
 * People, bilingual. Each person carries shared fields (world, art, name) plus a
 * full `en` and `zh` block of the same shape, so a page just reads person[lang].
 */
export const people = {
  jenny: {
    world: "jenny",
    art: "/ip/jenny.webp",
    name: "Jenny Zhang",
    // The name she goes by, and the one on her passport. The site shows the
    // first and only reveals the second on hover.
    realName: "Enyu Zhang",
    short: "Jenny",
    en: {
      animal: "Shark",
      line: "I build the whole product on my own.",
      sub: "From working out the problem, to writing it, to shipping it.",
      // The roster bars on the home page. Self-declared, not a score anyone else
      // gave out — they exist to show the shape of each person at a glance.
      stats: [
        { label: "AI systems", value: 92 },
        { label: "Full-stack build", value: 86 },
        { label: "Business & process", value: 80 },
        { label: "Visual & story", value: 64 },
      ],
      about: [
        "Studied business, then taught myself to write code.",
        "Now I build systems for people who can't afford a team.",
        "Bilingual, English and Mandarin. Working remotely.",
      ],
      skills: [
        { group: "AI systems", items: ["Gemini", "n8n automation", "Encryption", "Supabase / Firebase"] },
        { group: "Engineering", items: ["React", "Full-stack", "Figma to production"] },
        { group: "Business", items: ["Process diagnosis", "Market research", "Brand & consulting"] },
        { group: "Visual", items: ["Animated shorts", "Storyboarding", "UI design"] },
        { group: "Music", items: ["AMEB Grade 8 piano", "Songwriting", "Church keyboardist"] },
      ],
      awards: [
        "Google Vibe-a-thon 2026 — Top 100 (final result pending)",
        "BAP × USYD × Monash × McKinsey Case Competition — Regional Round",
        "FMAA Management Consulting Case Competition 2024 — Campus Qualifier",
        "AMEB Grade 8 Piano (A)",
        "VCE Music Performance (A)",
      ],
      background: [
        "Monash University — International Business, 2022–2024",
        "Stanford University — Code in Place, 2023",
        "La Trobe University — Cybersecurity Fundamentals, 2023",
        "Yunchen Futures — Internship, 2023–2024",
      ],
      replyNote: "We reply within 24 hours.",
    },
    zh: {
      animal: "鲨鱼",
      line: "我一个人做完整个产品。",
      sub: "从想清楚,到写出来,到上线。",
      stats: [
        { label: "AI 系统", value: 92 },
        { label: "全栈开发", value: 86 },
        { label: "商业与流程", value: 80 },
        { label: "视觉与叙事", value: 64 },
      ],
      about: [
        "学的商科,后来自己学会写代码。",
        "现在给请不起一个团队的人做系统。",
        "中英双语,远程工作。",
      ],
      skills: [
        { group: "AI 系统", items: ["Gemini", "n8n 自动化", "数据加密", "Supabase / Firebase"] },
        { group: "开发", items: ["React", "全栈", "从 Figma 到上线"] },
        { group: "商业", items: ["流程诊断", "市场研究", "品牌与咨询"] },
        { group: "视觉", items: ["动画短片", "分镜", "UI 设计"] },
        { group: "音乐", items: ["钢琴八级", "作曲", "教会键盘手"] },
      ],
      awards: [
        "Google Vibe-a-thon 2026 — Top 100(最终结果待公布)",
        "BAP × USYD × Monash × McKinsey 案例赛 — 区域赛",
        "FMAA 管理咨询案例赛 2024 — 校园赛晋级",
        "AMEB 钢琴八级 A",
        "VCE Music Performance A",
      ],
      background: [
        "Monash University|国际商务 2022–2024",
        "Stanford University|Code in Place 2023",
        "La Trobe University|网络安全基础 2023",
        "云辰期货|实习 2023–2024",
      ],
      replyNote: "24 小时内回复。",
    },
  },

  jane: {
    world: "jane",
    art: "/ip/jane.webp",
    name: "Jane Zhang",
    realName: "Xinyu Zhang",
    short: "Jane",
    en: {
      animal: "Rabbit",
      line: "I build the layer people actually touch.",
      sub: "Interfaces, visuals, content — through to launch.",
      stats: [
        { label: "Interface & UI", value: 92 },
        { label: "Brand & visuals", value: 88 },
        { label: "Content & video", value: 84 },
        { label: "Front-end build", value: 72 },
      ],
      about: [
        "Business and blockchain by degree, design by instinct, then taught myself to write code.",
        "Now I build the front end and the content.",
        "Bilingual, English and Mandarin.",
      ],
      skills: [
        { group: "Front end", items: ["React", "Full-stack", "Figma to production"] },
        { group: "Design", items: ["Brand visuals", "Posters", "UI", "Canva / Procreate"] },
        { group: "Content", items: ["Short-form video", "Xiaohongshu / TikTok / WeChat"] },
        { group: "Care", items: ["In-home aged care experience"] },
      ],
      awards: [
        "RMIT Vice-Chancellor's List for Academic Excellence 2024 — top 2% of the university",
        "Google Vibe-a-thon 2026 — Top 100 (final result pending)",
      ],
      background: [
        "RMIT University — Bachelor of Business, Blockchain Enabled Business, 2022–2024",
        "Intelligent Health Systems — Marketing intern, 2024",
        "HTP Smart Energy — Grid applications, site maintenance & design",
        "Dovida — In-home aged care",
        "Snaptrek / Pop Sushi / Hotmart / Hi Fumi — Brand visuals & short video",
        "RMIT Student Ambassador, Peer Mentor, SSCC Student Representative",
        "Australian Red Cross, Gapper Aus committee",
        "Melbourne Bethel Bread of Life — serving since 2015, Sunday school assistant",
      ],
      photoNote: "Interfaces, visuals, content — look at the work.",
      replyNote: "We reply within 24 hours.",
    },
    zh: {
      animal: "兔子",
      line: "我做用户真正碰到的那一层。",
      sub: "界面、视觉、内容,到上线。",
      stats: [
        { label: "界面与 UI", value: 92 },
        { label: "品牌与视觉", value: 88 },
        { label: "内容与短视频", value: 84 },
        { label: "前端开发", value: 72 },
      ],
      about: [
        "学的商科和区块链,做设计出身,后来自己学会写代码。",
        "现在做产品的前端和内容。",
        "中英双语。",
      ],
      skills: [
        { group: "前端", items: ["React", "全栈", "从 Figma 到上线"] },
        { group: "设计", items: ["品牌视觉", "海报", "UI", "Canva / Procreate"] },
        { group: "内容", items: ["短视频拍摄与剪辑", "小红书 / TikTok / 微信运营"] },
        { group: "照护", items: ["老年居家照护经验"] },
      ],
      awards: [
        "RMIT 校长嘉许名单 2024 — 全校前 2%",
        "Google Vibe-a-thon 2026 — Top 100(最终结果待公布)",
      ],
      background: [
        "RMIT University|Bachelor of Business, Blockchain Enabled Business 2022–2024",
        "Intelligent Health Systems|市场实习 2024",
        "HTP Smart Energy|并网申请、网站维护与设计",
        "Dovida|老年居家照护",
        "Snaptrek / Pop Sushi / Hotmart / Hi Fumi|品牌视觉与短视频",
        "RMIT 学生大使、朋辈导师、SSCC 学生代表",
        "澳洲红十字会、Gapper Aus 委员会",
        "Melbourne Bethel Bread of Life|自 2015 年起服事,主日学助教",
      ],
      photoNote: "界面、视觉、内容 —— 看东西就好。",
      replyNote: "24 小时内回复。",
    },
  },
}

export const studio = {
  email: "rabbitshark.space@gmail.com",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/rabbitshark_space/" },
    { label: "YouTube", url: "https://www.youtube.com/channel/UCZ9bDkBShaIQKoNq-sz9hDA" },
    { label: "Email", url: "mailto:rabbitshark.space@gmail.com" },
  ],
  en: {
    line: "Two people. Every project built by the people you talk to.",
    sub: "We find where AI saves you time and money, then we build it.",
    offers: [
      { title: "We build it for you", body: "You describe the problem. We design, build and deploy the whole system." },
      { title: "We build it, you own it", body: "We hand everything over with training. No ongoing dependency on us." },
      { title: "We teach you to build it", body: "One-on-one sessions. Every tool we use is free." },
    ],
  },
  zh: {
    line: "两个人。每个项目都由和你对话的人亲手做。",
    sub: "我们找出 AI 能帮你省下时间和钱的地方,然后把它做出来。",
    offers: [
      { title: "我们替你做", body: "你描述问题,我们设计、开发并上线整套系统。" },
      { title: "我们做,归你所有", body: "连同培训一起交付,之后不依赖我们。" },
      { title: "我们教你做", body: "一对一教学。我们用的每个工具都是免费的。" },
    ],
  },
}
