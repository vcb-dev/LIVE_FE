const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },
  EMOTIONS: {
    BASE: "/emotions",
    BY_ID: (id: string) => `/emotions/${id}`,
    UPLOAD_IMAGE: "/emotions/upload-image",
  },
  BLOCK_GROUPS: {
    BASE: "/block-groups",
    BY_ID: (id: string) => `/block-groups/${id}`,
  },
  PRODUCTS: {
    BASE: "/products",
    BY_ID: (id: string) => `/products/${id}`,
    UPLOAD_IMAGE: "/products/upload-image",
  },
  SCRIPT_BLOCKS: {
    BASE: "/script-blocks",
    BY_ID: (id: string) => `/script-blocks/${id}`,
  },
  LIVE_SESSIONS: {
    BASE: "/live-sessions",
    BY_ID: (id: string) => `/live-sessions/${id}`,
    REGENERATE: (id: string) => `/live-sessions/${id}/regenerate`,
  },
}

export default API_PATHS
