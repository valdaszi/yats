import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {
  Group, GROUPS, Exam, EXAMS, EXAM_RESULTS, TESTS, QUESTIONS, TEACHERS,
  ExamResultQuestionsInfo, ExamResult, Choice, RegStudentAnswerParams, ExamFinishParams, Question,
  Answer, ANSWERS,
} from '../../src/app/core/models/data'

const functionInRegion = functions.region('europe-west1') //, 'europe-west2')

admin.initializeApp();
const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue

interface UserCustomClaims {
  admin?: boolean,
  teacher?: boolean,
  student?: boolean
}

async function grantAdminRole(email: string): Promise<any> {
  const user = await admin.auth().getUserByEmail(email);
  if (user && user.customClaims && (user.customClaims as UserCustomClaims).admin === true) {
    return
  }
  const claims = user.customClaims as UserCustomClaims || {}
  claims.admin = true
  return admin.auth().setCustomUserClaims(user.uid, claims)
}

async function grantTeacherRole(email: string): Promise<any> {
  const user = await admin.auth().getUserByEmail(email)
  if (user && user.customClaims && (user.customClaims as UserCustomClaims).teacher === true) {
    return
  }
  const claims = user.customClaims as UserCustomClaims || {}
  claims.teacher = true
  return admin.auth().setCustomUserClaims(user.uid, claims)
}

async function revokeTeacherRole(email: string): Promise<any> {
  const user = await admin.auth().getUserByEmail(email)
  if (user && user.customClaims && (user.customClaims as UserCustomClaims).teacher !== true) {
    return
  }
  const claims = user.customClaims as UserCustomClaims || {}
  claims.teacher = false
  return admin.auth().setCustomUserClaims(user.uid, claims)
}

async function grantStudentRole(email: string): Promise<any> {
  const user = await admin.auth().getUserByEmail(email)
  if (user && user.customClaims && (user.customClaims as UserCustomClaims).student === true) {
    return
  }
  const claims = user.customClaims as UserCustomClaims || {}
  claims.student = true
  return admin.auth().setCustomUserClaims(user.uid, claims)
}

// function isAdmin(context: functions.https.CallableContext): any {
//   const user = context.auth;
//   if (!user || user.token.admin !== true) {
//     throw new functions.https.HttpsError("unauthenticated", "Request had invalid credentials (not admin).")
//   }
//   return user
// }

function isAuthUser(context: functions.https.CallableContext): any {
  const user = context.auth;
  if (!user) {
    throw new functions.https.HttpsError("unauthenticated", "Request had invalid credentials.");
  }
  return user
}

async function getUser(context: functions.https.CallableContext): Promise<admin.auth.UserRecord> {
  const user = isAuthUser(context);

  const userRecord = await admin.auth().getUser(user.uid)
  if (!userRecord.emailVerified) {
    throw new functions.https.HttpsError("unauthenticated", "Request had invalid credentials (email not verified).")
  }
  if (!userRecord.email) {
    throw new functions.https.HttpsError("unauthenticated", "No email")
  }
  return userRecord
}

function subtractPoints(n1: any, n2: any) {
  return (!n1 || !n1.points ? 0 : n1.points) - (!n2 || !n2.points ? 0 : n2.points)
}

