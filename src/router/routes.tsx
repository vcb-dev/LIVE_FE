import { createBrowserRouter } from "react-router-dom"

import LoginPage from "@/app/auth/LoginPage"
import BlockGroupsPage from "@/app/block-groups/BlockGroupsPage"
import EmotionsPage from "@/app/emotions/EmotionsPage"
import HomePage from "@/app/home/HomePage"
import LiveSessionDetailPage from "@/app/live-sessions/LiveSessionDetailPage"
import LiveSessionNewPage from "@/app/live-sessions/LiveSessionNewPage"
import LiveSessionsPage from "@/app/live-sessions/LiveSessionsPage"
import ProductsPage from "@/app/products/ProductsPage"
import ScriptBlocksPage from "@/app/script-blocks/ScriptBlocksPage"
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
      {
        path: urlPaths.emotions,
        element: <EmotionsPage />,
      },
      {
        path: urlPaths.blockGroups,
        element: <BlockGroupsPage />,
      },
      {
        path: urlPaths.products,
        element: <ProductsPage />,
      },
      {
        path: urlPaths.scriptBlocks,
        element: <ScriptBlocksPage />,
      },
      {
        path: urlPaths.liveSessions,
        element: <LiveSessionsPage />,
      },
      {
        path: urlPaths.liveSessionNew,
        element: <LiveSessionNewPage />,
      },
      {
        path: urlPaths.liveSessionDetailPattern,
        element: <LiveSessionDetailPage />,
      },
    ],
  },
])
