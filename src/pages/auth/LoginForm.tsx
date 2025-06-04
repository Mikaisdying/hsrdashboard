import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormCheckbox, ProFormText, ProForm } from '@ant-design/pro-components'
import { theme } from 'antd'
import { forwardRef } from 'react'

const LoginForm = forwardRef<
  any,
  {
    loading: boolean
    error?: string
    onFinish: (values: any) => void
  }
>(function LoginForm({ loading, error, onFinish }, ref) {
  const { token } = theme.useToken()
  return (
    <ProForm
      formRef={ref as any}
      submitter={{
        searchConfig: {
          submitText: loading ? 'Đang đăng nhập...' : 'Đăng nhập',
        },
        submitButtonProps: { loading },
      }}
      onFinish={onFinish}
    >
      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
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
          prefix: <LockOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
          autoComplete: 'current-password',
        }}
        placeholder={'Mật khẩu'}
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      />
      <div style={{ marginBlockEnd: 24 }}>
        <ProFormCheckbox noStyle name="autoLogin">
          Ghi nhớ đăng nhập
        </ProFormCheckbox>
        <a style={{ float: 'right' }}>Quên mật khẩu?</a>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </ProForm>
  )
})

export default LoginForm
