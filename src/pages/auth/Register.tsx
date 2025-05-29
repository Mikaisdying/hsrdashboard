import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Kiểm tra email đã tồn tại chưa
      const checkRes = await fetch(
        `http://localhost:3001/users?email=${encodeURIComponent(form.email)}`
      )
      const existed = await checkRes.json()
      if (existed.length > 0) {
        setError('Email đã tồn tại!')
        setLoading(false)
        return
      }
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })
      if (res.ok) {
        message.success('Đăng ký thành công!')
        navigate('/login')
      } else {
        setError('Đăng ký thất bại!')
      }
    } catch (err) {
      setError('Lỗi kết nối server!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-sm rounded border p-4">
      <h2 className="mb-4 text-xl font-bold">Đăng ký</h2>
      <input
        name="fullName"
        placeholder="Họ tên"
        value={form.fullName}
        onChange={handleChange}
        className="mb-2 w-full rounded border p-2"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="mb-2 w-full rounded border p-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
        className="mb-2 w-full rounded border p-2"
        required
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white"
        disabled={loading}
      >
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </form>
  )
}