function arraysEqual(arr1: any[] | undefined, arr2: any[] | undefined) {
  if ((arr1 ? arr1.length : 0) === 0 && (arr2 ? arr2.length : 0) === 0) { return true }
  if ((arr1 ? arr1.length : 0) !== (arr2 ? arr2.length : 0)) { return false }
  for (let i = arr1!.length; i--;) {
    if (arr1![i] !== arr2![i]) { return false }
  }
  return true
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

// Exports:

/**
 * changeUserName - Any user can change his 'displayName' property.
 * Changes will be seen after logout/login.
 */
export const changeUserName = functionInRegion.https.onCall(async (data: {name: string}, context: functions.https.CallableContext) => {
  const user = isAuthUser(context)
  await admin.auth().updateUser(user.uid, { displayName: data.name })
  return { message: `User ${data.name} name has been updated!` }
})

/**
 * prepareExamQuestions - Prepare exam questions for student
 * Return ExamResult object
 */
export const prepareExamQuestions = functionInRegion.https.onCall(async (data: { exam: string, test: string, student?: string }, context: functions.https.CallableContext) => {
  const userRecord = await getUser(context)
  const email = ((data.student && (userRecord.customClaims as UserCustomClaims).teacher === true) ? data.student : userRecord.email!).toLowerCase()

  const exam = (await db.collection(EXAMS).doc(data.exam).get()).data() as Exam
  if (!exam) {
    throw new functions.https.HttpsError("not-found", `Exam ${data.exam} not found.`)
  }

  // check if user is in exams users list - if not throw error
  if (!exam.emails || !exam.emails.includes(email)) {
    throw new functions.https.HttpsError("unauthenticated", "Access deny")
  }

  // check if exam has student record - if exists do nothing
  const examResultRef = db.collection(EXAMS).doc(data.exam).collection(EXAM_RESULTS).doc(email)
  const doc = await examResultRef.get()
  if (doc.exists) {
    return doc.data()
  }

  // if not - create student record (examResults) and questions collection (examQuestions)

  // read questions first
  const questionsIds: ExamResultQuestionsInfo[] = []
  const questions = await db.collection(TESTS).doc(data.test).collection(QUESTIONS).get()
  questions.forEach(q =>
    questionsIds.push({
      id: q.id,
      result: {
        questionPoints: (q.data() as Question).points
      }
    })
  )

  shuffle(questionsIds)

  // create exam result (student) doc
  await examResultRef.set({
    examId: data.exam,
    testId: data.test,
    email: email,
    name: userRecord.displayName,
    photoURL: userRecord.photoURL,
    questionsIds: questionsIds,
  })

  return (await examResultRef.get()).data()
})

/**
 * getExamQuestions - return exam questions
 */
export const getExamQuestions = functionInRegion.https.onCall(async (data: { exam: string, test: string, student?: string }, context: functions.https.CallableContext) => {
  const userRecord = await getUser(context)
  const email = ((data.student && (userRecord.customClaims as UserCustomClaims).teacher === true) ? data.student : userRecord.email!).toLowerCase()

  const exam = (await db.collection(EXAMS).doc(data.exam).get()).data() as Exam
  if (!exam) {
    throw new functions.https.HttpsError("not-found", `Exam ${data.exam} not found.`)
  }

  // check if user is in exams users list - if not throw error
  if (!exam.emails || !exam.emails.includes(email)) {
    throw new functions.https.HttpsError("unauthenticated", "Access deny")
  }

  // check if exam has student record - if exists do nothing
  const examResultRef = db.collection(EXAMS).doc(data.exam).collection(EXAM_RESULTS).doc(email)
  const doc = await examResultRef.get()
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", `Student ${userRecord.displayName}, ${email} not found in Exam ${data.exam}.`)
  }

  // read questions
  return (await db.collection(TESTS).doc(data.test).collection(QUESTIONS).get()).docs.map(q => {
    return {
      id: q.id,
      ... q.data()
    }
  })
})

/**
 * regStudentAnswer - Check the student answer to one particular question
 */
export const regStudentAnswer = functionInRegion.https.onCall(async (data: RegStudentAnswerParams, context: functions.https.CallableContext) => {
  const userRecord = await getUser(context)
  const email = userRecord.email!.toLowerCase()
  const examResultRef = db.collection(EXAMS).doc(data.exam).collection(EXAM_RESULTS).doc(email)

  await db.runTransaction(async transaction => {
    const doc = await transaction.get(examResultRef);
    if (!doc.exists) {
      throw new functions.https.HttpsError("not-found", `Student ${userRecord.displayName}, ${email} not found in Exam ${data.exam}.`)
    }
    const examResult = doc.data() as ExamResult
    if (examResult.finished) { return }

    const answers: Choice[] = []
    if (Array.isArray(data.answer)) {
      // multiple values
      data.answer.filter(answer => answer > '').forEach(answer => answers.push({ answer }))
    } else {
      // single value
      answers.push({ answer: data.answer })
    }
    console.log(`Exam ${data.exam}, Question ${data.question}, Student ${userRecord.displayName}, ${email} has submitted answers: ${data.answer}`)
    if (!examResult.questionsIds) { examResult.questionsIds = [] }

    examResult.questionsIds
      .filter(q => q.id === data.question)
      .forEach(q => {
        q.result = q.result || {}
        if (answers.length > 0) {
          q.result.student = answers
        } else {
          delete q.result.student
        }
      })

    const questions = examResult.questionsIds
      .filter(q => q.result && q.result.student)
      .length

    console.log(`Exam ${data.exam}, Question ${data.question}, Student ${userRecord.displayName}, ${email} has answered questions: ${questions}`)

    return transaction.update(examResultRef, {
      questions: questions,
      questionsIds: examResult.questionsIds
    });
  })

  return 0
})

/**
 * examFinish
 */
