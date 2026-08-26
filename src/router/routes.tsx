import { createBrowserRouter } from "react-router-dom"

import LoginPage from "@/app/auth/LoginPage"
import HomePage from "@/app/home/HomePage"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import MainLayout from "@/components/layouts/MainLayout"
import { urlPaths } from "@/constants/urlPaths"

export const router = createBrowserRouter([
  {
    path: urlPaths.login,
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])
