import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchProduct, fetchProducts } from "../services/productService"
import type { ListProductsParams } from "../types/product"

export const productKeys = {
  all: ["products"] as const,
  list: (params: ListProductsParams) => [...productKeys.all, "list", params] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
}

export function listProductsQueryOptions(params: ListProductsParams = {}) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined
  const categoryId = params.categoryId
  const isActive = params.isActive

  return queryOptions({
    queryKey: productKeys.list({ page, limit, q, categoryId, isActive }),
    queryFn: () => fetchProducts({ page, limit, q, categoryId, isActive }),
    staleTime: 30_000,
  })
}

export function productDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    staleTime: 60_000,
  })
}
