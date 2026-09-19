import type { MistakeRecord } from './course'

export type Theme = 'light' | 'dark'

export type PracticeResult = {
  score: number
  total: number
  completedAt: string
}

export type FavoriteRecord = {
  id: string
  kind: 'point' | 'example' | 'pitfall'
}

export type AppState = {
  currentChapterId: string
  currentSectionId: string
  currentKnowledgePointId: string
  completedPointIds: string[]
  practiceResults: Record<string, PracticeResult>
  mistakes: MistakeRecord[]
  favorites: FavoriteRecord[]
  theme: Theme
}

export const defaultAppState: AppState = {
  currentChapterId: 'chapter-1',
  currentSectionId: '1-1',
  currentKnowledgePointId: '1-1-1',
  completedPointIds: [],
  practiceResults: {},
  mistakes: [],
  favorites: [],
  theme: 'light',
}

const STORAGE_KEY = 'db-sprint-state'

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultAppState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      ...defaultAppState,
      ...parsed,
      completedPointIds: Array.isArray(parsed.completedPointIds) ? parsed.completedPointIds : [],
      practiceResults: parsed.practiceResults && typeof parsed.practiceResults === 'object' ? parsed.practiceResults : {},
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
    }
  } catch {
    return defaultAppState
  }
}

export function saveAppState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}


