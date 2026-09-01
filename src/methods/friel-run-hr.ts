import type { InputValues, Zone, ZoneMethod } from '../types'

const ZONE_BANDS = [
  { label: 'Zone 1',  description: 'Recovery',           low: undefined, high: 0.85 },
  { label: 'Zone 2',  description: 'Aerobic',            low: 0.85, high: 0.89 },
  { label: 'Zone 3',  description: 'Tempo',              low: 0.9,  high: 0.94 },
  { label: 'Zone 4',  description: 'SubThreshold',       low: 0.94, high: 0.99 },
  { label: 'Zone 5a', description: 'SuperThreshold',     low: 1.0,  high: 1.02 },
  { label: 'Zone 5b', description: 'Aerobic Capacity',   low: 1.03, high: 1.06 },
  { label: 'Zone 5c', description: 'Anaerobic Capacity', low: 1.07, high: undefined },
]

export const frielRunHr: ZoneMethod = {
    id: 'friel-run-hr',
    name: 'Joe Friel - Running (HR)',
    discipline: 'run',
    inputs: [
        {
            key: 'lthr',
            label: 'Lactate Threshold Heart Rate',
            unit: 'bpm',
            min: 100,
            max: 220,
            help: 'Avg HR over the last 20 min of a 30-min time trial',
        }
    ],
    compute(values: InputValues): Zone[] {
        const { lthr } = values
        const bpm = (pct: number | undefined) => 
            pct === undefined ? undefined : Math.round(pct * lthr)

        return ZONE_BANDS.map((band): Zone => ({
            label: band.label,
            description: band.description,
            lowerBound: bpm(band.low),
            upperBound: bpm(band.high),
            unit: 'bpm',
        }))
    },
}