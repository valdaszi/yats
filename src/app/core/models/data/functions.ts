import { QuestionType } from './question'
import { TestCalculations } from './test'

export interface RegStudentAnswerParams {
  exam: string,
  test: string,
  question: string,
  type: QuestionType,
  answer: string | string[]
}

export interface ExamFinishParams {
  exam: string,
  test: string,
}

export interface TestQuestionResultParams {
  test: string
  question: string
  calculations: TestCalculations
  answers: string[] | string
}
