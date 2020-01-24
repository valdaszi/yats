export interface Question {
  id: string
  type: QuestionType
  question: string
  lineNumber?: number   // starting line number in code block, 0/undefined - if no numbers
  points: number        // question max points
  answers: string[]
  randomize?: boolean   // ramdomize answers?
  penaltyPoints?: number    // penalty points for wrong answer (default value = points)
}

export const QUESTIONS = 'questions'

export const enum QuestionType {
  Text = 'text',
  Check = 'check',
  Radio = 'radio'
}
