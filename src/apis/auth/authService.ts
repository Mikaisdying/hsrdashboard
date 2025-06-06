import { message } from 'antd'

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      return true
    } else {
      const error = await response.json()
      message.error(error.message || 'Đăng nhập thất bại!')
      return false
    }
  } catch (error) {
    message.error('Lỗi kết nối server!')
    return false
  }
}

export const register = async (
  fullName: string,
  mobile: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, mobile, password }),
    })

    if (response.ok) {
      message.success('Đăng ký thành công!')
      return true
    } else {
      const error = await response.json()
      message.error(error.message || 'Đăng ký thất bại!')
      return false
    }
  } catch (error) {
    message.error('Lỗi kết nối server!')
    return false
  }
}
