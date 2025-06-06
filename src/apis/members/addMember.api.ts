import { apiService } from '../apiService'
import type { IMember } from './member.interface'

interface AddMemberPayload {
  name: string
  email: string
  role: string
}

export async function addMemberApi(payload: AddMemberPayload): Promise<IMember> {
  return apiService<IMember>({
    url: '/members',
    method: 'POST',
    body: payload,
  })
}
