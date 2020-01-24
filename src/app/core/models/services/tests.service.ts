import { Injectable } from '@angular/core'

import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'

import { Test, TESTS, Question, QUESTIONS, Answer, ANSWERS, TestQuestionResultParams } from '../data'

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(
    private firestore: AngularFirestore,
    private functions: AngularFireFunctions
  ) { }

  list() {
    return this.firestore.collection<Test>(`${TESTS}`, ref => ref.orderBy('name'))
  }

  get(id: string) {
    return this.firestore.doc<Test>(`${TESTS}/${id}`)
  }

  create(entity: Test) {
    return this.firestore.collection<Test>(`${TESTS}`).add(entity)
  }

  update(entity: Test) {
    const id = entity.id
    delete entity.id
    return this.firestore.doc(`${TESTS}/${id}`).update(entity)
  }

  delete(id: string) {
    return this.firestore.doc(`${TESTS}/${id}`).delete()
  }

  // Questions:

  listQuestions(id: string) {
    return this.firestore.doc(`${TESTS}/${id}`).collection<Question>(`${QUESTIONS}`)
  }

  getQuestion(id: string, qid: string) {
    return this.firestore.doc<Question>(`${TESTS}/${id}/${QUESTIONS}/${qid}`)
  }

  createQuestion(id: string, entity: Question) {
    return this.firestore.doc<Question>(`${TESTS}/${id}`).collection<Question>(`${QUESTIONS}`).add(entity)
  }

  updateQuestion(id: string, entity: Question) {
    const qid = entity.id
    delete entity.id
    return this.firestore.doc(`${TESTS}/${id}/${QUESTIONS}/${qid}`).update(entity)
  }

  deleteQuestion(id: string, qid: string) {
    return this.firestore.doc(`${TESTS}/${id}/${QUESTIONS}/${qid}`).delete()
  }

  // Answers:

  getQuestionAnswer(id: string, qid: string) {
    return this.firestore.doc<Answer>(`${TESTS}/${id}/${ANSWERS}/${qid}`)
  }

  saveQuestionAnswer(id: string, qid: string, entity: Answer) {
    delete entity.id
    return this.firestore.doc(`${TESTS}/${id}/${ANSWERS}/${qid}`).set(entity)

  }

  deleteQuestionAnswer(id: string, qid: string) {
    return this.firestore.doc(`${TESTS}/${id}/${ANSWERS}/${qid}`).delete()
  }

  // check question result
  testQuestionResult(param: TestQuestionResultParams) {
    return this.functions.httpsCallable('testQuestionResult')(param)
  }

}
