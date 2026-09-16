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
        "小餐厅的老板同时是收银、后厨管理、记账和排班。四份活、四套系统，一天的时间花在把数字从一个地方搬到另一个地方",
      did: "产品流程、三套角色界面、开发与部署",
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
          a: "顶部展示离线状态与待同步数量，让连接和同步进度与操作入口一起可见",
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
          a: "成本视图把价格变化与送货记录放在一起，为对比提供具体日期的参照",
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
          a: "侧栏保留切换视角的入口，便于找到不同角色的运营界面",
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
          a: "单据视图把供应商和送货信息放在明细上方，沿用送货单的信息结构",
        },
      },
    ],
  },

  {
    id: "serene",
    owner: "jenny",
    // The plate is a screenshot with words on it, so there is one per language.
    // The English page was showing the Mandarin interface, which made the first
    // thing a visitor saw an argument against the product working in English.
    image: { en: "/ip/serene-en.webp", zh: "/ip/serene.webp" },
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
          aside: "一条真实街道上的问题，成了一个产品的起点",
          body: "它要你做一件事，做不到会有后果。墨尔本街边两块停车牌：左边只能停十五分钟，右边只有 GoGet 共享车可以停。答不上来是正常的",
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
          caption: "先拍下来",
          captionAfter: "每一条依据，都能点开查原文",
          action: "拍下这封信",
          actionAfter: "看回原信",
          body: "读信和联网核验在同一次调用里完成，每一条依据都能点开查原文。批不批是官方定的——这里只负责让你知道，《2006 年违章法》里还有申请复审这条路",
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
          captionAfter: "第一步不是骗钱，是先把你和所有能提醒你的人切断",
          action: "Serene 会说什么",
          actionAfter: "回到那通电话",
          body: "四家官方同时在预警，目标写得很明确。那段话里最危险的不是钱——诈骗的第一步是先把你和所有能提醒你的人切断。Serene 做的事很简单：在你被切断的那一刻，当那个提醒你的人",
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
          caption: "出事的那个晚上",
          captionAfter: "不出事的日子，它也在",
          action: "不下雨的日子",
          actionAfter: "回到那个晚上",
          body: "出事是低频的，所以不出事的日子它也在——你住的 suburb 附近有什么活动、谁在拼饭、什么在出二手。我没办法让大家在国外不淋雨。但你出事的那个晚上，我想让你手里有一把伞",
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
      ground: "这通电话，我也接到过，而且不止一次",
      problem:
        "在陌生的国家，你真正失去的不是语言，是「知道下一步该做什么」的能力。手机上跳出一条看不懂的通知，它要你做一件事，做不到会有后果",
      did: "产品策略、读图与联网核验链路、三层模型路由、权限与隐私设计、全栈开发与部署",
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
      zh: "截图里的界面是中文。Serene 还提供 English、Español、हिन्दी、Tiếng Việt、العربية —— 界面跟着看它的人走",
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
          a: "直接问模型，它会编法条，而且编得特别像真的。所以读信和核验在同一次调用里完成，走 Gemini 的 Search Grounding，每一条依据都能点开查原文。批不批是官方定的——这里只负责让你知道，这条路存在",
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
          a: "罚单上有姓名、车牌、住址。信写好后打开 Gmail 草稿，主题和正文都填好，但发送键永远留给你自己按。申诉档案按 UID 属主隔离，Firestore 规则默认全拒，别人拿到链接也读不到。做应急产品的第一条是：不能再害你一次",
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
          a: "配置表里只放十年不变的常量：国名、急救电话、货币、州省列表。换到伦敦，同一个组件、同一条代码路径，只多一条配置。具体是哪个 council、哪条法条、从哪个入口申诉——一个字都没写在代码里，全是当场检索的",
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
          shotNote: "同一屏，中文、印地语、越南语、阿拉伯语。它递给你的那句话是你自己语言的名字，不是把界面翻译一遍",
          a: "翻译只回答「这上面写了什么」。真正卡住人的是下一句：那我现在该干什么。被车撞了、脑子一片空白的时候，它给的是现场清单——第一句是 Mandarin Chinese, please，因为澳洲的 000 有免费中文口译，但很多人不知道开口该说什么",
        },
      },
      {
        by: "jenny",
        // A drawing, not a screen: the routing happens before anything is
        // rendered, so there is no screenshot of it to take. Deliberately
        // without the "eight in ten" figure that sits in the paragraph — the
        // split is measured, the architecture is not, and a diagram states
        // things more flatly than a sentence does.
        shot: { en: "/ip/serene-models-en.webp", zh: "/ip/serene-models.webp" },
        en: {
          q: "Why three models",
          shotNote: "Which model answers is decided before the request leaves the phone.",
          a: "Reading an image or checking a source goes to Gemini. Plain text goes to Gemma. Offline falls back to Gemini Nano on the phone, where it answers from constants and phrasing only and never guesses at a statute. Around eight in ten requests take the cheaper path. Building for harm is a low-resource setting by nature: no signal is low-resource, no English is low-resource, and three in the morning with nobody to ask is low-resource too.",
        },
        zh: {
          q: "为什么要三个模型",
          shotNote: "用哪个模型，在请求离开手机之前就定了",
          a: "要读图、要联网核实的走 Gemini；纯文本走 Gemma；断网时走手机本地的 Gemini Nano——断网只答常量和话术，法条不猜。八成的请求走的是更省的那条。「善」这条赛道本来就是低资源环境：断网是，不会英文是，凌晨三点身边没人可问也是",
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
    /*
     * Four beats, same rule as Serene's: one magenta plate, one camera, one
     * shared crop box, so she holds her size and her place while the scene
     * changes. `scripts/make-plates.py` takes the box from the whole set at once
     * for that reason. The third beat breaks the camera on purpose — it is over
     * her shoulder onto the screen, because an interview is the one beat a
     * front-on figure cannot say by itself.
     *
     * The counter is the ATS score the product runs on, not a beat number.
     */
    scenes: [
      {
        art: "/ip/fastresume-01-openings.webp",
        fill: 0.34,
        segments: 20,
        en: {
          meter: "34%",
          meterCap: "ATS match",
          label: "Forty tabs open",
          word: "Unread",
          title: "Forty postings, forty CVs",
          body: "Every posting wants the same experience said a different way — its keywords, its filter, its language. The work is not writing one CV. It is writing forty, and never knowing which one a machine actually read.",
        },
        zh: {
          meter: "34%",
          meterCap: "ATS 匹配分",
          label: "开着四十个标签页",
          word: "没人读",
          title: "四十个岗位，四十份简历",
          body: "每个岗位都要求同一段经历换一种说法——它的关键词、它的筛选规则、它的语言。难的不是写一份简历，是写四十份，而且永远不知道机器读的是哪一份",
        },
      },
      {
        art: "/ip/fastresume-02-handover.webp",
        fill: 0.71,
        segments: 20,
        en: {
          meter: "71%",
          meterCap: "ATS match",
          label: "Read and rewritten",
          word: "Scored",
          title: "One CV in, scored against the posting",
          body: "The CV and the job description go in together. It returns an ATS score, then rewrites each line in STAR form — situation, task, action, result — against that posting rather than in general.",
        },
        zh: {
          meter: "71%",
          meterCap: "ATS 匹配分",
          label: "读一遍，改一遍",
          word: "有分数",
          title: "投进去一份，对着岗位打分",
          body: "简历和职位描述一起传进去。它给出 ATS 匹配分，再按 STAR 结构逐条改写——情境、任务、行动、结果——是对着这个岗位改，不是泛泛地改",
        },
      },
      {
        art: "/ip/fastresume-03-interview.webp",
        fill: 0.88,
        segments: 20,
        en: {
          meter: "88%",
          meterCap: "ATS match",
          label: "Said out loud",
          word: "Rehearsed",
          title: "Practise while it doesn't count",
          body: "The mock interview runs by voice. It asks, you answer out loud, and it comes back on what you actually said — so the first time you say it is not in the real room.",
        },
        zh: {
          meter: "88%",
          meterCap: "ATS 匹配分",
          label: "先说出口",
          word: "练过了",
          title: "在不算数的时候先说一遍",
          body: "模拟面试是语音的。它问，你出声答，它针对你真正说出口的内容给回应——这样第一次说出这段话，不是在真的面试里",
        },
      },
      {
        art: "/ip/fastresume-04-walkin.webp",
        fill: 0.96,
        segments: 20,
        en: {
          meter: "96%",
          meterCap: "ATS match",
          label: "Sent anywhere",
          word: "Ready",
          title: "Walk in with one you trust",
          body: "Eight languages out of one rewrite. The version that goes to Berlin and the version that goes to Singapore are the same experience, said the way each market reads it.",
        },
        zh: {
          meter: "96%",
          meterCap: "ATS 匹配分",
          label: "投到哪都能用",
          word: "能走了",
          title: "带着一份信得过的走进去",
          body: "一次改写，输出八种语言。投去柏林的那份和投去新加坡的那份是同一段经历，只是按各自的读法说了出来",
        },
      },
    ],
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
        "跨国投简历，意味着同一段经历要为每个市场、每套筛选规则、每种语言重写一遍——而且永远不知道机器到底读不读得懂",
      did: "产品体验、界面设计、品牌，以及前端一直到上线的 React",
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
          a: "开始界面同时提供 AI 辅助和手动编辑，两条路径都可以直接选择",
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
          a: "双栏把职位描述与简历放在一起，编辑时可以同时参考两边的信息",
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
          a: "顶部展示剩余免费次数，开始下一次改写前就可以看到额度",
        },
      },
    ],
  },

  {
    id: "kno",
    owner: "jenny",
    image: "/ip/kno.webp",
    ratio: "1440 / 900",
    split: { jane: 0, jenny: 100 },
    link: "https://knoko.space",
    /*
     * The one work on this site you can use rather than read about.
     *
     * knoko.space with ?demo=1 is the real app in read-only: a canvas of the
     * studio's own notes, the four tools wired to the results they actually
     * produced, and nothing it can generate or save. Cards move, tools open
     * their card, the audit opens. `lang` follows the page, so a Mandarin
     * reader gets the Mandarin canvas and the Mandarin interface.
     *
     * The frame is not fetched until someone presses the button — same rule as
     * the films. Until then it is the landing page, sitting still.
     */
    demo: { en: "https://knoko.space/?demo=1", zh: "https://knoko.space/?demo=1&lang=zh" },
    /*
     * Five beats, in the order a visitor meets them in the demo above: the
     * premise, then the four tools. The stills were rendered on one plate at one
     * camera and are cropped to a single box anchored on the feet, so she holds
     * her size and her place and the swap reads as one person moving.
     *
     * What each tool did here is what it actually did on that canvas — the
     * Collider merge, the Spark connection and the audit are quoted from the
     * output, not invented for the page.
     */
    scenes: [
      {
        art: "/ip/kno-ko.webp",
        tool: "note",
        en: {
          card: {
            label: "NOTE",
            title: "Serene",
            body: "In a country you don’t know, what you lose isn’t the language. It’s knowing what to do next.",
          },
          title: "It is all in here somewhere",
          body: "A PDF, a link, a voice note at midnight. Saving is the easy half \u2014 six months on it is all still here, and none of it has been opened since.",
        },
        zh: {
          card: {
            label: "NOTE",
            title: "Serene",
            body: "在一个你不熟的国家，丢掉的不是语言，是「下一步该做什么」的能力",
          },
          title: "\u4e1c\u897f\u5168\u5728\u8fd9\u513f\uff0c\u53ea\u662f\u6ca1\u4eba\u518d\u6253\u5f00",
          body: "\u4e00\u4efd PDF\u3001\u4e00\u6761\u94fe\u63a5\u3001\u534a\u591c\u968f\u624b\u5b58\u7684\u4e00\u6bb5\u8bed\u97f3\u3002\u5b58\u662f\u5bb9\u6613\u7684\u90a3\u4e00\u534a\u2014\u2014\u534a\u5e74\u540e\u5b83\u4eec\u90fd\u8fd8\u5728\uff0c\u4e00\u4e2a\u90fd\u6ca1\u88ab\u518d\u6253\u5f00\u8fc7",
        },
      },
      {
        art: "/ip/kno-alchemy.webp",
        tool: "alchemy",
        en: {
          card: {
            label: "ALCHEMY",
            title: "The Architecture of Disorientation",
            body: "Where information flow is fractured — by language or by process — the compass of certainty spins wildly.",
          },
          title: "Several notes, one idea",
          body: "Put a few cards beside each other and Alchemy fuses them into one. Not a summary of each \u2014 a single thing that exists only because they were sitting together.",
        },
        zh: {
          card: {
            label: "ALCHEMY",
            title: "失序的结构",
            body: "当信息流被切断——无论切断它的是语言的隔阂还是低效的流程——确定性的指南针就开始乱转",
          },
          title: "\u51e0\u5f20\u5361\uff0c\u7194\u6210\u4e00\u4e2a\u60f3\u6cd5",
          body: "\u628a\u51e0\u5f20\u5361\u6446\u5230\u4e00\u8d77\uff0cAlchemy \u628a\u5b83\u4eec\u7194\u6210\u4e00\u5f20\u3002\u4e0d\u662f\u9010\u6761\u6458\u8981\uff0c\u662f\u4e00\u4e2a\u53ea\u6709\u5f53\u5b83\u4eec\u633b\u5728\u4e00\u8d77\u65f6\u624d\u5b58\u5728\u7684\u4e1c\u897f",
        },
      },
      {
        art: "/ip/kno-collider.webp",
        tool: "collider",
        en: {
          card: {
            label: "COLLIDER",
            title: "Verified Contribution-to-Credential Pipeline",
            body: "Each resolved ticket instantly generates a verified, metric-driven résumé entry.",
          },
          title: "Two, and what comes out",
          body: "Collider takes exactly two and asks what a third would be. On our own canvas it merged a maintenance-ticket system with a r\u00e9sum\u00e9 generator, and proposed a career profile built from work that was actually done.",
        },
        zh: {
          card: {
            label: "COLLIDER",
            title: "可验证的「贡献 → 资历」流水线",
            body: "每一张被解决的工单，都即时生成一条可验证、带指标的履历条目",
          },
          title: "\u4e24\u5f20\uff0c\u548c\u649e\u51fa\u6765\u7684\u7b2c\u4e09\u5f20",
          body: "Collider \u53ea\u6536\u4e24\u5f20\uff0c\u95ee\u300c\u7b2c\u4e09\u5f20\u4f1a\u662f\u4ec0\u4e48\u300d\u3002\u5728\u6211\u4eec\u81ea\u5df1\u7684\u753b\u5e03\u4e0a\uff0c\u5b83\u628a\u4e00\u5957\u62a5\u4fee\u5de5\u5355\u548c\u4e00\u4e2a\u7b80\u5386\u751f\u6210\u5668\u5408\u5230\u4e00\u8d77\uff0c\u63d0\u51fa\u7528\u771f\u6b63\u505a\u8fc7\u7684\u4e8b\u6765\u957f\u51fa\u5c65\u5386",
        },
      },
      {
        art: "/ip/kno-spark.webp",
        tool: "spark",
        en: {
          card: {
            label: "SPARK",
            title: "The Unseen Ticketing System of Care",
            body: "Shift handovers are ticket transfers; incident reports from memory are delayed bug reports.",
          },
          title: "The connection nobody asked for",
          body: "Spark goes looking on its own. It read a care-work note beside a maintenance-ticket note and said they are the same system: shift handovers are ticket transfers, incident reports are late bug reports.",
        },
        zh: {
          card: {
            label: "SPARK",
            title: "照护里那套看不见的工单系统",
            body: "交接班是「工单转派」，凭记忆补的事故报告是延迟的「故障报告」",
          },
          title: "\u6ca1\u4eba\u5f00\u53e3\u8981\u7684\u90a3\u4e2a\u5173\u8054",
          body: "Spark \u662f\u81ea\u5df1\u53bb\u627e\u7684\u3002\u5b83\u8bfb\u4e86\u4e00\u5f20\u7167\u62a4\u7b14\u8bb0\u548c\u4e00\u5f20\u62a5\u4fee\u5de5\u5355\u7b14\u8bb0\uff0c\u8bf4\u8fd9\u4e24\u4ef6\u4e8b\u662f\u540c\u4e00\u5957\u7cfb\u7edf\uff1a\u4ea4\u63a5\u73ed\u5c31\u662f\u5de5\u5355\u8f6c\u6d3e\uff0c\u4e8b\u6545\u62a5\u544a\u5c31\u662f\u8fdf\u5230\u7684\u6545\u969c\u5355",
        },
      },
      {
        art: "/ip/kno-logicguard.webp",
        tool: "logicguard",
        en: {
          card: {
            label: "LOGIC GUARD",
            title: "Unverified Claim · Skewed",
            body: "“Response goes from hours to seconds” lacks empirical verification.",
          },
          title: "It audits us too",
          body: "The first thing Logic Guard flagged on that canvas was our own copy: two performance numbers stated without evidence, and a write-up that gives the upside and skips the failure modes. It is still there, on purpose.",
        },
        zh: {
          card: {
            label: "LOGIC GUARD",
            title: "未经验证的说法 · 偏斜",
            body: "「响应从几小时变成几秒」缺少实证验证",
          },
          title: "\u5b83\u8fde\u6211\u4eec\u81ea\u5df1\u4e5f\u5ba1",
          body: "Logic Guard \u5728\u90a3\u5757\u753b\u5e03\u4e0a\u6311\u51fa\u7684\u7b2c\u4e00\u6761\uff0c\u662f\u6211\u4eec\u81ea\u5df1\u7684\u6587\u6848\uff1a\u4e24\u4e2a\u6027\u80fd\u6570\u5b57\u6ca1\u7ed9\u4f9d\u636e\uff0c\u6574\u6bb5\u53ea\u8bb2\u597d\u7684\u4e00\u9762\u3001\u8df3\u8fc7\u4e86\u5931\u8d25\u6a21\u5f0f\u3002\u5b83\u8fd8\u7559\u5728\u90a3\u513f\uff0c\u662f\u6545\u610f\u7684",
        },
      },
    ],
    en: {
      name: "Kno",
      kind: "Spatial knowledge OS · 2026",
      ground: "I save everything and reopen none of it.",
      problem: "Everything worth keeping gets saved somewhere — a PDF, a link, a voice note, a screenshot at midnight. Saving is the easy half. What never happens is the part where two things you kept six months apart turn out to be the same problem.",
      did: "An infinite canvas you arrange by hand, and four tools that work on what you put on it. Alchemy fuses several notes into one idea. Collider merges two into a third. Spark goes looking for a connection you did not ask for. Logic Guard audits a claim on three axes — evidence, balance and reasoning — and says which one it fails.",
      metric: { value: "0 accounts", label: "nothing to sign up for" },
    },
    zh: {
      name: "Kno",
      kind: "空间知识操作系统 · 2026",
      ground: "我什么都存，但一个都不再打开",
      problem: "值得留下的东西都会被存在某个地方——一份 PDF、一条链接、一段语音、半夜随手截的一张图。存是容易的那一半。从来没发生的是：相隔半年存下的两件东西，其实说的是同一个问题",
      did: "一块无限大、自己动手摆的画布，加四个作用在你摆上去的东西上的工具。Alchemy 把几张卡熔成一个想法；Collider 把两张撞成第三张；Spark 去找你没开口要的那种关联；Logic Guard 从三个轴审一条说法——依据、平衡、推理——并指出它在哪一轴上站不住",
      metric: { value: "0 个账号", label: "不用注册就能用" },
    },
    notes: [
      {
        by: "jenny",
        en: {
          q: "Why a canvas and not a list",
          a: "A list decides the order for you, and the order is almost always the order you happened to save things in. On a canvas the arrangement is the thought: two cards sit next to each other because you put them there, and the tools only ever work on what you have already grouped.",
        },
        zh: {
          q: "为什么是画布，不是列表",
          a: "列表替你定了顺序，而那个顺序几乎总是你当初随手存下的顺序。在画布上，摆法本身就是想法：两张卡挻在一起，是因为你把它们放在了一起；而工具只对你已经归在一起的东西动手",
        },
      },
      {
        by: "jenny",
        en: {
          q: "Logic Guard audits us too",
          a: "The demo canvas holds our own project notes, and the first thing Logic Guard flagged was our own copy: “response goes from hours to seconds” and “eight in ten requests take the cheaper path”, both stated without evidence, and a write-up that gives the upside and skips the failure modes. That line is printed elsewhere on this site. It was the most useful thing the tool could have said, and it is left in the demo on purpose.",
        },
        zh: {
          q: "Logic Guard 连我们自己也审",
          a: "演示画布上放的就是我们自己的项目笔记，而 Logic Guard 挑出的第一条，正是我们自己的文案：「响应从几小时变成几秒」和「八成的请求走更省的那条」，两句都没给依据，而且整段只讲好的一面、跳过了失败模式。那句话就印在这个网站的另一处。这是它能说出的最有用的一句话，所以故意留在演示里",
        },
      },
      {
        by: "jenny",
        en: {
          q: "Why the demo cannot generate",
          a: "Kno runs on the visitor's own Gemini key, so a demo that generated would either need ours or ask a stranger for theirs before they know what the thing does. The four results on the canvas are real output, produced once and kept. Read-only stops at authoring: cards still move, tools still open their result, the audit still opens. Nothing is created, nothing is saved, no request is made.",
        },
        zh: {
          q: "为什么演示不能生成",
          a: "Kno 跑的是访客自己的 Gemini key。一个能生成的演示，要么花我们的 key，要么在人家还不知道这东西是干什么的时候就向他要 key。画布上那四个结果是真实输出，跑过一次，留下来。只读只拦在「创作」这一步：卡片照样拖，工具照样把它的结果调出来，审计照样展开。不新建、不保存、不发请求",
        },
      },
      {
        by: "jenny",
        en: {
          q: "Where the notes live",
          a: "In the browser — IndexedDB, with localStorage underneath it when IndexedDB is unavailable, which happens more often than you would think. There is no account to make and nothing to upload. It also means a cleared browser is a cleared library, which is the honest trade and is said on the way in.",
        },
        zh: {
          q: "笔记存在哪",
          a: "存在浏览器里——IndexedDB，IndexedDB 用不了时落到 localStorage，而这种情况比想象中多。没有账号要注册，也没有东西要上传。这也意味着浏览器一清，库就没了——这是这笔交易诚实的那一面，进门时就写着",
        },
      },
    ],
  },
  {
    id: "realheart",
    owner: "jane",
    image: "/ip/realheart-04-together.webp",
    ratio: "760 / 1294",
    split: { jane: 100, jenny: 0 },
    // Linked, not embedded: the app sleeps on a free Render dyno, and a cold
    // visit would hang the frame on a loading state for most of a minute.
    link: "https://realheart.onrender.com",
    /*
     * The other person is a flat silhouette in three of the four beats and is
     * never given a face — which is the product, not a shortcut around drawing
     * one. The arc is carried by distance rather than by a reveal: answering
     * alone, matched to a shape, talking across it, standing beside it.
     *
     * The counter is the fifteen-day wait itself, one segment a day.
     */
    scenes: [
      {
        art: "/ip/realheart-01-question.webp",
        fill: 0,
        segments: 15,
        en: {
          meter: "Day 0",
          meterCap: "of fifteen",
          label: "Before any photograph",
          word: "Honest",
          title: "Answer it properly, or not at all",
          body: "No photograph, no height, no job title. The first thing RealHeart asks for is an answer to something that takes a minute to think about — and it will not take a one-word reply.",
        },
        zh: {
          meter: "第 0 天",
          meterCap: "聊满 15 天",
          label: "在任何照片之前",
          word: "说真话",
          title: "要么好好答，要么别答",
          body: "没有照片，没有身高，没有职业。真心先问你一个要想一分钟才答得上来的问题——而且它不收一个词的答复",
        },
      },
      {
        art: "/ip/realheart-02-matched.webp",
        fill: 0.0667,
        segments: 15,
        en: {
          meter: "Day 1",
          meterCap: "of fifteen",
          label: "Matched",
          word: "Unseen",
          title: "Someone is there. You can't see them.",
          body: "A match arrives as a shape. You know they answered the same question and you know what they said. You do not know what they look like, and for fifteen days you will not.",
        },
        zh: {
          meter: "第 1 天",
          meterCap: "聊满 15 天",
          label: "匹配上了",
          word: "看不见",
          title: "有个人在那儿，但你看不见他",
          body: "匹配到的人先是一个轮廓。你知道他答了同一个问题，也知道他答了什么。你不知道他长什么样，而且十五天里都不会知道",
        },
      },
      {
        art: "/ip/realheart-03-typing.webp",
        fill: 0.6,
        segments: 15,
        en: {
          meter: "Day 9",
          meterCap: "of fifteen",
          label: "Fifteen days",
          word: "Talking",
          title: "Fifteen days of typing",
          body: "A counter fills one heart a day, and nobody can pay to skip it. The people who stop talking on day four were never going to make it to the photograph anyway.",
        },
        zh: {
          meter: "第 9 天",
          meterCap: "聊满 15 天",
          label: "十五天",
          word: "在聊",
          title: "十五天，只有字",
          body: "一个计数器每天点亮一颗心，没人能花钱跳过。第四天就不聊了的人，本来也走不到看脸那一步",
        },
      },
      {
        art: "/ip/realheart-04-together.webp",
        fill: 1,
        segments: 15,
        en: {
          meter: "Day 15",
          meterCap: "of fifteen",
          label: "Then the face",
          word: "Known",
          title: "By the time you see them, you know them",
          body: "On the fifteenth day the photograph opens. By then you have a fortnight of what they actually say — and the face is the last thing you learn about someone, not the first.",
        },
        zh: {
          meter: "第 15 天",
          meterCap: "聊满 15 天",
          label: "然后才是脸",
          word: "认识了",
          title: "等你看见他，你已经认识他了",
          body: "第十五天，照片才打开。那时候你已经有了两周他真正说过的话——脸是你最后知道的事，不是第一件",
        },
      },
    ],
    en: {
      name: "RealHeart",
      kind: "Honest matching · 2025",
      problem:
        "Dating apps sort by photograph. You swipe on a face, talk for three days, and find out on the first date that there was nothing to talk about — the part that decides it was never on the card.",
      did: "Product concept, the matching flow, interface design and brand.",
      metric: { value: "15 days", label: "before you see a face" },
    },
    zh: {
      name: "真心",
      kind: "真心匹配 · 2025",
      problem:
        "交友软件按照片排序。你划过一张脸，聊三天，第一次见面才发现根本没话说——真正决定结果的那部分，卡片上从来没有。",
      did: "产品概念、匹配流程、界面设计与品牌。",
      metric: { value: "15 天", label: "聊满了才看见脸" },
    },
    notes: [
      {
        by: "jane",
        en: {
          q: "The counter, not a paywall",
          a: "The fifteen days are shown as a row of hearts that fills one a day. It is the same control for everyone and there is no button that shortens it, so the wait reads as the rule of the place rather than as something being withheld until you pay.",
        },
        zh: {
          q: "计数器，不是付费墙",
          a: "十五天显示成一排每天点亮一颗的心。所有人是同一套规则，也没有任何按钮能缩短它——所以这段等待读起来是这个地方的规矩，而不是「不付钱就不给你」。",
        },
      },
      {
        by: "jane",
        en: {
          q: "A shape, not a blurred photo",
          a: "The unseen person is drawn as a flat silhouette rather than a blurred or pixelated portrait. A blur says a picture is being kept from you; a silhouette says there is no picture yet, which is what is actually true.",
        },
        zh: {
          q: "是轮廓，不是打码的照片",
          a: "还看不见的那个人画成扁平剪影，而不是模糊或马赛克的头像。打码的意思是「有照片但不给你看」，剪影的意思是「还没到看照片的时候」——后者才是实际情况。",
        },
      },
    ],
  },

  {
    id: "tarot",
    owner: "jane",
    image: "/ip/tarot-04-forward.webp",
    ratio: "548 / 1096",
    split: { jane: 100, jenny: 0 },
    // The name and the link are placeholders until the product has both.
    link: null,
    /*
     * Three cards, and the counter is how many are turned: none while it still
     * hurts, one once the question is asked, all three read, and all three at
     * the end — the reading does not keep going past the spread.
     */
    scenes: [
      {
        art: "/ip/tarot-01-broken.webp",
        fill: 0,
        segments: 3,
        en: {
          meter: "0",
          meterCap: "of three cards",
          label: "After the breakup",
          word: "Broken",
          title: "It ended, and the question didn't",
          body: "The relationship is over. The question — what now — is not, and at two in the morning there is nobody to ask who will not say the same three things.",
        },
        zh: {
          meter: "0 张",
          meterCap: "三张牌",
          label: "分手之后",
          word: "碎了",
          title: "关系结束了，问题没有",
          body: "关系是结束了。「那现在怎么办」没有——凌晨两点，能问的人翻来覆去只会说那三句话",
        },
      },
      {
        art: "/ip/tarot-02-asking.webp",
        fill: 0.34,
        segments: 3,
        en: {
          meter: "1",
          meterCap: "of three cards",
          label: "Three cards",
          word: "Asked",
          title: "Say it out loud, then draw",
          body: "You type the actual question — not 'will we get back together' but the one under it. Then you draw three cards, and the app does not pretend the cards decide anything.",
        },
        zh: {
          meter: "1 张",
          meterCap: "三张牌",
          label: "三张牌",
          word: "问出口",
          title: "先把问题说出来，再抽",
          body: "你打的是真正的问题——不是「我们会复合吗」，是它底下那个。然后抽三张，软件不假装是牌在做决定",
        },
      },
      {
        art: "/ip/tarot-03-reading.webp",
        fill: 1,
        segments: 3,
        en: {
          meter: "3",
          meterCap: "of three cards",
          label: "The reading",
          word: "Read",
          title: "What the three of them say together",
          body: "Past, present, and the thing you keep circling. The reading is written to your question and to what you said about the last six months, not to the card's stock meaning — which is why it is allowed to be gentle without being vague.",
        },
        zh: {
          meter: "3 张",
          meterCap: "三张牌",
          label: "解读",
          word: "读懂了",
          title: "三张牌放在一起说了什么",
          body: "过去、现在、和你一直绕着走的那件事。解读是对着你的问题和你说的那六个月写的，不是对着牌的标准释义——所以它可以温和，但不含糊",
        },
      },
      {
        art: "/ip/tarot-04-forward.webp",
        fill: 1,
        segments: 3,
        en: {
          meter: "3",
          meterCap: "read, and done",
          label: "This week",
          word: "Clearer",
          title: "Not an answer. A next step.",
          body: "It ends with one thing to do this week — small enough to actually do. Nobody is told the cards say to text him. The point was never the future. It was getting you to say what you already knew.",
        },
        zh: {
          meter: "3 张",
          meterCap: "读完了",
          label: "这一周",
          word: "清楚了",
          title: "不是答案，是下一步",
          body: "结尾是这周可以做的一件事——小到真的做得到。没人会被告知「牌说你该给他发消息」。重点从来不是未来，是让你把已经知道的事说出口",
        },
      },
    ],
    en: {
      name: "Tarot & love reading",
      kind: "Love-reading companion · 2025",
      problem:
        "After a breakup the question is not whether it hurts. It is what to do next — and everyone you could ask has already picked a side.",
      did: "Product concept, the reading flow, interface design and brand.",
      metric: { value: "3 cards", label: "one thing to do this week" },
    },
    zh: {
      name: "塔罗恋爱分析",
      kind: "恋爱解读 · 2025",
      problem:
        "分手之后，问题不是疼不疼，是接下来怎么办——而所有能问的人早就站好队了。",
      did: "产品概念、解读流程、界面设计与品牌。",
      metric: { value: "3 张牌", label: "这周做一件事" },
    },
    notes: [
      {
        by: "jane",
        en: {
          q: "The question comes before the cards",
          a: "The reading cannot start until the question is typed in full. A one-line prompt with no minimum let people draw for \"him\" and get a reading about nobody; asking for the real question first is what makes the reading specific.",
        },
        zh: {
          q: "先问，再抽牌",
          a: "没把问题完整打出来，就抽不了牌。之前一行没有下限的输入框，让人打个「他」就抽，读出来是关于没有人的解读；先要真正的问题，解读才有对象。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Ends on an action, not a forecast",
          a: "The last screen is a single suggested step, dated this week, with a checkbox. A prediction leaves someone waiting to see whether it comes true; a small task leaves them with something to do on Tuesday.",
        },
        zh: {
          q: "结尾是一件事，不是预言",
          a: "最后一屏是一个建议的小步骤，标着本周，带一个勾选框。预言让人等着看会不会应验；一件小事让人周二有事可做。",
        },
      },
    ],
  },

  {
    id: "sunrise",
    owner: "jane",
    image: "/ip/sunrise-01-arriving.webp",
    ratio: "548 / 1096",
    split: { jane: 100, jenny: 0 },
    // The sign-in screen, same as works.js: it is what a carer opens at seven
    // in the morning, so the click lands where the picture promised.
    link: "https://agecare-1.onrender.com/login",
    /*
     * Three beats, not four — the report reaching the family is not a picture
     * of a tablet, it is the reason she has a hand free in the last one.
     *
     * The counter is who has the reading: nobody on arrival, the carer once it
     * is written, and all three — carer, care system, family — by the time she
     * sits down. That is the whole product in one number.
     */
    scenes: [
      {
        art: "/ip/sunrise-01-arriving.webp",
        fill: 0,
        segments: 3,
        en: {
          meter: "0",
          meterCap: "of three told",
          label: "The round",
          word: "Here",
          title: "Eight visits before lunch",
          body: "A care round is a list of homes and a bag. The visit is twenty minutes; the notes on it used to be another ten, written in the car outside the next one.",
        },
        zh: {
          meter: "0 方",
          meterCap: "知道了",
          label: "这一轮",
          word: "到了",
          title: "午饭前八家",
          body: "一轮照护就是一张地址单和一个包。上门二十分钟，记录原来还要十分钟——坐在车里，在下一家门口写",
        },
      },
      {
        art: "/ip/sunrise-02-recording.webp",
        fill: 0.34,
        segments: 3,
        en: {
          meter: "1",
          meterCap: "of three told",
          label: "One reading, once",
          word: "Logged",
          title: "Say it once. It goes everywhere.",
          body: "Blood pressure, meds taken, how she slept, what she ate. Entered once, on the spot. The care plan, the shift handover and the family update are filled from the same four lines — nobody types them again.",
        },
        zh: {
          meter: "1 方",
          meterCap: "知道了",
          label: "只记一次",
          word: "记下了",
          title: "说一次，到处都有",
          body: "血压、吃没吃药、睡得怎样、吃了什么。当场记一次。照护计划、交班记录、给家属的更新，都从这四行里生成——没人再打第二遍",
        },
      },
      {
        art: "/ip/sunrise-03-hands.webp",
        fill: 1,
        segments: 3,
        en: {
          meter: "3",
          meterCap: "of three told",
          label: "The time it gives back",
          word: "Present",
          title: "The paperwork is done. She isn't.",
          body: "By the time she is sitting with her, the numbers are already with the care system and on her daughter's phone. That is what the ten minutes were for — not the form. This.",
        },
        zh: {
          meter: "3 方",
          meterCap: "知道了",
          label: "省下的那十分钟",
          word: "陪着",
          title: "表格填完了，人还在",
          body: "等她坐下来握着老人的手，数据已经到了养老系统，也到了女儿的手机上。省下的那十分钟就是为了这个——不是为了表格，是为了这一刻",
        },
      },
    ],
    en: {
      name: "Sunrise Care",
      kind: "AI caregiver support · 2025",
      problem:
        "A carer's day is twenty-minute visits and ten-minute forms, and the forms are the part that stays late. The same four numbers get typed into three places, and the daughter still rings to ask.",
      did: "Product concept, the round-and-report flow, interface design and brand — built for the round Jane works herself.",
      metric: { value: "1 → 3", label: "one entry, three places" },
    },
    zh: {
      name: "Sunrise Care",
      kind: "AI 照护支持平台 · 2025",
      problem:
        "护工的一天是二十分钟一家的上门和十分钟一家的表格，加班的永远是表格那部分。同样四个数字要敲进三个地方，女儿还是会打电话来问。",
      did: "产品概念、上门与汇报流程、界面设计与品牌——做给 Jane 自己在跑的那一轮。",
      metric: { value: "1 → 3", label: "记一次，三处都有" },
    },
    notes: [
      {
        by: "jane",
        en: {
          q: "One form, three readers",
          a: "The visit note has one entry screen. Saving it writes the care plan line, the handover entry and the family notice at once, each in its own wording — the family gets \"slept well, ate lunch\", not the field names.",
        },
        zh: {
          q: "一张表，三个读者",
          a: "上门记录只有一个录入页。保存时同时写入照护计划、交班记录和家属通知，各用各的措辞——家属看到的是「睡得好，午饭吃了」，不是字段名。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Sign-in is the front door",
          a: "The wall links to the sign-in screen rather than a landing page, because that is the screen a carer actually opens at seven in the morning. The link lands where the picture promised.",
        },
        zh: {
          q: "登录页就是正门",
          a: "墙上链的是登录页而不是介绍页，因为护工早上七点打开的就是这一屏。点过去，落在图上承诺的那个地方。",
        },
      },
    ],
  },

  {
    id: "skills",
    owner: "jane",
    image: "/ip/skills-04-highfive.webp",
    // Wider than the other sets: the floating objects sit either side of her.
    ratio: "548 / 961",
    split: { jane: 100, jenny: 0 },
    link: null,
    /*
     * The counter is what she still has to hold in her head: six, six again
     * once the helper turns up (arriving is not sorting), one when it is a
     * list, none at four o'clock. The rail runs the other way — it fills as
     * things are handed off — so it reads as relief, not as a pile.
     */
    scenes: [
      {
        art: "/ip/skills-01-hiding.webp",
        fill: 0,
        segments: 6,
        en: {
          meter: "6",
          meterCap: "in her head",
          label: "Tuesday",
          word: "Under",
          title: "Everything, at once, all of it hers",
          body: "Six things are on her, none of them big, all of them due. The phone, the invoice, the friend she has owed a reply since March. The list is not long. It is that every item is a person.",
        },
        zh: {
          meter: "6 件",
          meterCap: "都在脑子里",
          label: "周二",
          word: "顶不住",
          title: "什么都是，什么都得她",
          body: "六件事压在她身上，没一件大，件件都到期了。电话、发票、三月起就欠着一句回复的朋友。清单不长。是每一条背后都是一个人",
        },
      },
      {
        art: "/ip/skills-02-helper.webp",
        fill: 0,
        segments: 6,
        en: {
          meter: "6",
          meterCap: "in her head, still",
          label: "Something turned up",
          word: "Noticed",
          title: "It asked one question",
          body: "Not \"how can I help\" — \"which of these has a person waiting on it?\" Three did. That was the first time all day the six had an order.",
        },
        zh: {
          meter: "6 件",
          meterCap: "还在脑子里",
          label: "有东西出现了",
          word: "抬头了",
          title: "它只问了一句",
          body: "不是「我能帮什么」，是「这里面哪几件有人在等」。三件。这是一整天里六件事第一次有了先后",
        },
      },
      {
        art: "/ip/skills-03-sorted.webp",
        fill: 0.834,
        segments: 6,
        en: {
          meter: "1",
          meterCap: "in her head — the list",
          label: "One list",
          word: "Sorted",
          title: "Six things, one column, today's on top",
          body: "The three with people waiting went first, with a draft reply already under each. The invoice moved to Thursday, because that is when it is actually due. Nothing was done for her. It was put where she could reach it.",
        },
        zh: {
          meter: "1 件",
          meterCap: "在脑子里——那张清单",
          label: "一张清单",
          word: "理顺了",
          title: "六件事，一列，今天的在最上面",
          body: "有人等着的三件排在前面，每件底下已经有一句草拟的回复。发票挪到了周四，因为它真正到期是周四。没有一件是替她做的。是放到了她伸手够得着的地方",
        },
      },
      {
        art: "/ip/skills-04-highfive.webp",
        fill: 1,
        segments: 6,
        en: {
          meter: "0",
          meterCap: "in her head",
          label: "Done by four",
          word: "Done",
          title: "Then the high five",
          body: "Six sent, one of them the March reply. The assistant did not do her day; it made her day the right length. She has skills for this now — reminders that know which items are people, follow-ups that come back on their own — and a hand to slap at four o'clock.",
        },
        zh: {
          meter: "0 件",
          meterCap: "脑子里空了",
          label: "四点前做完",
          word: "做完了",
          title: "然后击掌",
          body: "六件都发出去了，包括三月欠的那句。助手没有替她过这一天，它把这一天变成了对的长度。现在她有了一套自己的 skills——分得清哪条背后是人的提醒、会自己回来的跟进——以及四点钟能击一下的手",
        },
      },
    ],
    en: {
      name: "Jane AI Skills",
      kind: "Personal assistant skills · 2025",
      problem:
        "The list is never long. It is that every item is a person — the reply owed, the follow-up promised, the parent to ring — and a to-do app treats them all like the invoice.",
      did: "The skill set: reminders that know which items are people, follow-ups that return on their own, and a daily order that puts the waiting ones first.",
      metric: { value: "6 → 0", label: "on her plate by four o'clock" },
    },
    zh: {
      name: "Jane AI Skills",
      kind: "个人助手 skills · 2025",
      problem:
        "清单从来不长。难的是每一条背后都是一个人——欠的回复、答应的跟进、该打给爸妈的电话——而待办软件把它们都当成发票。",
      did: "一套 skills：分得清哪条背后是人的提醒、会自己回来的跟进、把有人在等的排在前面的每日顺序。",
      metric: { value: "6 → 0", label: "四点前清空" },
    },
    notes: [
      {
        by: "jane",
        en: {
          q: "People first, by design",
          a: "Every item can be tagged with who is waiting on it. The daily order sorts tagged items above untagged ones before it sorts by date, so a reply owed to a friend outranks a form due the same day.",
        },
        zh: {
          q: "先人后事",
          a: "每一条都可以标上是谁在等。每日排序先把标了人的放到没标的前面，再按日期排——所以欠朋友的一句回复，排在同一天到期的一张表格前面。",
        },
      },
      {
        by: "jane",
        en: {
          q: "Follow-ups that come back",
          a: "A follow-up is set with a return date, not a reminder time. On that date it reappears at the top with the original thread attached, so nothing has to be searched for before it can be answered.",
        },
        zh: {
          q: "会自己回来的跟进",
          a: "跟进设的是回来的日期，不是提醒时间。到那天它带着原来的对话回到最上面，回复之前不用再翻找。",
        },
      },
    ],
  },
]

export const featuredIds = cases.map((c) => c.id)
