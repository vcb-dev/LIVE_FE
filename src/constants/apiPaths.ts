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
}

export default API_PATHS
