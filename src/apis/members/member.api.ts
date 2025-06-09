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
  }
  return apiService<IMember>({
    url: '/users',
    method: 'POST',
    body: data,
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
