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
      line: "I turn complex problems into working products.",
      sub: "I find the operational problem beneath the requested feature.",
      // The roster bars on the home page. Self-declared, not a score anyone else
      // gave out — they exist to show the shape of each person at a glance.
      stats: [
        { label: "AI systems", value: 92 },
        { label: "Product strategy", value: 90 },
        { label: "Full-stack engineering", value: 86 },
        { label: "Automation & operations", value: 84 },
      ],
      about: [
        "I lead product strategy, AI systems and full-stack engineering at RabbitShark. Clients often arrive asking for a feature; I work out what is actually slowing the business down, then design and build the simplest system that solves it. With a Bachelor of International Business and a self-taught path into engineering, I connect technical decisions to real commercial needs. I work in English and Mandarin, from Melbourne and remotely.",
      ],
      skills: [
        { group: "AI systems", items: ["AI integration", "n8n automation", "Encryption", "Supabase / Firebase"] },
        { group: "Product strategy", items: ["Process diagnosis", "Market research", "Product logic"] },
        { group: "Engineering", items: ["React", "Full-stack development", "Figma to production"] },
        { group: "Creative", items: ["Animated shorts", "Storyboarding", "UI design"] },
        { group: "Music", items: ["AMEB Grade 8 piano", "Songwriting", "Keyboardist"] },
      ],
      awards: [
        "Google Vibe-a-thon 2026 — Top 6 Finalist (final result pending)",
        "BAP × USYD × Monash × McKinsey Case Competition — Regional Round",
        "FMAA Management Consulting Case Competition 2024 — Campus Qualifier",
        "AMEB Grade 8 Piano (A)",
        "VCE Music Performance (A)",
      ],
      background: [
        "Monash University — Bachelor of International Business, 2022–2024",
        "Stanford University — Code in Place, 2023",
        "La Trobe University — Cybersecurity Fundamentals, 2023",
        "LIFTwomen Group — Marketing Intern, 2024",
        "MeBumi × Monash University — Consultant, brand and market strategy, 2024",
        "Monash–Warwick TeamWork Program — Client strategy, 2024",
        "Global Consulting Group — External Relations and Partnerships, 2023–2024",
        "Yunchen Futures Brokerage — Market Research Intern, 2023–2024",
        "Monash University — International Ambassador and Business School Ambassador, 2023–2024",
      ],
      replyNote: "We reply within 24 hours.",
    },
    zh: {
      animal: "鲨鱼",
      line: "我把复杂的问题，变成可以运行的产品。",
      sub: "我寻找功能需求背后，真正需要解决的业务问题。",
      stats: [
        { label: "AI 系统", value: 92 },
        { label: "产品策略", value: 90 },
        { label: "全栈开发", value: 86 },
        { label: "自动化与业务流程", value: 84 },
      ],
      about: [
        "我负责 RabbitShark 的产品策略、AI 系统设计与全栈开发。客户往往带着一个功能需求来找我；我会先判断真正拖慢业务的环节，再设计并构建能够解决它的最简系统。我拥有国际商务学士学位，并通过自学进入软件开发领域，因此能够把技术判断与真实的商业需求连接起来。我使用中文与英文工作，现居墨尔本，并支持远程合作。",
      ],
      skills: [
        { group: "AI 系统", items: ["AI 集成", "n8n 自动化", "数据加密", "Supabase / Firebase"] },
        { group: "产品策略", items: ["流程诊断", "市场研究", "产品逻辑"] },
        { group: "工程开发", items: ["React", "全栈开发", "从 Figma 到上线"] },
        { group: "创意", items: ["动画短片", "分镜", "UI 设计"] },
        { group: "音乐", items: ["AMEB 钢琴八级", "作曲", "键盘手"] },
      ],
      awards: [
        "Google Vibe-a-thon 2026 — 六强决赛入围（最终结果待公布）",
        "BAP × USYD × Monash × McKinsey 案例赛 — 区域赛",
        "FMAA 管理咨询案例赛 2024 — 校园赛晋级",
        "AMEB 钢琴八级 A",
        "VCE Music Performance A",
      ],
      background: [
        "Monash University｜国际商务学士 · 2022–2024",
        "Stanford University｜Code in Place · 2023",
        "La Trobe University｜网络安全基础 · 2023",
        "LIFTwomen Group｜市场实习 · 2024",
        "MeBumi × Monash University｜品牌与市场策略顾问 · 2024",
        "Monash–Warwick TeamWork Program｜客户策略项目 · 2024",
        "Global Consulting Group｜外部关系与合作伙伴事务 · 2023–2024",
        "云辰期货｜市场研究实习 · 2023–2024",
        "Monash University｜国际学生大使、商学院大使 · 2023–2024",
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
      line: "I make technology clear, human and memorable.",
      sub: "So users understand it faster, trust it sooner and keep using it.",
      stats: [
        { label: "Product & UI design", value: 92 },
        { label: "Brand & visual direction", value: 90 },
        { label: "Content & storytelling", value: 86 },
        { label: "Front-end experience", value: 82 },
      ],
      about: [
        "I lead product experience, interface design, brand and creative direction at RabbitShark. I turn complex product logic into experiences people understand quickly, trust confidently and want to keep using. With a degree in business and blockchain-enabled business, I bring together commercial thinking, design instinct and front-end implementation. I work in English and Mandarin.",
      ],
      skills: [
        { group: "Product experience", items: ["UI design", "User journeys", "Figma to production"] },
        { group: "Brand & visual", items: ["Visual identity", "Posters", "Canva / Procreate"] },
        { group: "Content", items: ["Storytelling", "Short-form video", "Xiaohongshu / TikTok / WeChat"] },
        { group: "Front end", items: ["React", "Interface implementation", "Responsive design"] },
      ],
      awards: [
        "RMIT Vice-Chancellor's List 2024 — Top 2% university-wide",
        "Google Vibe-a-thon 2026 — Top 6 Finalist (final result pending)",
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
      line: "我让技术变得清晰、自然，也值得被记住。",
      sub: "让用户更快理解、更早信任，并愿意持续使用。",
      stats: [
        { label: "产品与 UI 设计", value: 92 },
        { label: "品牌与视觉", value: 90 },
        { label: "内容与叙事", value: 86 },
        { label: "前端体验", value: 82 },
      ],
      about: [
        "我负责 RabbitShark 的产品体验、界面设计、品牌视觉与创意方向。我把复杂的产品逻辑转化为用户能够快速理解、放心信任并愿意持续使用的体验。我拥有商业及区块链商业学位，将商业思维、设计直觉和前端实现结合在一起。我使用中文与英文工作。",
      ],
      skills: [
        { group: "产品体验", items: ["UI 设计", "用户路径", "从 Figma 到上线"] },
        { group: "品牌与视觉", items: ["视觉识别", "海报", "Canva / Procreate"] },
        { group: "内容", items: ["内容叙事", "短视频拍摄与剪辑", "小红书 / TikTok / 微信运营"] },
        { group: "前端", items: ["React", "界面实现", "响应式设计"] },
      ],
      awards: [
        "RMIT 校长嘉许名单 2024 — 全校前 2%",
        "Google Vibe-a-thon 2026 — 六强决赛入围（最终结果待公布）",
      ],
      background: [
        "RMIT University｜商业学士，区块链商业方向 · 2022–2024",
        "Intelligent Health Systems｜市场实习 · 2024",
        "HTP Smart Energy｜并网申请、网站维护与设计",
        "Dovida｜老年居家照护",
        "Snaptrek / Pop Sushi / Hotmart / Hi Fumi｜品牌视觉与短视频",
        "RMIT University｜学生大使、朋辈导师、SSCC 学生代表",
        "Australian Red Cross｜志愿者；Gapper Aus｜委员会成员",
        "Melbourne Bethel Bread of Life｜社区服事及主日学助教 · 2015 年至今",
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
