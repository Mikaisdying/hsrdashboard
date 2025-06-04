import { Divider, Space, Tabs, theme } from 'antd'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../../apis/auth/auth.api'

export default function AuthPage() {
  const [loginType, setLoginType] = useState<'account' | 'register'>('account')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const loginFormRef = useRef<any>(null)
  const registerFormRef = useRef<any>(null)
  const navigate = useNavigate()
  const { token } = theme.useToken()

  const handleAccountLogin = async (values: any) => {
    setLoginLoading(true)
    setLoginError('')
    try {
      const user = await loginApi(values.email, values.password)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      } else {
        setLoginError('Email hoặc mật khẩu không đúng!')
      }
    } catch (err) {
      setLoginError('Lỗi kết nối server!')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (values: any) => {
    setRegisterLoading(true)
    setRegisterError('')
    try {
      const user = await registerApi(values.username, values.email, values.password)
      if (user) {
        setLoginType('account')
        registerFormRef.current?.resetFields()
      } else {
        setRegisterError('Email hoặc username đã tồn tại!')
      }
    } catch (err) {
      setRegisterError('Lỗi kết nối server!')
    } finally {
      setRegisterLoading(false)
    }
  }

  const handleTabChange = (activeKey: string) => {
    setLoginType(activeKey as 'account' | 'register')
    setLoginError('')
    setRegisterError('')
    if (activeKey === 'account') {
      loginFormRef.current?.resetFields()
    } else {
      registerFormRef.current?.resetFields()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        zIndex: 0,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
      />
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 380,
            background: 'rgba(0,0,0,0.65)',
            borderRadius: 12,
            padding: 32,
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            backdropFilter: 'blur(4px)',
            margin: 16,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img
              src="https://github.githubassets.com/favicons/favicon.png"
              alt="logo"
              style={{ width: 40, marginBottom: 8 }}
            />
            <h2 style={{ color: '#fff', margin: 0, fontWeight: 600 }}>M Dashboard</h2>
            <div style={{ fontSize: 14, color: token.colorTextPlaceholder }}>
              Quản lý nhân sự hiện đại
            </div>
          </div>
          <Tabs
            centered
            activeKey={loginType}
            onChange={handleTabChange}
            style={{ marginBottom: 24 }}
          >
            <Tabs.TabPane key={'account'} tab={'Đăng nhập'} />
            <Tabs.TabPane key={'register'} tab={'Đăng ký'} />
          </Tabs>
          {loginType === 'account' && (
            <LoginForm
              loading={loginLoading}
              error={loginError}
              ref={loginFormRef}
              onFinish={handleAccountLogin}
            />
          )}
          {loginType === 'register' && (
            <RegisterForm
              loading={registerLoading}
              error={registerError}
              ref={registerFormRef}
              onFinish={handleRegister}
            />
          )}
          <Divider plain style={{ color: token.colorTextPlaceholder, fontSize: 13 }}>
            Các cách đăng nhập khác
          </Divider>
          <Space
            align="center"
            size={24}
            style={{ width: '100%', justifyContent: 'center', marginBottom: 0 }}
          >
            {/* Place for social login icons if needed */}
          </Space>
        </div>
      </div>
    </div>
  )
}
