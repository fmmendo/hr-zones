import type { Zone } from './types'

// Same hues as the old bars, faded to a row fill via the /opacity modifier.
const ZONE_ROW_COLORS = [
  'bg-sky-500/10',
  'bg-cyan-500/10',
  'bg-green-500/10',
  'bg-yellow-500/10',
  'bg-orange-500/10',
  'bg-red-500/10',
  'bg-rose-600/15',
]

export function ZonesTable({ zones }: { zones: Zone[] }) {
  return (
    <table className="mt-6 w-full border-collapse text-sm">
      <thead>
        <tr className="text-gray-500">
          <th className="py-1 text-left">Zone</th>
          <th className="py-1 text-left">Description</th>
          <th className="py-1 text-right">Min (bpm)</th>
          <th className="py-1 text-right">Max (bpm)</th>
        </tr>
      </thead>
      <tbody>
        {zones.map((zone, i) => (
          <tr
            key={zone.label}
            className={ZONE_ROW_COLORS[i % ZONE_ROW_COLORS.length]}
          >
            <td className="py-2 pl-2 font-semibold">{zone.label}</td>
            <td className="py-2">{zone.description}</td>
            <td className="py-2 pr-2 text-right tabular-nums">
              {zone.lowerBound ?? ''}
            </td>
            <td className="py-2 pr-2 text-right tabular-nums">
              {zone.upperBound ?? ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}