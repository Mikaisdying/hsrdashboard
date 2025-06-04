import { apiService } from '../apiService'
import type { IUser } from './auth.interface'

export async function loginApi(email: string, password: string): Promise<IUser | null> {
  try {
    const users = await apiService<IUser[]>({
      url: '/users',
      method: 'GET',
      query: { email, password },
    })
    return users.length > 0 ? users[0] : null
  } catch (err) {
    return null
  }
}

export async function registerApi(
  fullName: string,
  email: string,
  password: string,
  phone?: string
): Promise<IUser | null> {
  try {
    // Kiểm tra email đã tồn tại chưa
    const existed = await apiService<IUser[]>({
      url: '/users',
      method: 'GET',
      query: { email },
    })
    if (existed.length > 0) {
      return null
    }
    const username = email.split('@')[0] || fullName.replace(/\s+/g, '').toLowerCase()
    const data = await apiService<IUser>({
      url: '/users',
      method: 'POST',
      body: {
        fullName,
        email,
        password,
        phone: phone || '',
        username,
        avatar: '',
        job: '',
      },
    })
    return data && data.id ? data : null
  } catch {
    return null
  }
}
