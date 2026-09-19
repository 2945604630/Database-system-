import { describe, expect, it, beforeEach } from 'vitest'
import { defaultAppState, loadAppState, saveAppState, type AppState } from './storage'

describe('storage helpers', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips app state through localStorage', () => {
    const state: AppState = { ...defaultAppState, currentKnowledgePointId: '1-2-2', completedPointIds: ['1-1-1'], theme: 'dark' }
    saveAppState(state)

    expect(loadAppState()).toMatchObject(state)
  })

  it('falls back to defaults when stored JSON is damaged', () => {
    localStorage.setItem('db-sprint-state', '{not-json')

    expect(loadAppState()).toEqual(defaultAppState)
  })
})

