import { apiService } from '../apiService'
import type { IMember } from './member.interface'

export async function searchMembers(keyword: string): Promise<IMember[]> {
  const users = await apiService<IMember[]>({
    url: '/users',
    query: keyword ? { q: keyword } : undefined,
    method: 'GET',
  })
  return users
}
