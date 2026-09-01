import { useState } from 'react'
import { methods } from './methods'
import type { InputValues } from './types';
import { ZonesTable } from './ZonesTable'

function App() {

  const [methodId, setMethodId] = useState(methods[0].id)
  const [values, setValues] = useState<Record<string, string>>({})
  const method = methods.find((m) => m.id === methodId)!

  function setValue(key: string, raw: string) {
    setValues((prev) => ({ ...prev, [key]: raw }))
  }

  const numeric: InputValues = {}
  let ready = true
  for (const input of method.inputs) {
    const raw = values[input.key]
    const n = Number(raw)
    if (raw === undefined || raw === '' || Number.isNaN(n)) {
      ready = false
    } else {
      numeric[input.key] = n
    }
  }
  const zones = ready ? method.compute(numeric) : null

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold text-purple-600">HR Zones</h1>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-gray-600">Method</span>
        <select
          className="mt-1 block w-full rounded border border-gray-300 p-2"
          value={methodId}
          onChange={(e) => setMethodId(e.target.value)}
        >
          {methods.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6 space-y-4">
        {method.inputs.map((input) => (
          <label key={input.key} className="block">
            <span className="text-sm font-medium text-gray-600">
              {input.label} ({input.unit})
            </span>
            <input
              type="number"
              value={values[input.key] ?? ''}
              min={input.min}
              max={input.max}
              onChange={(e) => setValue(input.key, e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            />
            {input.help && (
              <p className="mt-1 text-xs text-gray-400">{input.help}</p>
            )}
          </label>
        ))}
      </div>

      {zones && <ZonesTable zones={zones} />}
    </main>
  )
}

export default App