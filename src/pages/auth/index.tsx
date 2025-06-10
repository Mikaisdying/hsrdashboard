import { ProConfigProvider } from '@ant-design/pro-components'
import { useState } from 'react'
import { Tabs, message } from 'antd'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import { register } from '../../apis/auth'
import { login } from '../../apis/auth'

export type LoginType = 'account' | 'register'

const useAuthHandlers = (setLoginType: (type: LoginType) => void) => {
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const users = await login(values.email, values.password)
      if (users.length > 0) {
        message.success('Đăng nhập thành công!')
        localStorage.setItem('user', JSON.stringify(users[0]))
        window.location.href = '/'
      } else {
        message.error('Email hoặc mật khẩu không đúng!')
      }
    } catch (err) {
      message.error('Lỗi kết nối server!')
    }
  }

  const handleRegister = async (values: { fullName: string; mobile: string; password: string }) => {
    const success = await register(values.fullName, values.mobile, values.password)
    if (success) {
      message.success('Đăng ký thành công!')
      setLoginType('account')
    } else {
      message.error('Đăng ký thất bại!')
    }
  }

  return { handleLogin, handleRegister }
}

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const { handleLogin, handleRegister } = useAuthHandlers(setLoginType)

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
        src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
      />
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: 'auto',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'Đăng nhập'}>
            <LoginForm
              onSubmit={(values) => handleLogin(values)}
              onSwitchToRegister={() => setLoginType('register')}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={'register'} tab={'Đăng ký'}>
            <RegisterForm
              onSubmit={(values) => handleRegister(values)}
              onSwitchToLogin={() => setLoginType('account')}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default () => (
  <ProConfigProvider dark>
    <Page />
  </ProConfigProvider>
)
