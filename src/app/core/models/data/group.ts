import { Student } from './student'
import { Test } from './test'

export interface Group {
  id: string
  name: string
  start: any  // period start date
  end: any    // period end date
  joinCode?: string   // code to join the group - generated for students to join the group automatically
  joinCodeValidity?: any
  students: Student[]
  emails?: string[]   // students emails only
  labels?: string[]
  exams?: GroupExam[]
}

export interface GroupExam {
  id: string
  test: Test
  finished?: boolean
  validUntil?: any
  createdOn: any
}

export const GROUPS = 'groups'
