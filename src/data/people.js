/*
 * People, bilingual. Each person carries shared fields (world, art, name) plus a
 * full `en` and `zh` block of the same shape, so a page just reads person[lang].
 */
export const people = {
  jenny: {
    world: "jenny",
    art: "/ip/jenny.webp",
    // The roster stage shows the GLB, not `art`. `spin` is the quarter turn a
    // given export needs to face the camera — Jenny's comes out of Tripo
    // sideways, Jane's comes out facing front, so only Jenny carries one.
    model: "/ip/jenny.glb",
    spin: -Math.PI / 2,
    name: "Jenny Zhang",
    // The name she goes by, and the one on her passport. The site shows the
    // first and only reveals the second on hover.
    realName: "Enyu Zhang",
    short: "Jenny",
    en: {
      animal: "Shark",
      line: "I build the system your business actually needs.",
      sub: "Clients arrive with a feature request. I find the operational problem underneath it.",
      // The roster bars on the home page. Self-declared, not a score anyone else
      // gave out — they exist to show the shape of each person at a glance.
      stats: [
        { label: "AI systems", value: 92 },
        { label: "Product strategy", value: 90 },
        { label: "Full-stack engineering", value: 86 },
        { label: "Automation & operations", value: 84 },
      ],
      about: [
        "I lead product strategy, AI systems and full-stack engineering at RabbitShark.",
        "Clients usually arrive with a feature request. My first move isn't to build it — it's to work out what is actually slowing the business down, then ship the shortest system that fixes it.",
        "Seven products shipped. Top 6 finalist at the Google Vibe-a-thon 2026. One automation handling 100+ maintenance requests a day, with response time down from hours to seconds.",
        "A business degree and a self-taught engineering path — which means I know what every technical decision costs. I work in English and Mandarin, remote worldwide.",
      ],
      skills: [
        {
          group: "AI systems",
          items: ["AI integration", "n8n automation", "Encryption & access control", "Supabase / Firebase"],
        },
        { group: "Product strategy", items: ["Process diagnosis", "Market research", "Product logic"] },
        { group: "Engineering", items: ["React", "Full-stack development", "Figma to production"] },
        {
          group: "Creative",
          items: [
            "Animated shorts",
            "Storyboarding",
            "UI design",
            "AMEB Grade 8 piano",
            "Songwriting",
            "Keyboardist",
          ],
        },
      ],
      awards: [
        "Google Vibe-a-thon 2026 — Top 6 Finalist (final result pending)",
        "BAP × USYD × Monash × McKinsey Case Competition — Regional Round",
        "FMAA Management Consulting Case Competition 2024 — Campus Qualifier",
        "AMEB Grade 8 Piano (A)",
        "VCE Music Performance (A)",
      ],
      background: [
        { kind: "business", text: "Monash University — Bachelor of International Business, 2022–2024" },
        { kind: "tech", text: "Stanford University — Code in Place, 2023" },
        { kind: "tech", text: "La Trobe University — Cybersecurity Fundamentals, 2023" },
        { kind: "business", text: "LIFTwomen Group — Marketing Intern, 2024" },
        { kind: "business", text: "MeBumi × Monash University — Consultant, brand and market strategy, 2024" },
        { kind: "business", text: "Monash–Warwick TeamWork Program — Client strategy, 2024" },
        { kind: "business", text: "Global Consulting Group — External Relations and Partnerships, 2023–2024" },
        { kind: "business", text: "Yunchen Futures Brokerage — Market Research Intern, 2023–2024" },
        {
          kind: "community",
          text: "Monash University — International Ambassador and Business School Ambassador, 2023–2024",
        },
      ],
      contactLine: "Bring us the problem worth solving.",
      replyNote: "Tell us what's happening and what should change. We'll reply within 24 hours with clear next steps.",
    },
    zh: {
      animal: "鲨鱼",
      line: "把复杂的问题，做成能用的产品。",
      sub: "客户带来的是一个功能需求；我找出它下面真正拖慢生意的那个问题。",
      stats: [
        { label: "AI 系统", value: 92 },
        { label: "产品策略", value: 90 },
        { label: "全栈开发", value: 86 },
        { label: "自动化与业务流程", value: 84 },
      ],
      about: [
        "RabbitShark 的产品策略、AI 系统和全栈开发由我负责。",
        "客户通常带着一个功能需求来找我。我做的第一件事不是开工，是先弄清楚到底是什么在拖慢这门生意——然后用最短的方案解决它，并且交付上线。",
        "已上线七个产品。Google Vibe-a-thon 2026 全球 Top 6。做过一套自动化系统，每天自动处理 100 多条工单，响应从小时级压到秒级。",
        "商科出身，工程自学，所以我清楚每一个技术决定背后对应多少钱。中英文都能直接开工，全球远程。",
      ],
      skills: [
        { group: "AI 系统", items: ["AI 集成", "n8n 自动化", "加密与权限", "Supabase / Firebase"] },
        { group: "产品策略", items: ["流程诊断", "市场调研", "产品逻辑"] },
        { group: "工程", items: ["React", "全栈开发", "Figma 到上线"] },
        { group: "创意", items: ["动画短片", "分镜", "UI 设计", "AMEB 钢琴八级", "作曲", "键盘手"] },
      ],
      awards: [
        "Google Vibe-a-thon 2026 — 六强决赛入围（最终结果待公布）",
        "BAP × USYD × Monash × McKinsey 案例赛 — 区域赛",
        "FMAA 管理咨询案例赛 2024 — 校园赛晋级",
        "AMEB 钢琴八级 A",
        "VCE Music Performance A",
      ],
      background: [
        { kind: "business", text: "Monash University｜国际商务学士 · 2022–2024" },
        { kind: "tech", text: "Stanford University｜Code in Place · 2023" },
        { kind: "tech", text: "La Trobe University｜网络安全基础 · 2023" },
        { kind: "business", text: "LIFTwomen Group｜市场实习 · 2024" },
        { kind: "business", text: "MeBumi × Monash University｜品牌与市场策略顾问 · 2024" },
        { kind: "business", text: "Monash–Warwick TeamWork Program｜客户策略项目 · 2024" },
        { kind: "business", text: "Global Consulting Group｜外部关系与合作伙伴事务 · 2023–2024" },
        { kind: "business", text: "云辰期货｜市场研究实习 · 2023–2024" },
        { kind: "community", text: "Monash University｜国际学生大使、商学院大使 · 2023–2024" },
      ],
      contactLine: "带一个值得解决的问题来。",
      replyNote: "说清楚现在发生了什么、你希望它变成什么样。24 小时内回复，附具体的下一步。",
    },
  },

  jane: {
    world: "jane",
    art: "/ip/jane.webp",
    model: "/ip/jane.glb",
    name: "Jane Zhang",
    realName: "Xinyu Zhang",
    short: "Jane",
    en: {
      animal: "Rabbit",
      line: "I make technology clear, human and memorable.",
      sub: "So users understand it faster, trust it sooner and keep using it.",
      stats: [
        { label: "Product & UI design", value: 92 },
        { label: "Brand & visual direction", value: 90 },
        { label: "Content & storytelling", value: 86 },
        { label: "Front-end experience", value: 82 },
      ],
      about: [
        "I lead product experience, interface design and brand direction at RabbitShark, and carry a screen from first wireframe through to shipped React. My degree is in business and blockchain-enabled business, so I weigh an interface commercially as well as visually — what it has to prove, to whom, and in what order. I work in English and Mandarin.",
      ],
      skills: [
        { group: "Product & interface", items: ["UI design", "User journeys", "Figma to production"] },
        {
          group: "Brand & visual",
          items: ["Visual identity", "Campaign & print artwork", "Illustration (Procreate)"],
        },
        {
          group: "Content",
          items: ["Narrative & script", "Short-form video, shoot to edit", "Xiaohongshu / TikTok / WeChat"],
        },
        { group: "Front end", items: ["React", "Responsive layout", "Design-to-code handoff"] },
      ],
      awards: [
        "RMIT Vice-Chancellor's List 2024 — Top 2% university-wide",
        "Google Vibe-a-thon 2026 — Top 6 Finalist (final result pending)",
      ],
      background: [
        {
          kind: "education",
          text: "RMIT University — Bachelor of Business (Blockchain Enabled Business), 2022–2024",
        },
        {
          kind: "experience",
          text: "HTP Smart Energy — Admin & Marketing Assistant, 2026",
          note: "Grid connection applications, site maintenance and design",
        },
        { kind: "experience", text: "Dovida — Caregiver, 2026" },
        { kind: "experience", text: "Intelligent Health Systems — Marketing Intern, 2024" },
        { kind: "experience", text: "Yunchen Futures Brokerage — Market Research Intern, 2023–2024" },
        { kind: "experience", text: "CSSC — Sales representative, 2023" },
        {
          kind: "client",
          text: "Brand visuals and short-form video",
          note: "Hi Fumi, 2026 · Snaptrek, 2025 · Pop Sushi, 2025 · Hotmart, 2024",
        },
        {
          kind: "community",
          text: "Melbourne Bethel Bread of Life — Sunday School Assistant, since 2015",
        },
        { kind: "community", text: "Australian Red Cross — Volunteer, 2024" },
        { kind: "community", text: "Gapper Aus — Committee Member, 2023–2024" },
        {
          kind: "community",
          text: "RMIT University — Student Ambassador, Peer Mentor, SSCC Student Representative, 2022–2024",
        },
      ],
      photoNote: "Interfaces, visuals, content — look at the work.",
      replyNote: "We reply within 24 hours.",
    },
    zh: {
      animal: "兔子",
      line: "我让技术变得清晰、自然，也值得被记住。",
      sub: "让用户更快理解、更早信任，并愿意持续使用。",
      stats: [
        { label: "产品与 UI 设计", value: 92 },
        { label: "品牌与视觉", value: 90 },
        { label: "内容与叙事", value: 86 },
        { label: "前端体验", value: 82 },
      ],
      about: [
        "我负责 RabbitShark 的产品体验、界面设计与品牌方向，一块屏从第一张线框图一直做到上线的 React。我的学位是商业与区块链商业方向，所以看一个界面时，除了视觉，我也会算商业账——它要证明什么、向谁证明、按什么顺序。我使用中文与英文工作。",
      ],
      skills: [
        { group: "产品与界面", items: ["UI 设计", "用户路径", "从 Figma 到上线"] },
        { group: "品牌与视觉", items: ["视觉识别", "活动与印刷物料", "插画（Procreate）"] },
        { group: "内容", items: ["叙事与脚本", "短视频拍摄与剪辑", "小红书 / TikTok / 微信"] },
        { group: "前端", items: ["React", "响应式布局", "设计到代码交付"] },
      ],
      awards: [
        "RMIT 校长嘉许名单 2024 — 全校前 2%",
        "Google Vibe-a-thon 2026 — 六强决赛入围（最终结果待公布）",
      ],
      background: [
        { kind: "education", text: "RMIT University｜商业学士（区块链商业方向）· 2022–2024" },
        {
          kind: "experience",
          text: "HTP Smart Energy｜行政与市场助理 · 2026",
          note: "并网申请、网站维护与设计",
        },
        { kind: "experience", text: "Dovida｜居家照护员 · 2026" },
        { kind: "experience", text: "Intelligent Health Systems｜市场实习 · 2024" },
        { kind: "experience", text: "云辰期货｜市场研究实习 · 2023–2024" },
        { kind: "experience", text: "中国船舶 CSSC｜业务员 · 2023" },
        {
          kind: "client",
          text: "品牌视觉与短视频",
          note: "Hi Fumi 2026 · Snaptrek 2025 · Pop Sushi 2025 · Hotmart 2024",
        },
        { kind: "community", text: "Melbourne Bethel Bread of Life｜主日学助教 · 2015 年至今" },
        { kind: "community", text: "Australian Red Cross｜志愿者 · 2024" },
        { kind: "community", text: "Gapper Aus｜委员会成员 · 2023–2024" },
        { kind: "community", text: "RMIT University｜学生大使、朋辈导师、SSCC 学生代表 · 2022–2024" },
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
    line: "Two founders. Strategy, engineering and design in one team.",
    sub: "We find the problem worth solving, then take the product all the way to launch.",
    offers: [
      { title: "We build it for you", body: "You describe the problem. We design, build and deploy the whole system." },
      { title: "We build it, you own it", body: "We hand everything over with training. No ongoing dependency on us." },
      { title: "We teach you to build it", body: "One-on-one guidance using tools that fit your budget, workflow and team." },
    ],
  },
  zh: {
    line: "两位创始人，把策略、工程与设计放在同一支团队里。",
    sub: "我们先找到值得解决的问题，再把产品一路做到上线。",
    offers: [
      { title: "我们替你做", body: "你描述问题,我们设计、开发并上线整套系统。" },
      { title: "我们做,归你所有", body: "连同培训一起交付,之后不依赖我们。" },
      { title: "我们教你做", body: "根据你的预算、流程和团队情况，提供一对一实用指导。" },
    ],
  },
}
