import { describe, it, expect } from 'vitest'
import { frielRunHr } from './friel-run-hr'

describe('friel running HR', () => {
  it('produces 7 zones with 5a/5b/5c', () => {
    const zones = frielRunHr.compute({ lthr: 170 })

    expect(zones).toHaveLength(7)
    expect(zones.map((z) => z.label)).toEqual([
      'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5a', 'Zone 5b', 'Zone 5c',
    ])
  })

  it('leaves zone 1 open at the bottom and 5c open at the top', () => {
    const zones = frielRunHr.compute({ lthr: 170 })

    expect(zones[0].lowerBound).toBeUndefined()
    expect(zones[0].upperBound).toBe(145)
    expect(zones[1].lowerBound).toBe(145)
    expect(zones[1].upperBound).toBe(151)
    expect(zones[2].lowerBound).toBe(153)
    expect(zones[2].upperBound).toBe(160)
    expect(zones[3].lowerBound).toBe(160)
    expect(zones[3].upperBound).toBe(168)
    expect(zones[4].lowerBound).toBe(170)
    expect(zones[4].upperBound).toBe(173)
    expect(zones[5].lowerBound).toBe(175)
    expect(zones[5].upperBound).toBe(180)
    expect(zones[6].lowerBound).toBe(182)
    expect(zones[6].upperBound).toBeUndefined()
  })
})