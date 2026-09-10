/*
 * Palette.
 *
 * One neutral paper ground for the whole site and exactly two accents — Jenny
 * cool, Jane warm. That is the argument the design makes: two people, two
 * disciplines, one studio. A third "studio green" would have made the home page
 * a world of its own again, so joint work is shown as the two accents together
 * (see the split byline bar on a case) rather than as a colour of its own.
 *
 * Every value here is dark enough to set type in. The old palette's fills —
 * #ffd322 at 1.6:1 on white — could only ever be borders, which is why the site
 * needed a parallel set of "ink" values for the same colours; one readable
 * value per person replaces both.
 */
export const JENNY = "#1d5fb5" // Jenny · systems, engineering, strategy
export const JANE = "#b84627" // Jane · design, experience, brand

// Wash behind the accent — annotation cards, tab chips, quiet fills.
export const JENNY_WASH = "#e8effa"
export const JANE_WASH = "#fbeae2"

// Neither person's colour. Used only where the page belongs to the studio
// rather than to one of them — the home tab in the nav, the default --accent.
export const STUDIO = "#3f6b4a"

export const ACCENT = { jenny: JENNY, jane: JANE }
export const WASH = { jenny: JENNY_WASH, jane: JANE_WASH }

/*
 * Background groups on a person page, sorted by field rather than by date: the
 * list mixes a degree, courses, client work and volunteering, and reading it as
 * one grey column tells you nothing.
 */
export const BG_KINDS = {
  client: { en: "Clients", zh: "合作过的客户" },
  experience: { en: "Experience", zh: "履历" },
  education: { en: "Education", zh: "教育" },
  business: { en: "Business", zh: "商科" },
  tech: { en: "Tech", zh: "技术" },
  creative: { en: "Creative", zh: "创意" },
  community: { en: "University & community", zh: "校园与社区" },
}

// Reading order, strongest evidence first: named clients, then jobs, then study.
export const BG_ORDER = [
  "client",
  "experience",
  "education",
  "business",
  "tech",
  "creative",
  "community",
]
