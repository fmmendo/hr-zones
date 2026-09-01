export type ZoneUnit = 'bpm' | 'pace'
export type Discipline = 'run' | 'bike' | 'swim' | 'general'

export interface Zone {
    label: string
    description?: string 
    lowerBound?: number
    upperBound?: number
    unit: ZoneUnit
    color?: string
}

export interface InputSpec {
    key: string
    label: string
    unit: string
    min?: number
    max?: number
    help?: string
}

export type InputValues = Record<string, number>

export interface ZoneMethod {
    id: string
    name: string
    discipline?: Discipline
    inputs: InputSpec[]
    compute(values: InputValues): Zone[]
}