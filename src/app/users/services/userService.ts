import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"
import type { PaginatedResponse } from "@/types/pagination"

import type {
  CreateUserPayload,
  ListUsersParams,
  UpdateUserPayload,
  User,
} from "../types/user"

export async function fetchUsers(
  params: ListUsersParams
): Promise<PaginatedResponse<User>> {
  const { data } = await httpService.get<PaginatedResponse<User>>(
    API_PATHS.USERS.BASE,
    { params }
  )
  return data
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const { data } = await httpService.post<User>(API_PATHS.USERS.BASE, payload)
  return data
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload
): Promise<User> {
  const { data } = await httpService.patch<User>(
    API_PATHS.USERS.BY_ID(id),
    payload
  )
  return data
}

export async function deleteUser(id: string): Promise<void> {
  await httpService.delete(API_PATHS.USERS.BY_ID(id))
}