export const examFinish = functionInRegion.https.onCall(async (data: ExamFinishParams, context: functions.https.CallableContext) => {
  const userRecord = await getUser(context)
  const email = userRecord.email!.toLowerCase()

  const examResultRef = db.collection(EXAMS).doc(data.exam).collection(EXAM_RESULTS).doc(email)
  const examResultDoc = await examResultRef.get();
  if (!examResultDoc.exists) {
    throw new functions.https.HttpsError("not-found", `Student ${userRecord.displayName}, ${email} not found in Exam ${data.exam}.`)
  }

  const examResult = examResultDoc.data() as ExamResult
  if (examResult.finished) {
    console.log(`Exam ${data.exam} for Student ${userRecord.displayName}, ${email} already finished`)
    return 0
  }

  if (!examResult.questionsIds || examResult.questionsIds.length === 0) {
    throw new functions.https.HttpsError("not-found", `No questions of Exam ${data.exam}.`)
  }

  // read answers
  const answersMap: { [key: string]: Answer } = {};
  (await db.collection(TESTS).doc(data.test).collection(ANSWERS).get())
    .docs
    .forEach(a => answersMap[a.id] = a.data() as Answer)

  const answersCount = Object.keys(answersMap).length
  if (answersCount === 0) {
    throw new functions.https.HttpsError("not-found", `No answers of Exam ${data.exam} questions.`)
  }

  // calculating exam result
  let points = 0
  let questionPoints = 0
  examResult.questionsIds.forEach(qid => {
    qid.result = qid.result || {}
    questionPoints += qid.result.questionPoints || 0

    const answer = answersMap[qid.id]
    if (!answer) { return }
    qid.result.correct = answer.answers
    qid.result.studentPoints = 0
    if (!qid.result.student || qid.result.student.length === 0) { return }

    const correctAnswers: string[] = (qid.result.correct.length === 1 ? qid.result.correct : qid.result.correct.filter(a => a.correct)).map(a => a.answer)
    if (correctAnswers.length === 0) {
      console.error(`No correct answers in Exam ${data.exam} Student ${userRecord.displayName}, ${email}, question ${qid.id}`)
      return
    }

    const hits = qid.result.student.filter(a => correctAnswers.includes(a.answer)).length

    if (hits === correctAnswers.length) {
      qid.result.studentPoints = qid.result.questionPoints
    } else {
      const answerValue = qid.result.questionPoints / correctAnswers.length
      qid.result.studentPoints = Math.round(
        (hits
          - (qid.result.student.length - hits)  // wrong answers
          // - (correctAnswers.length - hits)   // missed answers
        ) * answerValue * 10
      ) / 10
    }

    points += qid.result.studentPoints
  })

  await examResultRef.update({
    finished: true,
    questionsIds: examResult.questionsIds,
    points: points,
    questionPoints: questionPoints
  })

  return 0
})

// /**
//  * Add 'Admin' role to the user by his email
//  */
// export const addAdminRole = functionInRegion.https.onCall(async (data: {email: string}, context) => {
//   isAdmin(context);
//   await grantAdminRole(data.email);
//   return { message: `User ${data.email} has been made an admin!` }
// })

// /**
//  * Add 'Teacher' role to the user by his email
//  */
// export const addTeacherRole = functionInRegion.https.onCall(async (data: {email: string}, context) => {
//   isAdmin(context);
//   await grantTeacherRole(data.email);
//   return { message: `User ${data.email} has been made an teacher!` }
// })

// /**
//  * Testing... get User data by email
//  */
// export const getUser = functionInRegion.https.onCall(async (data: { email: string }, context) => {
//   isAdmin(context);
//   return await admin.auth().getUserByEmail(data.email);
// })


/**
 * On sign up.
 */
export const processSignUp = functionInRegion.auth.user()
  .onCreate(async user => {
    if (user.email && user.emailVerified) {
      // special case:
      if (user.email.toLowerCase() === 'valdas.ziemys@gmail.com') {
        await grantAdminRole(user.email);
      }

      // check if user is student, i.e. exists in any group - grant student role
      const query = db.collection(GROUPS)
        .where('emails', 'array-contains', user.email.toLowerCase())
        //.where('end', '>=', admin.firestore.Timestamp.now())
        .limit(1)

      if (!(await query.get()).empty) {
        await grantStudentRole(user.email);
        console.log(`User ${user.email} has been made an student!`)
        return
      }

      // check if user is teacher - grant teacher role
      if ((await db.collection(TEACHERS).doc(user.email.toLowerCase()).get()).exists) {
        await grantTeacherRole(user.email);
        console.log(`User ${user.email} has been made an teacher!`)
      }

    }
  });

/**
 * Listen for documents changes in the TEACHERS collection
 */
export const onTeachersCreate = functionInRegion.firestore
  .document(`${TEACHERS}/{teacherRoleId}`)
  .onCreate(async (_snapshot, context) => {
      await grantTeacherRole(context.params.teacherRoleId);
  });

export const onTeachersDelete = functionInRegion.firestore
  .document(`${TEACHERS}/{teacherRoleId}`)
  .onDelete(async (_snapshot, context) => {
      await revokeTeacherRole(context.params.teacherRoleId);
  });


/**
 * Listen for questions document write: i.e. create, update, delete
 * and updating question counters
 */
