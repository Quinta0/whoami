// Tiny shared state between the page and the particle scene
export type HoverState = { key: string | null; label: string | null; on: boolean }
export const hover: HoverState = { key: null, label: null, on: false }
export function hoverIn(key: string, label: string) { hover.key = key; hover.label = label; hover.on = true }
export function hoverOut() { hover.on = false }
