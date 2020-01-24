import { Test, TestCalculations } from './test'
import { Student } from './student'
import { Choice } from './answer'

export interface Exam {
  id: string
  group: ExamGroup
  test: Test
  finished?: boolean
  validUntil?: any
  createdOn: any
  emails?: string[]   // students emails only
}

export interface ExamGroup {
  id: string
  name: string
  students: Student[]
}

export interface ExamResultQuestionsInfo {
  id: string,
  result: AnswerResult
}

export interface ExamResult extends Student {
  examId: string
  testId: string
  points?: number     // points collected
  questions?: number  // number of questions answered
  startedAt?: any     // exam start time
  validUntil?: any
  finished?: boolean
  questionsIds?: ExamResultQuestionsInfo[] // shuffled questions and results info
  questionPoints?: number
  calculations?: TestCalculations
}


export interface AnswerResult {
  questionPoints: number  // question max points
  penaltyPoints?: number  // question penalty points
  correct?: Choice[]      // correct answer
  student?: Choice[]      // student answer
  studentPoints?: number  // points collected
}

export const EXAMS = 'exams'
export const EXAM_RESULTS = 'examResults'