export const onQuestionWrite = functionInRegion.firestore
  .document(`${TESTS}/{testId}/${QUESTIONS}/{questionId}`)
  .onWrite(async (change, context) => {
    if (!change.before.exists) {
      // New document Created : increase questions and points
      console.log('Question created');
      const points = subtractPoints(change.after.data(), undefined)  // after
      await db.collection(TESTS).doc(context.params.testId).update({
        questions: FieldValue.increment(1),
        points: FieldValue.increment(points)
      });

    } else if (change.before.exists && change.after.exists) {
      // Updating existing document : update points
      console.log('Question updated');
      const points = subtractPoints(change.after.data(), change.before.data())  // after - before
      await db.collection(TESTS).doc(context.params.testId).update({
        points: FieldValue.increment(points)
      });

    } else if (!change.after.exists) {
      // Deleting document : decrease questions and points
      console.log('Question deleted');
      const points = subtractPoints(undefined, change.before.data())  //  - before
      await db.collection(TESTS).doc(context.params.testId).update({
        questions: FieldValue.increment(-1),
        points: FieldValue.increment(points)
      });
    }
  });

/**
 * Group update
 */
export const onGroupWrite = functionInRegion.firestore
  .document(`${GROUPS}/{groupId}`)
  .onWrite((change, _) => {
    // do nothing if deleting
    if (!change.after.exists) { return 0 }

    const group = change.after.data() as Group

    // do nothing if document do not changed
    if (change.before.exists && change.after.isEqual(change.before)) {
      console.log(`${group.name} - group data the same!`)
      return 0
    }

    // create students emails list
    const emails: string[] = []
    const students = group.students
    if (students) {
      students.forEach(s => {
        if (s.email) { emails.push(s.email.toLowerCase()) }
      })
    }

    if (arraysEqual(emails, group.emails)) {
      console.log(`${group.name} - students emails not changed!`)
      return 0
    }

    console.log(`${group.name} - group updating students emails!`)
    return change.after.ref.update({ emails })
  });

/**
 * Exam update
 */
export const onExamWrite = functionInRegion.firestore
  .document(`${EXAMS}/{examId}`)
  .onWrite(async (change, context) => {

    const exam = (change.after.exists ? change.after.data() : change.before.exists ? change.before.data() : undefined) as Exam
    if (!exam) {
      throw Error('No exam data!');
    }

    if (change.after.exists) {
      // do nothing if document do not changed
      if (change.before.exists && change.after.isEqual(change.before)) {
        console.log(`Exam '${exam.test.name}' for group '${exam.group.name}' data the same!`)
        return 0
      }
    }

    // if not delete
    if (change.after.exists) {
      // create students emails list
      const emails: string[] = []
      const students = exam.group.students
      if (students) {
        students.forEach(s => {
          if (s.email) { emails.push(s.email.toLowerCase()) }
        })
      }
      if (arraysEqual(emails, exam.emails)) {
        console.log(`Exam '${exam.test.name}' for group '${exam.group.name} - students emails not changed!`)
        return 0
      }
      console.log(`Exam '${exam.test.name}' for group '${exam.group.name} - updating students emails!`)
      await change.after.ref.update({ emails })
    }

    // updating related GROUPS document
    const sfDocRef = db.collection(GROUPS).doc(exam.group.id)
    return db.runTransaction(async transaction => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc || !sfDoc.exists) {
        throw Error('Group does not exist!');
      }
      const group = sfDoc.data() as Group
      const examsCountOld = group.exams ? group.exams.length : 0
      const exams = (group.exams || []).filter(e => e.id !== context.params.examId);
      if (change.after.exists) {
        exams.push({
          id: context.params.examId,
          test: exam.test,
          createdOn: exam.createdOn
        })
      }
      console.log(`Group '${group.name} exams count: was ${examsCountOld}, are ${exams.length}`)
      return transaction.update(sfDocRef, { exams });
    })
  });

/**
 * Admin Services
 */

// export const adminGroupsAddUid = functionInRegion.https.onCall(async (_data, context) => {
//   const userMap: { [key: string]: admin.auth.UserRecord } = {};
//   const users = (await admin.auth().listUsers()).users
//   users.forEach(u => {
//     if (u.email) { userMap[u.email.toLowerCase()] = u }
//   });
//   console.log('Found ' + users.length + ' users')

//   const batch = db.batch();
//   (await db.collection(GROUPS).get()).docs.forEach(doc => {
//     const group = doc.data() as Group
//     group.students.forEach(student => {
//       const user = userMap[student.email.toLowerCase()]
//       if (user) { student.uid = user.uid }
//     })
//     batch.update(doc.ref, { students: group.students });
//   })
//   const writeResult = await batch.commit()
//   return { updated: writeResult.length }
// });

// export const adminGroupsAddUid = functionInRegion.https.onCall(async (_data, context) => {
// }
