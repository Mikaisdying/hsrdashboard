import { apiService } from '../apiService'
import type { IMember } from './member.interface'

export async function createMember(payload: Partial<IMember>): Promise<IMember> {
  const data: IMember = {
    id: 0,
    fullName: payload.fullName || '',
    email: payload.email || '',
    mobile: payload.mobile || '',
    password: payload.password || '',
    avatar: payload.avatar || '',
    job: payload.job || '',
    isApproved: false,
    role: payload.role || '',
    status: 1,
  }
  return apiService<IMember>({
    url: '/users',
    method: 'POST',
    body: data,
  })
}

export async function updateMember(
  id: number,
  payload: Partial<IMember>,
  original?: IMember
): Promise<IMember> {
  let body: Partial<IMember> = payload
  if (original) {
    body = { ...original, ...payload }
  }
  return apiService<IMember>({
    url: `/users/${id}`,
    method: 'PATCH',
    body,
  })
}

export async function searchMembers(keyword: string): Promise<IMember[]> {
  const users = await apiService<IMember[]>({
    url: '/users',
    query: keyword ? { q: keyword } : undefined,
    method: 'GET',
  })
  return users
}

export async function approveMember(email: string): Promise<IMember> {
  return apiService<IMember>({
    url: `/users/${email}`,
    method: 'PATCH',
    body: { isApproved: true },
  })
}
