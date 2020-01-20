import { QuestionType } from './question'

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
