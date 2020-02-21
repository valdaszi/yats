export interface Test {
  id: string
  name: string
  description?: string
  duration?: number
  points?: number
  questions?: number
  labels?: string[]

  numberingType?: 'A' | 'N' | undefined // answers numbering type:
                                        // 'A' - alphabetic: A, B, C, ...or
                                        // 'N' - numeric: 1, 2, 3 or
                                        // None(default)
  calculations?: TestCalculations
}

export interface TestCalculations {
  penalties?: boolean    // with ir no penalties
  proportional?: boolean // proportional points calculation for partial answer
}


export const TESTS = 'tests'
