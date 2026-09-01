import { useEffect, useState } from 'react'
import { methods } from './methods'
import { ZonesTable } from './ZonesTable'
import type { InputValues } from './types'

type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<Theme>(getSystemTheme)
  const [methodId, setMethodId] = useState(methods[0].id)
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          HR Zones
        </h1>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="rounded border border-gray-300 px-3 py-1 text-sm dark:border-gray-600"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Method
        </span>
        <select
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
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
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {input.label} ({input.unit})
            </span>
            <input
              type="number"
              value={values[input.key] ?? ''}
              min={input.min}
              max={input.max}
              onChange={(e) => setValue(input.key, e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
            />
            {input.help && (
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {input.help}
              </p>
            )}
          </label>
        ))}
      </div>

      {zones && <ZonesTable zones={zones} />}
    </main>
  )
}

export default App