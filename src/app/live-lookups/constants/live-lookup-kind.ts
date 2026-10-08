export const LIVE_LOOKUP_KIND = {
  SHIFT: "SHIFT",
  LIVE_TYPE: "LIVE_TYPE",
  TEAM: "TEAM",
  CHANNEL: "CHANNEL",
} as const

export type LiveLookupKind =
  (typeof LIVE_LOOKUP_KIND)[keyof typeof LIVE_LOOKUP_KIND]

export const LIVE_LOOKUP_TABS = [
  { kind: LIVE_LOOKUP_KIND.SHIFT, label: "Ca live", addLabel: "Thêm ca" },
  {
    kind: LIVE_LOOKUP_KIND.LIVE_TYPE,
    label: "Phân loại live",
    addLabel: "Thêm phân loại",
  },
  { kind: LIVE_LOOKUP_KIND.TEAM, label: "Team", addLabel: "Thêm team" },
  { kind: LIVE_LOOKUP_KIND.CHANNEL, label: "Kênh live", addLabel: "Thêm kênh" },
] as const
