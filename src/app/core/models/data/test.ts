export interface Test {
  id: string
  name: string
  description?: string
  duration?: number
  points?: number
  questions?: number
  labels?: string[]
}

export const TESTS = 'tests'
