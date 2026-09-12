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
    // The live app sleeps on a free Render dyno, so the screenshot stands in for
    // it. The film does the job the live site can't — it is the artifact.
    //
    // Served from here rather than embedded, wherever we hold the cut. YouTube
    // decides on its own when to put a "sign in to confirm you're not a bot"
    // wall in front of an embed, and a visitor behind a VPN, a office network
    // or a hardened browser then meets a login screen where the work should be.
    // That is the one artifact on the page we cannot afford to hand to someone
    // else. `youtube` stays as the outward link, and as the fallback for any
    // language whose cut we do not hold.
    //
    // The English file here is the render before four legibility fixes landed
    // (the explainer's size and timing, lyrics dropped to a subtitle band, an
    // ON THE PHONE tag on the scam line, an English Gmail capture at 1:49).
    // Replacing it is one file at the same path. A film with rough labels beats
    // a login wall, and English is what a visitor gets by default.
    film: {
      youtube: "AUUurypUerY",
      en: "/media/serene-en-720p.mp4",
      zh: "/media/serene-cn-720p.mp4",
    },
    // The film's own cover, not a product shot. A play button over a screenshot
    // reads as "this screenshot will play"; the umbrella in the rain reads as a
    // film, and it is the same umbrella the fourth beat ends on. Kept local, so
    // nothing reaches YouTube until someone presses play.
    // One per language: the two covers carry the same rainy street and the same
    // closing line in the language the page is reading in.
    poster: { en: "/ip/serene-film.webp", zh: "/ip/serene-film-zh.webp" },
    ratio: "1440 / 900",
    split: { jane: 0, jenny: 100 },
    link: null,
    /*
     * Four beats of Jenny's own talk, in the order she gives them.
     *
     * The four stills were rendered on one magenta plate at one camera, and are
     * cropped to a single shared box — so she holds her size and her place while
     * the scene under the reader changes, and the swap reads as one person
     * moving rather than four pictures cutting.
     */
    scenes: [
      {
        art: "/ip/serene-01-notice.webp",
        en: {
          title: "A notice you can't read",
          word: "Unreadable",
          label: "Melbourne, day one",
          stamp: "01 / MELBOURNE",
          caption: "Can you park here, or not?",
          aside: "A question off a real street. The beginning of a product.",
          body: "It asks something of you, and there are consequences if you don't. Two parking signs on one Melbourne street: fifteen minutes on the left, GoGet share cars only on the right. Not knowing is the normal case.",
        },
        zh: {
          title: "一条你看不懂的通知",
          word: "看不懂",
          label: "落地第一天",
          stamp: "01 / 墨尔本",
          caption: "这里，到底能不能停？",
          aside: "一条真实街道上的问题，成了一个产品的起点。",
          body: "它要你做一件事，做不到会有后果。墨尔本街边两块停车牌：左边只能停十五分钟，右边只有 GoGet 共享车可以停。答不上来是正常的。",
        },
      },
      {
        art: "/ip/serene-02-photo.webp",
        en: {
          title: "Photograph it. It does the rest.",
          word: "Verified",
          label: "Read and verify",
          stamp: "02 / SERENE",
          caption: "Photograph it first.",
          captionAfter: "Every citation opens to its source.",
          action: "Photograph the letter",
          actionAfter: "Back to the letter",
          body: "Reading and verification happen in the same call, and every citation opens to its source. Whether an appeal succeeds is the authority's decision — this only makes sure you know the Infringements Act 2006 leaves that road open.",
        },
        zh: {
          title: "拍张照，剩下的它替你做",
          word: "核实了",
          label: "读信与核验",
          stamp: "02 / SERENE",
          caption: "先拍下来。",
          captionAfter: "每一条依据，都能点开查原文。",
          action: "拍下这封信",
          actionAfter: "看回原信",
          body: "读信和联网核验在同一次调用里完成，每一条依据都能点开查原文。批不批是官方定的——这里只负责让你知道，《2006 年违章法》里还有申请复审这条路。",
        },
      },
      {
        art: "/ip/serene-03-call.webp",
        en: {
          title: "“Don’t tell your family.”",
          word: "Cut off",
          label: "The call",
          stamp: "03 / INCOMING CALL",
          caption: "“Don’t tell your family or your friends.”",
          captionAfter: "The first move is not the money. It is cutting you off from anyone who could warn you.",
          action: "What Serene says",
          actionAfter: "Back to the call",
          body: "Four agencies warning at once, and the target named plainly. The most dangerous line in that call is not about the money: the first move is to cut you off from everyone who could warn you. Serene does one simple thing — at the moment you are cut off, it is the one who warns you.",
        },
        zh: {
          title: "「不许告诉家人朋友。」",
          word: "切断",
          label: "那通电话",
          stamp: "03 / 来电",
          caption: "「不许告诉家人朋友。」",
          captionAfter: "第一步不是骗钱，是先把你和所有能提醒你的人切断。",
          action: "Serene 会说什么",
          actionAfter: "回到那通电话",
          body: "四家官方同时在预警，目标写得很明确。那段话里最危险的不是钱——诈骗的第一步是先把你和所有能提醒你的人切断。Serene 做的事很简单：在你被切断的那一刻，当那个提醒你的人。",
        },
      },
      {
        art: "/ip/serene-04-umbrella.webp",
        en: {
          title: "An umbrella in your hand",
          word: "Shelter",
          label: "Ordinary days",
          stamp: "04 / EVERYDAY LIFE",
          caption: "On the night it happens.",
          captionAfter: "And on the days nothing happens, it is still there.",
          action: "The days it doesn’t rain",
          actionAfter: "Back to that night",
          body: "Emergencies are rare, so on the days nothing happens it is still there — what is on near your suburb, who is sharing a meal, what is going second-hand. I can't keep anyone from getting rained on abroad. But on the night it happens, I want there to be an umbrella in your hand.",
        },
        zh: {
          title: "手里有一把伞",
          word: "有伞",
          label: "不出事的日子",
          stamp: "04 / 日常",
          caption: "出事的那个晚上。",
          captionAfter: "不出事的日子，它也在。",
          action: "不下雨的日子",
          actionAfter: "回到那个晚上",
          body: "出事是低频的，所以不出事的日子它也在——你住的 suburb 附近有什么活动、谁在拼饭、什么在出二手。我没办法让大家在国外不淋雨。但你出事的那个晚上，我想让你手里有一把伞。",
        },
      },
    ],
    en: {
      name: "Serene",
      kind: "A landing copilot for newcomers · 2026",
      ground: "I have had that phone call myself. More than once.",
      problem:
        "In a country you don't know, what you lose isn't the language. It's knowing what to do next. A notice arrives that you can't read, it asks something of you, and there are consequences if you don't.",
      did: "Product strategy, the read-and-verify pipeline, three-tier model routing, the permissions and privacy design, full-stack build and deploy.",
      metric: { value: "5 steps", label: "photograph → filed appeal" },
    },
    zh: {
      name: "Serene",
      kind: "落地安心副驾 · 2026",
      ground: "这通电话，我也接到过，而且不止一次。",
      problem:
        "在陌生的国家，你真正失去的不是语言，是「知道下一步该做什么」的能力。手机上跳出一条看不懂的通知，它要你做一件事，做不到会有后果。",
      did: "产品策略、读图与联网核验链路、三层模型路由、权限与隐私设计、全栈开发与部署。",
      metric: { value: "5 步", label: "拍照 → 递出申诉" },
    },
    /*
     * Why an English reader is looking at a Mandarin interface.
     *
     * Serene ships in zh / es / hi / vi / ar and deliberately not in English —
     * the letter is already in English, and a person who could read the
     * interface in it would not need the product. Worth saying once, rather
     * than leaving the screens looking like an oversight on the English side.
     */
    notesNote: {
      en: "The screens are shown in English. Serene also ships in Mandarin, Spanish, Hindi, Vietnamese and Arabic — the interface follows whoever is reading it.",
      zh: "截图里的界面是中文。Serene 还提供 English、Español、हिन्दी、Tiếng Việt、العربية —— 界面跟着看它的人走。",
    },
    notes: [
      {
        by: "jenny",
        shot: { en: "/ip/serene-ui-legal-en.webp", zh: "/ip/serene-ui-legal.webp" },   // 法援站 — "AI 实时校证官方渠道"
        en: {
          q: "Why verification is its own step",
          a: "Ask a model directly and it will invent the statute, convincingly. So reading and verification happen in one call, through Gemini's Search Grounding, and every citation opens to its source. Whether an appeal succeeds is the authority's decision — this only makes sure you know the option exists.",
        },
        zh: {
          q: "为什么核验要单独占一步",
          a: "直接问模型，它会编法条，而且编得特别像真的。所以读信和核验在同一次调用里完成，走 Gemini 的 Search Grounding，每一条依据都能点开查原文。批不批是官方定的——这里只负责让你知道，这条路存在。",
        },
      },
      {
        by: "jenny",
        shot: { en: "/ip/serene-ui-desk-en.webp", zh: "/ip/serene-ui-desk.webp" },    // 我的案头 — "一键生成官方英文邮件草稿"
        en: {
          q: "Why it drafts but never sends",
          a: "A fine carries your name, your plate and your address. The letter opens as a Gmail draft with the subject and body already filled in, and the send button stays yours. Case files are isolated by owner UID; Firestore rules deny by default, so a leaked link reads nothing. The first rule of building for an emergency: don't harm the person a second time.",
        },
        zh: {
          q: "为什么只建草稿，不代发",
          a: "罚单上有姓名、车牌、住址。信写好后打开 Gmail 草稿，主题和正文都填好，但发送键永远留给你自己按。申诉档案按 UID 属主隔离，Firestore 规则默认全拒，别人拿到链接也读不到。做应急产品的第一条是：不能再害你一次。",
        },
      },
      {
        by: "jenny",
        shot: { en: "/ip/serene-ui-letter-en.webp", zh: "/ip/serene-ui-letter.webp" },  // 信件官 — 顶栏 澳大利亚 / Victoria / 中文
        en: {
          q: "The state selector is a boundary",
          a: "The config table holds only what doesn't change in a decade: country, emergency number, currency, the list of states. Switch to London and it is the same component on the same code path, plus one line of config. Which council, which statute, which appeal portal — none of that is written in the code. It is retrieved at the moment you ask.",
        },
        zh: {
          q: "州和国家的选择器，划的是一条边界",
          a: "配置表里只放十年不变的常量：国名、急救电话、货币、州省列表。换到伦敦，同一个组件、同一条代码路径，只多一条配置。具体是哪个 council、哪条法条、从哪个入口申诉——一个字都没写在代码里，全是当场检索的。",
        },
      },
      {
        by: "jenny",
        /*
         * Four languages of the same screen, because one of them proves nothing.
         * The app does not translate the sentence — it swaps which language it
         * asks the operator for, and in English it would ask for English, which
         * is the one thing nobody dialling 000 in Australia has ever needed.
         */
        shot: "/ip/serene-ui-aid-langs.webp",     // 急救包 — "Mandarin Chinese, Please!"
        en: {
          q: "Not a translation tool",
          shotNote: "The same screen in Mandarin, Hindi, Vietnamese and Arabic. The phrase it puts in your mouth is the name of your language, not a translation of the interface.",
          a: "Translation answers “what does this say”. The sentence that actually stops you is the next one: so what do I do now. After a crash, when your head is empty, it hands you a script for the scene — and the first line is “Mandarin Chinese, please”, because Australia's 000 has free Mandarin interpreting and most people don't know how to open the call.",
        },
        zh: {
          q: "它不是翻译工具",
          shotNote: "同一屏，中文、印地语、越南语、阿拉伯语。它递给你的那句话是你自己语言的名字，不是把界面翻译一遍。",
          a: "翻译只回答「这上面写了什么」。真正卡住人的是下一句：那我现在该干什么。被车撞了、脑子一片空白的时候，它给的是现场清单——第一句是 Mandarin Chinese, please，因为澳洲的 000 有免费中文口译，但很多人不知道开口该说什么。",
        },
      },
      {
        by: "jenny",
        en: {
          q: "Why three models",
          a: "Reading an image or checking a source goes to Gemini. Plain text goes to Gemma. Offline falls back to Gemini Nano on the phone, where it answers from constants and phrasing only and never guesses at a statute. Around eight in ten requests take the cheaper path. Building for harm is a low-resource setting by nature: no signal is low-resource, no English is low-resource, and three in the morning with nobody to ask is low-resource too.",
        },
        zh: {
          q: "为什么要三个模型",
          a: "要读图、要联网核实的走 Gemini；纯文本走 Gemma；断网时走手机本地的 Gemini Nano——断网只答常量和话术，法条不猜。八成的请求走的是更省的那条。「善」这条赛道本来就是低资源环境：断网是，不会英文是，凌晨三点身边没人可问也是。",
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
