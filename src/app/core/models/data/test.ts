export interface Test {
  id: string
  name: string
  description?: string
  duration?: number
  points?: number
  questions?: number
  labels?: string[]

  calculations?: TestCalculations
}

export interface TestCalculations {
  penalties?: boolean    // with ir no penalties
  proportional?: boolean // proportional points calculation for partial answer
}

export const TESTS = 'tests'
