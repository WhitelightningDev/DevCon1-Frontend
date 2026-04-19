import { safeJsonParse } from '@/lib/validation'

export const START_PROJECT_STORAGE_KEY = 'devcon1:start-project'

export type StartProjectDraftPayload = {
  name?: string
  email?: string
  company?: string
  summary?: string
  createdAt?: string
}

export function readStartProjectDraft(): StartProjectDraftPayload | null {
  if (typeof window === 'undefined') return null
  try {
    return safeJsonParse<StartProjectDraftPayload>(localStorage.getItem(START_PROJECT_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeStartProjectDraft(payload: StartProjectDraftPayload) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(START_PROJECT_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore storage write errors (privacy modes, quota, etc.)
  }
}

export function clearStartProjectDraft() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(START_PROJECT_STORAGE_KEY)
  } catch {
    // ignore
  }
}

