import { TestCalculations } from '../../src/app/core/models/data'

export const subtractPoints = function (n1: any, n2: any) {
  return (!n1 || !n1.points ? 0 : n1.points) - (!n2 || !n2.points ? 0 : n2.points)
}

export const arraysEqual = function(arr1: any[] | undefined, arr2: any[] | undefined) {
  if ((arr1 ? arr1.length : 0) === 0 && (arr2 ? arr2.length : 0) === 0) { return true }
  if ((arr1 ? arr1.length : 0) !== (arr2 ? arr2.length : 0)) { return false }
  for (let i = arr1!.length; i--;) {
    if (arr1![i] !== arr2![i]) { return false }
  }
  return true
}

export const shuffle = function(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export const answerPointsCalculator = function (
  question: { questionPoints: number, penaltyPoints?: number },
  calculations: TestCalculations,
  correct: string[],
  check: string[] | string): number
{
  const answer: string[] = Array.isArray(check) ? check.filter(e => e > '') : check > '' ? [check] : []
  // if no answer - 0 points and no penalty
  if (answer.length === 0) { return 0 }

  const hits = answer.filter(a => correct.includes(a)).length
  const wrong = answer.length - hits

  let points = 0
  if (hits === correct.length && correct.length === answer.length) {
    points = question.questionPoints
  } else {
    if (calculations && calculations.proportional) {
      const answerValue = question.questionPoints / correct.length
      if (calculations && calculations.penalties) {
        points = Math.round((hits - wrong) * answerValue * 10) / 10
      } else {
        // if no penalties then points always >= 0
        points = hits > wrong ? Math.round((hits - wrong) * answerValue * 10) / 10 : 0
      }
    } else {
      points = calculations && calculations.penalties ? -Math.abs(question.penaltyPoints || 0) : 0
    }
  }

  return points;
}
