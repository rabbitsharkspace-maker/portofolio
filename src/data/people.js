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
      /*
       * What replaced the score bars. A self-awarded 92/100 tells a reader
       * nothing they can check — everyone knows the number was chosen by the
       * person it flatters. A capability paired with the thing that proves it
       * can be followed up, and the proof is a link into the work.
       */
      evidence: [
        {
          claim: "AI systems & automation",
          proof: "Community Ticketing: 100+ maintenance requests a day classified and assigned automatically. Response time from hours to seconds.",
        },
        {
          claim: "Product strategy",
          proof: "My Kitchen Rules arrived as a request for a till. What shipped was the reconciliation and rostering underneath it, because that was where the hours were going.",
        },
        {
          claim: "Full-stack delivery",
          proof: "Seven products taken from nothing to live, deployed and handed over — not prototypes.",
        },
        {
          claim: "Externally checked",
          proof: "Best Google AI Technology Application, Vibe-a-thon 2026 — 395 entries, three rounds, six winners.",
        },
      ],
      about: [
        "I lead product strategy, AI systems and full-stack engineering at RabbitShark.",
        "Clients usually arrive with a feature request. My first move isn't to build it — it's to work out what is actually slowing the business down, then ship the shortest system that fixes it.",
        "Seven products shipped. Best Google AI Technology Application at the Google AI Vibe-a-thon 2026 — one of six winners from 395 entries. One automation handling 100+ maintenance requests a day, with response time down from hours to seconds.",
        "A business degree and a self-taught engineering path — which means I know what every technical decision costs. I work in English and Mandarin, remote worldwide.",
      ],
      skills: [
        {
          group: "AI systems",
          items: ["AI integration", "n8n automation", "Encryption & access control", "Supabase / Firebase"],
        },
        {
          group: "Product strategy",
          items: ["Process diagnosis", "Market research", "Product logic", "ROI modelling"],
        },
        {
          group: "Engineering",
          items: ["React", "Full-stack development", "Figma to production", "Deployment & handover"],
        },
        {
          group: "Creative",
          items: ["Animated shorts", "Storyboarding", "UI design", "Original music & sound"],
        },
      ],
      awards: [
        "Best Google AI Technology Application — Google AI Vibe-a-thon 2026, run by GDG Hangzhou, awarded at the Google Developer Conference in Shanghai\n395 entries → Top 100 → Top 30 → six winners",
        "BAP × USYD × Monash × McKinsey Case Competition — Regional Round",
        "FMAA Management Consulting Case Competition 2024 — Campus Qualifier",
        "AMEB Grade 8 Piano (A)",
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
      evidence: [
        {
          claim: "AI 系统与自动化",
          proof: "社区智能工单：每天 100+ 条报修自动分类派单，响应从小时级压到秒级。",
        },
        {
          claim: "产品策略",
          proof: "My Kitchen Rules 一开始要的是一套收银。最后交付的是它下面的对账和排班——时间是花在那里的。",
        },
        {
          claim: "全栈交付",
          proof: "七个产品从零做到上线、部署并完成交接，不是原型。",
        },
        {
          claim: "有外部核验",
          proof: "最佳 Google AI 技术应用奖 · Vibe-a-thon 2026 —— 395 队/人参赛，三轮筛选，六个席位。",
        },
      ],
      about: [
        "RabbitShark 的产品策略、AI 系统和全栈开发由我负责。",
        "客户通常带着一个功能需求来找我。我做的第一件事不是开工，是先弄清楚到底是什么在拖慢这门生意——然后用最短的方案解决它，并且交付上线。",
        "已上线七个产品。获 Google AI 出海创想赛 Vibe-a-thon 2026（GDG 杭州主办）最佳 Google AI 技术应用奖——395 队/人参赛，三轮筛选后六个获奖席位之一。做过一套自动化系统，每天自动处理 100 多条工单，响应从小时级压到秒级。",
        "商科出身，工程自学，所以我清楚每一个技术决定背后对应多少钱。中英文都能直接开工，全球远程。",
      ],
      skills: [
        { group: "AI 系统", items: ["AI 集成", "n8n 自动化", "加密与权限", "Supabase / Firebase"] },
        { group: "产品策略", items: ["流程诊断", "市场调研", "产品逻辑", "ROI 测算"] },
        { group: "工程", items: ["React", "全栈开发", "Figma 到上线", "部署与交付"] },
        { group: "创意", items: ["动画短片", "分镜", "UI 设计", "原创配乐"] },
      ],
      awards: [
        "最佳 Google AI 技术应用奖 —— Google AI 出海创想赛 Vibe-a-thon 2026 · GDG 杭州主办，颁奖于上海谷歌开发者大会\n395 队/人参赛 → Top 100 → Top 30 → 六个获奖席位",
        "BAP × USYD × Monash × McKinsey 案例赛 — 区域赛",
        "FMAA 管理咨询案例赛 2024 — 校园赛晋级",
        "AMEB 钢琴八级 A",
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
      evidence: [
        {
          claim: "Product & interface",
          proof: "Three role-based interfaces for one restaurant system — owner, manager, floor — sharing one set of rules.",
        },
        {
          claim: "Design to shipped code",
          proof: "FastResume carried from first wireframe through to the React that is live now.",
        },
        {
          claim: "Brand & visual",
          proof: "Brand visuals and short-form video for Hi Fumi, Snaptrek, Pop Sushi and Hotmart — four years running.",
        },
        {
          claim: "Externally checked",
          proof: "Best Vibe Coding Work, Vibe-a-thon 2026 — 395 entries, six winners. RMIT Vice-Chancellor's List 2024 — top 2% university-wide.",
        },
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
        "Best Vibe Coding Work — Google AI Vibe-a-thon 2026, run by GDG Hangzhou, awarded at the Google Developer Conference in Shanghai\n395 entries → Top 100 → Top 30 → six winners",
        "RMIT Vice-Chancellor's List 2024 — Top 2% university-wide",
      ],
      background: [
        {
          kind: "client",
          text: "Hi Fumi, 2026 · Snaptrek, 2025 · Pop Sushi, 2025 · Hotmart, 2024",
          note: "Brand visuals and short-form video, four years running",
        },
        /*
         * The round that produced Sunrise Care stays here as plain history — the
         * argument it makes now sits on the work itself, on Sunrise Care's own
         * label, where the thing being argued for is in front of you.
         */
        { kind: "experience", text: "Dovida — Caregiver, in-home aged care, 2026" },
        { kind: "experience", text: "HTP Smart Energy — Admin & Marketing Assistant, 2026" },
        { kind: "experience", text: "Intelligent Health Systems — Marketing Intern, 2024" },
        { kind: "experience", text: "Yunchen Futures Brokerage — Market Research Intern, 2023–2024" },
        { kind: "experience", text: "CSSC — Sales representative, 2023" },
        {
          kind: "education",
          text: "RMIT University — Bachelor of Business (Blockchain Enabled Business), 2022–2024",
        },
        { kind: "community", text: "Melbourne Bethel Bread of Life — Sunday School Assistant, since 2015" },
        {
          kind: "community",
          text: "Australian Red Cross volunteer · Gapper Aus committee · RMIT student ambassador, peer mentor and SSCC representative, 2022–2024",
        },
      ],
      photoNote: "Interfaces, visuals, content — look at the work.",
      replyNote: "We reply within 24 hours.",
    },
    zh: {
      animal: "兔子",
      line: "我让技术变得清晰、自然，也值得被记住。",
      sub: "让用户更快理解、更早信任，并愿意持续使用。",
      evidence: [
        {
          claim: "产品与界面",
          proof: "一套餐厅系统里的三套角色界面——老板、经理、员工——共用同一套规则。",
        },
        {
          claim: "从设计到上线的代码",
          proof: "FastResume 从第一张线框图一直做到现在线上跑的这版 React。",
        },
        {
          claim: "品牌与视觉",
          proof: "Hi Fumi、Snaptrek、Pop Sushi、Hotmart 的品牌视觉与短视频，连续四年。",
        },
        {
          claim: "有外部核验",
          proof: "最佳 Vibe Coding 作品奖 · Vibe-a-thon 2026 —— 395 队/人参赛，六个席位。RMIT 校长嘉许名单 2024 —— 全校前 2%。",
        },
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
        "最佳 Vibe Coding 作品奖 —— Google AI 出海创想赛 Vibe-a-thon 2026 · GDG 杭州主办，颁奖于上海谷歌开发者大会\n395 队/人参赛 → Top 100 → Top 30 → 六个获奖席位",
        "RMIT 校长嘉许名单 2024 — 全校前 2%",
      ],
      background: [
        {
          kind: "client",
          text: "Hi Fumi 2026 · Snaptrek 2025 · Pop Sushi 2025 · Hotmart 2024",
          note: "品牌视觉与短视频，连续四年",
        },
        { kind: "experience", text: "Dovida｜居家照护员 · 2026" },
        { kind: "experience", text: "HTP Smart Energy｜行政与市场助理 · 2026" },
        { kind: "experience", text: "Intelligent Health Systems｜市场实习 · 2024" },
        { kind: "experience", text: "云辰期货｜市场研究实习 · 2023–2024" },
        { kind: "experience", text: "中国船舶 CSSC｜业务员 · 2023" },
        { kind: "education", text: "RMIT University｜商业学士（区块链商业方向）· 2022–2024" },
        { kind: "community", text: "Melbourne Bethel Bread of Life｜主日学助教 · 2015 年至今" },
        {
          kind: "community",
          text: "Australian Red Cross 志愿者 · Gapper Aus 委员会成员 · RMIT 学生大使、朋辈导师、SSCC 学生代表 · 2022–2024",
        },
      ],
      photoNote: "界面、视觉、内容 —— 看东西就好。",
      replyNote: "24 小时内回复。",
    },
  },
}

