import type { ZoneMethod } from '../types'
import { frielRunHr } from './friel-run-hr'
import { karvonen } from './karvonen'

export const methods: ZoneMethod[] = [karvonen, frielRunHr]