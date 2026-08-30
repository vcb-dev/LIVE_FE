export const urlPaths = {
  login: "/login",
  home: "/",
  emotions: "/emotions",
  blockGroups: "/block-groups",
  products: "/products",
  scriptBlocks: "/script-blocks",
  liveSessions: "/live-sessions",
  liveSessionNew: "/live-sessions/new",
  liveSessionDetailPattern: "/live-sessions/:id",
  liveSessionDetail: (id: string) => `/live-sessions/${id}`,
} as const
