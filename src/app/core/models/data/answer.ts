export interface Answer {
  id?: string
  answers: Choice[]
}

export interface Choice {
  answer: string
  correct?: boolean
}

export const ANSWERS = 'answers'
