import { apiService } from '../apiService'
import type { IMember } from './member.interface'

export async function searchMembers(keyword: string): Promise<IMember[]> {
  // Giả lập gọi API, thực tế sẽ là endpoint như /users?q=keyword
  const users = await apiService<IMember[]>({
    url: '/users',
    query: keyword ? { q: keyword } : undefined,
    method: 'GET',
  })
  return users
}
