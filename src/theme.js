/*
 * Palette. Every bright value here is a FILL or a BORDER — never text.
 * #ffd322 on white is 1.6:1 and #45aef2 is 2.4:1, both far under the 4.5:1
 * body-text floor, so each family carries its own dark `ink` for type.
 */
export const BLUE = "#45aef2" // Jenny · Shark
export const YELLOW = "#ffd322" // Jane · Rabbit
export const GREEN = "#bae722" // RabbitShark · studio, and joint work

// Readable text stand-ins for the accents, same hue, dark enough to sit on white.
export const BLUE_INK = "#0b6ba8"
export const YELLOW_INK = "#8a6a00"
export const GREEN_INK = "#5a7a06"

/*
 * Card rims, straight off the 色卡. The framed boxes — "who we are",
 * "how we work", "capabilities" — cycle through these so each card in a grid
 * lights its border in a different colour instead of all sharing one accent.
 * Every value here is a swatch from the card, so the whole grid still reads as
 * one palette rather than a random rainbow.
 */
export const CARD_COLORS = [
  "#45aef2", // blue
  "#ffd322", // yellow
  "#bae722", // green
  "#7ede8d", // mint
  "#c5ff59", // lime
  "#ffde59", // gold
]

/*
 * Background, sorted by field rather than by date: the list is a mix of a
 * business degree, coding courses, client work and volunteering, and reading it
 * as one grey column tells you nothing. Each field carries one of the card's
 * saturated swatches — the pale end of the palette washes out against the page,
 * so the four here are the strongest of their hue family.
 */
export const BG_KINDS = {
  client: { en: "Clients", zh: "合作过的客户" },
  // Not "volunteering". These are the two lines that answer why this studio and
  // not another one: the tool for a job she actually works, the tool for a room
  // she has sat in for eleven years.
  whyus: { en: "Why us", zh: "为什么是我们" },
  experience: { en: "Experience", zh: "履历" },
  education: { en: "Education", zh: "教育" },
  business: { en: "Business", zh: "商科" },
  tech: { en: "Tech", zh: "技术" },
  creative: { en: "Creative", zh: "创意" },
  community: { en: "University & community", zh: "校园与社区" },
}

/*
 * Reading order, strongest evidence first: named clients, then the domain a tool
 * came out of, then the jobs, then the degree. A page only shows the groups it
 * has entries for, so Jenny's page still reads business → tech → community.
 */
export const BG_ORDER = [
  "client",
  "whyus",
  "experience",
  "education",
  "business",
  "tech",
  "creative",
  "community",
]

/*
 * Each page groups its background by field and heads each group in its own
 * world's family — Jenny's blues, Jane's golds. These are the darkened ends of
 * those families rather than the card swatches themselves: #ffd322 as type on
 * white is 1.6:1 and the label would be a stain rather than a word. Four hues
 * per family, far enough apart to tell one group's heading from another's.
 */
export const BG_INK = {
  jenny: {
    client: "#3d5aa8",
    whyus: "#0b6ba8",
    experience: "#0e6f6f",
    education: "#0b6ba8",
    business: "#0b6ba8",
    tech: "#0e6f6f",
    creative: "#3d5aa8",
    community: "#073763",
  },
  jane: {
    client: "#8a4b12",
    whyus: "#7a5a00",
    experience: "#5f6f0a",
    education: "#7d5b3a",
    business: "#7a5a00",
    tech: "#5f6f0a",
    creative: "#8a4b12",
    community: "#7a6a4a",
  },
}

/*
 * Per-owner card palette: the mesh-gradient rim colours, the glow hue in HSL
 * parts, and the fill/ink pair the cards and plaques paint with. Lives here
 * rather than in a component so both the card and the gallery plaque read the
 * same values.
 */
export const OWNER_THEME = {
  jenny: { colors: ["#45aef2", "#7fd0ff", "#c5f3ff"], glow: "205 87 61", fill: BLUE, ink: BLUE_INK },
  jane: { colors: ["#ffd322", "#ffe889", "#fff8dc"], glow: "49 100 57", fill: YELLOW, ink: YELLOW_INK },
  both: { colors: ["#bae722", "#c5ff59", "#dcffe7"], glow: "74 80 52", fill: GREEN, ink: GREEN_INK },
}
