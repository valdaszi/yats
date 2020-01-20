/**
 * data model:
 *
 * Test  --->> Question
 *       --->> Answer
 *
 *             Question <---> Answer (same id)
 *
 * Group
 *
 * Exam  --->> ExamResult (Student)
 *
 *
 */

export * from './config'

export * from './teacher'

export * from './answer'
export * from './exam'
export * from './group'
export * from './question'
export * from './student'
export * from './test'
export * from './user'

export * from './functions'


