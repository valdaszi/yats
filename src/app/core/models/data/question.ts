export interface Question {
  id: string
  type: QuestionType
  question: string
  lineNumber?: number  // starting line number in code block, 0/undefined - if no numbers
  points: number
  answers: string[]
  randomize?: boolean // ramdomize answers?
}

export const QUESTIONS = 'questions'

export const enum QuestionType {
  Text = 'text',
  Check = 'check',
  Radio = 'radio'
}
