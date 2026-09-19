import {
  practiceQuestions as chapter1PracticeQuestions,
  sections as chapter1Sections,
} from './chapter1'
import { supplementaryChapters } from './chapters2to18'
import type { ChapterSection, KnowledgePoint, PracticeQuestion } from './chapter1'

export type CourseChapter = {
  id: string
  number: number
  title: string
  part: string
  subtitle: string
  sections: ChapterSection[]
  practiceQuestions: PracticeQuestion[]
}

export const courseChapters: CourseChapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: '第1章 绪论',
    part: '第一篇 基础篇',
    subtitle: '建立数据库系统、数据模型与三级模式结构的总览。',
    sections: chapter1Sections,
    practiceQuestions: chapter1PracticeQuestions,
  },
  ...supplementaryChapters,
]

export const allSections = courseChapters.flatMap((chapter) => chapter.sections)
export const allKnowledgePoints: KnowledgePoint[] = courseChapters.flatMap((chapter) => chapter.sections.flatMap((section) => section.points))
export const allPracticeQuestions: PracticeQuestion[] = courseChapters.flatMap((chapter) => chapter.practiceQuestions)

export function getChapterById(chapterId: string) {
  return courseChapters.find((chapter) => chapter.id === chapterId) ?? courseChapters[0]
}

