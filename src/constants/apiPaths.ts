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
}

export default API_PATHS
