import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { Divider, Space, Tabs, message, theme } from 'antd'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type LoginType = 'account' | 'register'

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const { token } = theme.useToken()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleAccountLogin = async (values: any) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `http://localhost:3001/users?email=${encodeURIComponent(
          values.email
        )}&password=${encodeURIComponent(values.password)}`
      )
      const users = await res.json()
      if (users.length > 0) {
        message.success('Đăng nhập thành công!')
        localStorage.setItem('user', JSON.stringify(users[0]))
        navigate('/')
      } else {
        setError('Email hoặc mật khẩu không đúng!')
      }
    } catch (err) {
      setError('Lỗi kết nối server!')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values: any) => {
    setLoading(true)
    setError('')
    try {
      // Kiểm tra số điện thoại đã tồn tại chưa
      const checkRes = await fetch(
        `http://localhost:3001/users?phone=${encodeURIComponent(values.mobile)}`
      )
      const existed = await checkRes.json()
      if (existed.length > 0) {
        setError('Số điện thoại đã tồn tại!')
        setLoading(false)
        return
      }
      // Đăng ký user mới
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: values.mobile,
          password: values.password,
          fullName: values.fullName || '',
          email: values.email || '',
        }),
      })
      if (res.ok) {
        message.success('Đăng ký thành công!')
        setLoginType('account')
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
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="HRM Dashboard"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="Quản lý nhân sự hiện đại"
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                Các cách đăng nhập khác
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
              </div>
            </Space>
          </div>
        }
        submitter={{
          searchConfig: {
            submitText: loading
              ? loginType === 'account'
                ? 'Đang đăng nhập...'
                : 'Đang đăng ký...'
              : loginType === 'account'
                ? 'Đăng nhập'
                : 'Đăng ký',
          },
          submitButtonProps: { loading },
        }}
        onFinish={loginType === 'account' ? handleAccountLogin : handleRegister}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'Đăng nhập bằng email'} />
          <Tabs.TabPane key={'register'} tab={'Đăng ký bằng điện thoại'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined style={{ color: token.colorText }} className={'prefixIcon'} />
                ),
                style: {
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                  borderColor: token.colorBorder,
                  transition: 'background 0.3s, color 0.3s',
                  WebkitBoxShadow: '0 0 0 1000px ' + token.colorBgContainer + ' inset',
                  WebkitTextFillColor: token.colorText,
                },
                autoComplete: 'username',
              }}
              placeholder={'Email'}
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined style={{ color: token.colorText }} className={'prefixIcon'} />
                ),
                style: {
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                  borderColor: token.colorBorder,
                  transition: 'background 0.3s, color 0.3s',
                  WebkitBoxShadow: '0 0 0 1000px ' + token.colorBgContainer + ' inset',
                  WebkitTextFillColor: token.colorText,
                },
                autoComplete: 'current-password',
              }}
              placeholder={'Mật khẩu'}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            />
          </>
        )}
        {loginType === 'register' && (
          <>
            <ProFormText
              name="fullName"
              fieldProps={{ size: 'large' }}
              placeholder={'Họ tên (không bắt buộc)'}
            />
            <ProFormText
              name="mobile"
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined style={{ color: token.colorText }} className={'prefixIcon'} />
                ),
                style: {
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                  borderColor: token.colorBorder,
                  transition: 'background 0.3s, color 0.3s',
                  WebkitBoxShadow: '0 0 0 1000px ' + token.colorBgContainer + ' inset',
                  WebkitTextFillColor: token.colorText,
                },
                autoComplete: 'tel',
              }}
              placeholder={'Số điện thoại'}
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^0\d{9,10}$/, message: 'Số điện thoại không hợp lệ!' },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined style={{ color: token.colorText }} className={'prefixIcon'} />
                ),
                style: {
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                  borderColor: token.colorBorder,
                  transition: 'background 0.3s, color 0.3s',
                  WebkitBoxShadow: '0 0 0 1000px ' + token.colorBgContainer + ' inset',
                  WebkitTextFillColor: token.colorText,
                },
                autoComplete: 'new-password',
              }}
              placeholder={'Mật khẩu'}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            />
          </>
        )}
        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            Ghi nhớ đăng nhập
          </ProFormCheckbox>
          <a style={{ float: 'right' }}>Quên mật khẩu?</a>
        </div>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </LoginFormPage>
    </div>
  )
}

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  )
}