export const studio = {
  email: "rabbitshark.space@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/rabbitsharkspace-maker" },
    { label: "Instagram", url: "https://www.instagram.com/rabbitshark_space/" },
    { label: "YouTube", url: "https://www.youtube.com/channel/UCZ9bDkBShaIQKoNq-sz9hDA" },
    { label: "Email", url: "mailto:rabbitshark.space@gmail.com" },
  ],
  en: {
    recognition: {
      /*
       * The one claim on this site that somebody else made about us, so it is
       * the one that has to be checkable. GDG Hangzhou published the official
       * recap on 24 Aug 2026 with the field size (395 teams and individuals)
       * and the Top 6 list — Serene and Sunrise Care both appear on it, which
       * is where "two of the six" stops being our word for it.
       *
       * Two places, and both belong: GDG Hangzhou ran the contest, and the
       * awards were given at the Google Developer Conference in Shanghai on
       * 13 Aug, eleven days before the recap was published. Naming only the
       * organiser read as though the whole thing happened in one city.
       *
       * Public, and no login wall: it opens for a reader outside China too,
       * which is the only reason it is worth linking at all. Flagged as WeChat
       * in the label so an overseas client knows what they are clicking into
       * rather than meeting a Chinese-language page with no warning.
       */
      source: "https://mp.weixin.qq.com/s/g_1y5QxLG7nVxMZr_ND1Pw",
      sourceLabel: "GDG Hangzhou's official recap, 24 Aug 2026 (WeChat, in Chinese)",
      event: "Google AI Vibe-a-thon 2026 · organised by GDG Hangzhou · awarded at the Google Developer Conference, Shanghai",
      path: "395 entries → Top 100 → Top 30 → six winners. Two of the six came from the same two-person studio.",
      awards: "Jane — Best Vibe Coding Work · Jenny — Best Google AI Technology Application",
    },
    line: "Two founders. Strategy, engineering and design in one team.",
    sub: "We find the problem worth solving, then take the product all the way to launch.",
    /*
     * Organised by the visitor's problem rather than by our delivery model. The
     * old three — build it for you / build it and hand it over / teach you to
     * build it — were three answers to the same question, and the first two read
     * as the same offer twice. Nobody arrives thinking "I need a handover
     * model"; they arrive thinking "this is taking three people a week".
     *
     * `case` points at one of the featured cases above, so every offer has
     * something further up the page you can actually look at.
     */
    offers: [
      {
        title: "I need a product built",
        body: "From working out what it actually has to do, through prototype, to a deployed product with the keys handed over. No ongoing dependency on us.",
        proof: "Serene — photograph to filed appeal",
        case: "serene",
      },
      {
        title: "My process is eating people",
        body: "We find the repetitive work, design the automation around it and put it live — then train whoever has to run it after we leave.",
        proof: "100+ requests a day, hours to seconds",
        case: "ticketing",
      },
      {
        title: "My product isn't landing",
        body: "Interface, brand or a key user journey — reworked so people understand it faster, trust it sooner and keep using it.",
        proof: "FastResume — first wireframe to shipped React",
        case: "fastresume",
      },
    ],
  },
  zh: {
    recognition: {
      source: "https://mp.weixin.qq.com/s/g_1y5QxLG7nVxMZr_ND1Pw",
      sourceLabel: "GDG 杭州官方战报 · 2026 年 8 月 24 日",
      event: "Google AI 出海创想赛 Vibe-a-thon 2026 · GDG 杭州主办 · 颁奖于谷歌开发者大会（上海）",
      path: "395 队/人参赛 → Top 100 → Top 30 → 六个获奖席位，其中两个来自同一个两人工作室。",
      awards: "Jane —— 最佳 Vibe Coding 作品奖 · Jenny —— 最佳 Google AI 技术应用奖",
    },
    line: "两位创始人，把策略、工程与设计放在同一支团队里。",
    sub: "我们先找到值得解决的问题，再把产品一路做到上线。",
    offers: [
      {
        title: "我要做一个产品",
        body: "从弄清楚它到底要做什么开始，经过原型，到上线并把钥匙交给你。之后不依赖我们。",
        proof: "Serene —— 从拍照到递出申诉",
        case: "serene",
      },
      {
        title: "我的流程太吃人",
        body: "把重复的活儿找出来，围绕它设计自动化并上线，再把它交给之后要运行它的人。",
        proof: "每天 100+ 条，小时级压到秒级",
        case: "ticketing",
      },
      {
        title: "我的产品没被接住",
        body: "界面、品牌，或者某一段关键用户路径——重做一遍，让人更快理解、更早信任、愿意继续用。",
        proof: "FastResume —— 从第一张线框图到上线的 React",
        case: "fastresume",
      },
    ],
  },
}
