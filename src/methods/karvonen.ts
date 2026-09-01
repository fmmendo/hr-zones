import type { InputValues, Zone, ZoneMethod } from '../types'

const ZONE_BANDS = [
  { label: 'Zone 1', low: 0.5, high: 0.6, description: 'Recovery'},
  { label: 'Zone 2', low: 0.6, high: 0.7, description: 'Aerobic'},
  { label: 'Zone 3', low: 0.7, high: 0.8, description: 'Tempo'},
  { label: 'Zone 4', low: 0.8, high: 0.9, description: 'Threshold'},
  { label: 'Zone 5', low: 0.9, high: 1.0, description: 'VO₂ Max'},
]

export const karvonen: ZoneMethod = {
    id: 'karvonen',
    name: 'Karvonen (HRR)',
    discipline: 'general',
    inputs: [
        { key: 'maxHr', label: 'Maximum Heart Rate', unit: 'bpm', min: 100, max: 230 },
        { key: 'restingHr', label: 'Resting Heart Rate', unit: 'bpm', min: 30, max: 120 },
    ],
    compute(values: InputValues): Zone[] {
        const { maxHr, restingHr } = values
        const reserve = maxHr - restingHr

        return ZONE_BANDS.map((band): Zone => ({
            label: band.label,
            description: band.description,
            lowerBound: Math.round(restingHr + band.low * reserve),
            upperBound: Math.round(restingHr + band.high * reserve),
            unit: 'bpm',
        }))
    },
}