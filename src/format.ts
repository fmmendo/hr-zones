import type { Zone } from './types'

// Turn a zone's bounds into a display string, handling open-ended zones.
export function formatRange(zone: Zone): string {
  const { lowerBound, upperBound } = zone
  if (lowerBound === undefined && upperBound !== undefined) return `< ${upperBound}`
  if (upperBound === undefined && lowerBound !== undefined) return `> ${lowerBound}`
  if (lowerBound !== undefined && upperBound !== undefined) return `${lowerBound}–${upperBound}`
  return '—'
}