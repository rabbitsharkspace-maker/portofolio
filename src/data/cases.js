// Interface walkthroughs describe visible controls, not unverified founder interviews.
//
// Notes carry no coordinates. They were pinned to points on the screenshot while
// the case was a spread with markers on the image; the exhibition modal lists
// them instead, and x/y/side had been dead weight since.
export const cases = [
  {
    id: "mkr",
    owner: "both",
    image: "/ip/mkr.webp",
    // Held by the frame so the page does not jump when the shot loads.
    ratio: "2260 / 1227",
    // Presence identifies contributors; values are not estimates of effort.
    split: { jane: 50, jenny: 50 },
    link: null,
    en: {
      name: "My Kitchen Rules",
      kind: "Restaurant operations · 2025",
      problem:
        "A small restaurant owner is the cashier, the kitchen manager, the bookkeeper and the rosterer. Four jobs, four systems, and the day is spent carrying numbers between them.",
      did: "Product flow, three role-based interfaces, engineering and deployment.",
      metric: { value: "4 → 1", label: "four jobs, one system" },
    },
    zh: {
      name: "My Kitchen Rules",
      kind: "餐厅运营系统 · 2025",
      problem:
        "小餐厅的老板同时是收银、后厨管理、记账和排班。四份活、四套系统，一天的时间花在把数字从一个地方搬到另一个地方。",
      did: "产品流程、三套角色界面、开发与部署。",
      metric: { value: "4 → 1", label: "四份活，一套系统" },
    },
    notes: [
      {
        by: "jenny",
        en: {
          q: "Sync status",
          a: "The header includes an offline-safe indicator and a queued-write count. These make connection and synchronisation status visible beside the operational controls.",
        },
        zh: {
          q: "同步状态",
          a: "顶部展示离线状态与待同步数量，让连接和同步进度与操作入口一起可见。",
        },
      },
      {
        by: "jenny",
        en: {
          q: "Price comparison",
          a: "The cost view places price changes alongside delivery records, giving the reader a dated reference for the comparison.",
        },
        zh: {
          q: "价格对照",
          a: "成本视图把价格变化与送货记录放在一起，为对比提供具体日期的参照。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Role switching",
          a: "The role-switching control sits in the navigation rail. It provides a visible entry point to the different operational views.",
        },
        zh: {
          q: "角色切换",
          a: "侧栏保留切换视角的入口，便于找到不同角色的运营界面。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Familiar document structure",
          a: "The docket view groups supplier information and delivery details above the line items, following the structure of a delivery document.",
        },
        zh: {
          q: "熟悉的单据结构",
          a: "单据视图把供应商和送货信息放在明细上方，沿用送货单的信息结构。",
        },
      },
    ],
  },

  {
    id: "serene",
    owner: "jenny",
    image: "/ip/serene.webp",
    ratio: "1440 / 900",
    split: { jane: 0, jenny: 100 },
    link: null,
    en: {
      name: "Serene",
      kind: "AI advocacy assistant · 2026",
      problem:
        "A migrant or international student in Australia opens an official English letter — a fine, a show-cause notice — and the hard part is not appealing it. The hard part is working out what it is even saying.",
      did: "Product strategy, Gemini Vision pipeline, verification against official sources, full-stack build.",
      metric: { value: "5 steps", label: "photograph → filed appeal" },
    },
    zh: {
      name: "Serene",
      kind: "AI 维权助手 · 2026",
      problem:
        "在澳洲的移民和留学生收到一封官方英文信——罚单、Show Cause 通知——最难的不是申诉，是先弄明白它到底在说什么。",
      did: "产品策略、Gemini Vision 识别链路、依据核验、全栈开发。",
      metric: { value: "5 步", label: "拍照 → 递出申诉" },
    },
    notes: [
      {
        by: "jenny",
        en: {
          q: "A visible five-step flow",
          a: "The landing screen lays out the document-to-appeal journey before the visitor starts. Each stage has its own place in the sequence.",
        },
        zh: {
          q: "五步流程预览",
          a: "入口先展示从文件到申诉的完整路径，各阶段在流程中有明确的位置。",
        },
      },
      {
        by: "jenny",
        en: {
          q: "A separate verification stage",
          a: "Verification is presented as a distinct stage in the workflow, making the source-checking step visible alongside document reading and drafting.",
        },
        zh: {
          q: "独立的核验阶段",
          a: "流程把依据核验单独列为一个阶段，与读信、起草等环节并列展示。",
        },
      },
      {
        by: "jenny",
        en: {
          q: "State and language controls",
          a: "State and language selectors sit together in the header, keeping both choices accessible from the start.",
        },
        zh: {
          q: "州与语言选择",
          a: "州和语言的选择器并排放在顶部，让使用者从入口就能找到两项设置。",
        },
      },
    ],
  },

  {
    id: "fastresume",
    owner: "jane",
    image: "/ip/fastresume-home.webp",
    ratio: "1600 / 1000",
    split: { jane: 100, jenny: 0 },
    link: "https://fastresume.xyz",
    en: {
      name: "FastResume",
      kind: "AI career suite · 2025",
      problem:
        "Applying across borders means rewriting the same experience for every market, every filter and every language — and never knowing whether a machine will read it at all.",
      did: "Product experience, interface design, brand, and the front end through to shipped React.",
      metric: { value: "8 languages", label: "one rewrite, sent anywhere" },
    },
    zh: {
      name: "FastResume",
      kind: "AI 求职平台 · 2025",
      problem:
        "跨国投简历，意味着同一段经历要为每个市场、每套筛选规则、每种语言重写一遍——而且永远不知道机器到底读不读得懂。",
      did: "产品体验、界面设计、品牌，以及前端一直到上线的 React。",
      metric: { value: "8 种语言", label: "改一次，投到哪都能用" },
    },
    notes: [
      {
        by: "jane",
        en: {
          q: "AI and manual entry",
          a: "The start screen offers both AI assistance and a manual builder, giving visitors two visible ways to begin.",
        },
        zh: {
          q: "AI 与手动入口",
          a: "开始界面同时提供 AI 辅助和手动编辑，两条路径都可以直接选择。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Side-by-side comparison",
          a: "The two-panel layout places the job description and CV next to each other, making it easier to refer to both while editing.",
        },
        zh: {
          q: "并排对照",
          a: "双栏把职位描述与简历放在一起，编辑时可以同时参考两边的信息。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Visible usage allowance",
          a: "The header displays the remaining free tries, so the allowance can be read before starting another rewrite.",
        },
        zh: {
          q: "用量提示",
          a: "顶部展示剩余免费次数，开始下一次改写前就可以看到额度。",
        },
      },
    ],
  },
]

export const featuredIds = cases.map((c) => c.id)
