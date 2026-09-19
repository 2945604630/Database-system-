import { describe, expect, it } from 'vitest'
import {
  gradeQuestion,
  recordMistake,
  searchKnowledgePoints,
  type PracticeQuestion,
  type MistakeRecord,
} from './course'
import { knowledgePoints } from '../content/chapter1'
import { allKnowledgePoints, allPracticeQuestions, courseChapters } from '../content/course'

describe('course helpers', () => {
  it('searches knowledge points by title and keywords', () => {
    const results = searchKnowledgePoints(knowledgePoints, '三级模式')

    expect(results.map((point) => point.id)).toContain('1-3-2')
    expect(results.every((point) => point.title.includes('三级模式') || point.keywords.some((key) => key.includes('三级模式')))).toBe(true)
  })

  it('grades single choice, true-false, multiple choice, and fill-in questions', () => {
    const single: PracticeQuestion = {
      id: 'single', sectionId: '1-1', type: 'single', prompt: 'x', options: ['A', 'B'], answer: 'B', explanation: 'e', errorReason: 'r', knowledgePointId: '1-1-1', source: '教材原题', sourceDetail: '第1章习题第1题',
    }
    const truth: PracticeQuestion = { ...single, id: 'truth', type: 'true-false', answer: 'true' }
    const multi: PracticeQuestion = { ...single, id: 'multi', type: 'multiple', answer: ['A', 'B'] }
    const fill: PracticeQuestion = { ...single, id: 'fill', type: 'fill', answer: '数据库', acceptedAnswers: ['数据库', 'database'] }

    expect(gradeQuestion(single, 'B').correct).toBe(true)
    expect(gradeQuestion(truth, 'false').correct).toBe(false)
    expect(gradeQuestion(multi, ['B', 'A']).correct).toBe(true)
    expect(gradeQuestion(fill, ' database ').correct).toBe(true)
  })

  it('keeps a mistake history while increasing repeated error count', () => {
    const first: MistakeRecord = { questionId: 'q1', count: 1, lastAnswer: 'A', lastSeenAt: '2024-01-01T00:00:00.000Z' }
    const updated = recordMistake([first], 'q1', 'C', '2024-01-02T00:00:00.000Z')

    expect(updated).toEqual([{ questionId: 'q1', count: 2, lastAnswer: 'C', lastSeenAt: '2024-01-02T00:00:00.000Z' }])
  })

  it('covers all 18 textbook chapters in the course map', () => {
    expect(courseChapters).toHaveLength(18)
    expect(courseChapters[0].id).toBe('chapter-1')
    expect(courseChapters[17].id).toBe('chapter-18')
    expect(allKnowledgePoints.length).toBeGreaterThan(70)
    expect(allPracticeQuestions.length).toBeGreaterThan(25)
    expect(allKnowledgePoints.some((point) => point.title.includes('区块链'))).toBe(true)
    expect(courseChapters.every((chapter) => chapter.sections.length > 0 && chapter.practiceQuestions.length > 0)).toBe(true)
    expect(new Set(allKnowledgePoints.map((point) => point.id)).size).toBe(allKnowledgePoints.length)
    expect(new Set(allPracticeQuestions.map((question) => question.id)).size).toBe(allPracticeQuestions.length)
  })

  it('searches across the whole textbook rather than only chapter one', () => {
    const results = searchKnowledgePoints(allKnowledgePoints, '两段锁')

    expect(results.length).toBeGreaterThan(0)
    expect(results[0].sectionId.startsWith('12-')).toBe(true)
  })
})

