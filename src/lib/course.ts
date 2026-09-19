import type { KnowledgePoint, PracticeQuestion } from '../content/chapter1'
export type { PracticeQuestion } from '../content/chapter1'

export type QuestionAnswer = string | string[]

export type MistakeRecord = {
  questionId: string
  count: number
  lastAnswer: QuestionAnswer
  lastSeenAt: string
}

export function searchKnowledgePoints(points: KnowledgePoint[], query: string) {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return []
  return points.filter((point) => [point.title, point.summary, ...point.keywords].join(' ').toLocaleLowerCase().includes(normalized))
}

export function gradeQuestion(question: PracticeQuestion, answer: QuestionAnswer) {
  const normalize = (value: string) => value.trim().toLocaleLowerCase()
  const expected = Array.isArray(question.answer) ? question.answer.map(normalize).sort() : normalize(question.answer)
  const actual = Array.isArray(answer) ? answer.map(normalize).sort() : normalize(answer)
  let correct = false

  if (question.type === 'fill') {
    const accepted = [question.answer, ...(question.acceptedAnswers ?? [])].flat().map(normalize)
    correct = typeof actual === 'string' && accepted.includes(actual)
  } else if (Array.isArray(expected) && Array.isArray(actual)) {
    correct = expected.length === actual.length && expected.every((item, index) => item === actual[index])
  } else {
    correct = expected === actual
  }

  return { correct, answer: question.answer }
}

export function recordMistake(records: MistakeRecord[], questionId: string, lastAnswer: QuestionAnswer, seenAt = new Date().toISOString()) {
  const existing = records.find((record) => record.questionId === questionId)
  if (!existing) return [...records, { questionId, count: 1, lastAnswer, lastSeenAt: seenAt }]
  return records.map((record) => record.questionId === questionId ? { ...record, count: record.count + 1, lastAnswer, lastSeenAt: seenAt } : record)
}

