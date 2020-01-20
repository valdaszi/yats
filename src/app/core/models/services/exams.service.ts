import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'

import {
  Exam, EXAMS, EXAM_RESULTS, Question, ExamResult,
  RegStudentAnswerParams, ExamFinishParams
} from '../data'

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(
    private firestore: AngularFirestore,
    private functions: AngularFireFunctions
  ) { }

  listGroupExams(groupId: string) {
    return this.firestore.collection<Exam>(`${EXAMS}`, ref => ref.where('group.groupId', '==', groupId))
  }

  listExamResult(id: string) {
    return this.firestore.doc<Exam>(`${EXAMS}/${id}`).collection<ExamResult>(EXAM_RESULTS)
  }

  get(id: string) {
    return this.firestore.doc<Exam>(`${EXAMS}/${id}`)
  }

  create(entity: Exam) {
    return this.firestore.collection<Exam>(`${EXAMS}`).add(entity)
  }

  update(entity: Exam) {
    const id = entity.id
    delete entity.id
    return this.firestore.doc(`${EXAMS}/${id}`).update(entity)
  }

  delete(id: string) {
    return this.firestore.doc(`${EXAMS}/${id}`).delete()
  }

  startExam(id: string, studentId: string, duration: number) {
    if (!duration || duration <= 0) { duration = 120 }  // set default duration (2 hours) if not set
    const d = new Date()
    d.setMinutes(d.getMinutes() + 120)
    return this.firestore.doc(`${EXAMS}/${id}/${EXAM_RESULTS}/${studentId}`).set(
      {
        startedAt: new Date(),
        validUntil: d
      },
      { merge: true })
  }

  getExamStudentQuestions(exam: string, test: string, student?: string): Observable<Question[]> {
    return this.functions.httpsCallable('getExamQuestions')({ exam, test, student })
  }

  prepareExamQuestions(exam: string, test: string, student?: string): Observable<ExamResult> {
    return this.functions.httpsCallable('prepareExamQuestions')({ exam, test, student })
  }

  getExamStudent(exam: string, email: string) {
    return this.firestore.doc<ExamResult>(`${EXAMS}/${exam}/${EXAM_RESULTS}/${email}`)
  }

  regStudentAnswer(param: RegStudentAnswerParams) {
    return this.functions.httpsCallable('regStudentAnswer')(param)
  }

  examFinish(param: ExamFinishParams) {
    return this.functions.httpsCallable('examFinish')(param)
  }

}
