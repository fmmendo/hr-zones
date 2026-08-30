import { describe, it, expect } from 'vitest'
import { karvonen } from './karvonen'

describe('karvonen', () => {
    it('computes 5 zones from heart rate reserve', () => {
        const zones = karvonen.compute({maxHr: 190, restingHr: 60})

        expect(zones).toHaveLength(5)
        expect(zones[0]).toMatchObject({ label: 'Zone 1', lowerBound: 125, upperBound: 138 })
        expect(zones[1]).toMatchObject({ label: 'Zone 2', lowerBound: 138, upperBound: 151 })
        expect(zones[2]).toMatchObject({ label: 'Zone 3', lowerBound: 151, upperBound: 164 })
        expect(zones[3]).toMatchObject({ label: 'Zone 4', lowerBound: 164, upperBound: 177 })
        expect(zones[4]).toMatchObject({ label: 'Zone 5', lowerBound: 177, upperBound: 190 })
    })
})