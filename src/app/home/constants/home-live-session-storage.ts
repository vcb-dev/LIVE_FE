const HOME_LIVE_SESSION_STORAGE_KEY = "tyv-home-live-session-id"

export function readHomeLiveSessionId(): string | null {
  try {
    return localStorage.getItem(HOME_LIVE_SESSION_STORAGE_KEY)
  } catch {
    return null
  }
}

export function writeHomeLiveSessionId(id: string) {
  try {
    localStorage.setItem(HOME_LIVE_SESSION_STORAGE_KEY, id)
  } catch {
    // ponytail: ignore quota / private mode
  }
}
