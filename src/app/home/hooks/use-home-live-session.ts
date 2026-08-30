import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

import {
  listLiveSessionsQueryOptions,
  liveSessionDetailQueryOptions,
} from "@/app/live-sessions/queries/live-session-query"

import {
  readHomeLiveSessionId,
  writeHomeLiveSessionId,
} from "../constants/home-live-session-storage"

const HOME_SESSION_LIST_LIMIT = 50

export function useHomeLiveSession() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

  const listQuery = useQuery(
    listLiveSessionsQueryOptions({ page: 1, limit: HOME_SESSION_LIST_LIMIT })
  )

  const sessions = listQuery.data?.data ?? []

  useEffect(() => {
    if (sessions.length === 0) {
      setSelectedSessionId(null)
      return
    }

    setSelectedSessionId((current) => {
      if (current && sessions.some((session) => session.id === current)) {
        return current
      }

      const stored = readHomeLiveSessionId()
      if (stored && sessions.some((session) => session.id === stored)) {
        return stored
      }

      return sessions[0].id
    })
  }, [sessions])

  const detailQuery = useQuery({
    ...liveSessionDetailQueryOptions(selectedSessionId ?? ""),
    enabled: !!selectedSessionId,
  })

  const selectSession = useCallback((id: string) => {
    setSelectedSessionId(id)
    writeHomeLiveSessionId(id)
  }, [])

  const isLoading =
    listQuery.isLoading || (!!selectedSessionId && detailQuery.isLoading)

  return {
    sessions,
    selectedSessionId,
    selectSession,
    session: detailQuery.data,
    isLoading,
    isError: listQuery.isError || detailQuery.isError,
  }
}
