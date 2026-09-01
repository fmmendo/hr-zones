import { describe, it, expect } from 'vitest'
import { formatRange } from './format'

describe('formatRange', () => {
  it('formats a closed range', () => {
    expect(formatRange({ label: 'Z2', lowerBound: 125, upperBound: 138, unit: 'bpm' })).toBe('125–138')
  })
  it('formats an open bottom as "< upper"', () => {
    expect(formatRange({ label: 'Z1', upperBound: 145, unit: 'bpm' })).toBe('< 145')
  })
  it('formats an open top as "> lower"', () => {
    expect(formatRange({ label: 'Z5c', lowerBound: 182, unit: 'bpm' })).toBe('> 182')
  })
})