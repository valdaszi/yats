import { Component, OnInit, Input } from '@angular/core'

import { Exam, ExamResult, Question, QuestionType, AnswerResult } from '@app/core/models/data'


@Component({
  selector: 'app-exam-student-review',
  templateUrl: './exam-student-review.component.html',
  styleUrls: ['./exam-student-review.component.scss']
})
export class ExamStudentReviewComponent implements OnInit {

  @Input() exam: Exam
  @Input() student: ExamResult
  @Input() questions: Question[]

  CheckType = QuestionType.Check
  RadioType = QuestionType.Radio
  TextType = QuestionType.Text

  percent: number
  studentPoints: number
  totalPoints: number
  explanation: string

  questionsMap: { [key: string]: ActiveQuestion } = {}
  questionNumber = 0
  current: ActiveQuestion

  constructor() { }

  ngOnInit() {
    if (this.questions && this.questions.length > 0) {
      this.questions.forEach(q => this.questionsMap[q.id] = { question: q } as ActiveQuestion)
    }

    // prepare existed answers
    this.totalPoints = 0
    this.studentPoints = 0
    if (this.student && this.student.questionsIds) {
      this.student.questionsIds.forEach(q => {
        if (q.result) {
          this.totalPoints += q.result.questionPoints || 0
          this.studentPoints += q.result.studentPoints || 0
        }
        const activeQuestion = this.questionsMap[q.id]
        if (activeQuestion && q.result && q.result.correct) {
          activeQuestion.done = true
          activeQuestion.result = q.result
          activeQuestion.answers = []

          const studentAnswers: string[] = activeQuestion.result.student ?
            activeQuestion.result.student.map(a => a.answer) : []

          if (activeQuestion.question.type === QuestionType.Text) {
            if (studentAnswers && studentAnswers.length === 1) {
              if (q.result.correct[0].answer === studentAnswers[0]) {
                activeQuestion.answers.push({
                  answer: q.result.correct[0].answer,
                  missed: false,
                  wrong: false,
                  correct: true
                })
              } else {
                activeQuestion.answers.push({
                  answer: q.result.correct[0].answer,
                  missed: true,
                  wrong: false,
                  correct: false
                })
                activeQuestion.answers.push({
                  answer: studentAnswers[0],
                  missed: false,
                  wrong: true,
                  correct: false
                })
              }
            } else {
              activeQuestion.answers.push({
                answer: q.result.correct ? q.result.correct[0].answer : '',
                missed: true,
                wrong: false,
                correct: false
              })
            }
          } else {
            q.result.correct.forEach(choice => {
              const has = studentAnswers.includes(choice.answer)
              activeQuestion.answers.push({
                answer: choice.answer,
                missed: choice.correct && !has, // correct answer and missed
                wrong: !choice.correct && has,  // wrong answer and selected
                correct: choice.correct && has  // correct answer and selected
              })
            })
          }
        }
      })
    }

    this.percent = Math.round(this.studentPoints / this.totalPoints * 100)

    this.startQuestions()
  }

  getNumber(i: number) {
    if (this.exam.test && this.exam.test.numberingType) {
      return this.exam.test.numberingType === 'A' ? String.fromCharCode('A'.charCodeAt(0) + i) :
        this.exam.test.numberingType === 'N' ? i + 1 : ''
    }
    return ''
  }

  private startQuestions() {
    if (!this.student || !this.questions || this.questions.length === 0) { return }

    const qid = this.student.questionsIds[this.questionNumber].id
    this.current = this.questionsMap[qid]
  }

  nextQuestion() {
    if (++this.questionNumber >= this.questions.length) { this.questionNumber = 0 }
    this.startQuestions()
  }

  prevQuestion() {
    if (--this.questionNumber < 0) { this.questionNumber = this.questions.length - 1 }
    this.startQuestions()
  }

}

interface ActiveQuestion {
  question: Question,
  done?: boolean
  result?: AnswerResult
  answers: Result[]
}

interface Result {
  answer: string
  missed: boolean
  wrong: boolean
  correct: boolean
}
