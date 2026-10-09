import type { LiveLookupKind } from "../constants/live-lookup-kind"

export interface LiveLookup {
  id: string
  kind: LiveLookupKind
  name: string
  createdAt: string
  updatedAt: string
}

export interface ListLiveLookupsParams {
  page?: number
  limit?: number
  kind: LiveLookupKind
  q?: string
}

export interface CreateLiveLookupPayload {
  kind: LiveLookupKind
  name: string
}
