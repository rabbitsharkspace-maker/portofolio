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
