import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormCheckbox, ProFormText, ProForm } from '@ant-design/pro-components'
import { forwardRef } from 'react'

const RegisterForm = forwardRef<any, {
  loading: boolean
  error?: string
  onFinish: (values: any) => void
}>(function RegisterForm({ loading, error, onFinish }, ref) {
  return (
    <ProForm
      formRef={ref as any}
      submitter={{
        searchConfig: {
          submitText: loading ? 'Đang đăng ký...' : 'Đăng ký',
        },
        submitButtonProps: { loading },
      }}
      onFinish={onFinish}
    >
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
          placeholder: 'Username',
          className: 'placeholder-secondary',
        }}
        placeholder={'Username'}
        rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
      />
      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
          autoComplete: 'username',
          placeholder: 'Email',
          className: 'placeholder-secondary',
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
          prefix: <LockOutlined />,
          autoComplete: 'new-password',
          placeholder: 'Mật khẩu',
          className: 'placeholder-secondary',
        }}
        placeholder={'Mật khẩu'}
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      />
      <div style={{ marginBlockEnd: 24 }}>
        <ProFormCheckbox noStyle name="autoLogin">
          Ghi nhớ đăng nhập
        </ProFormCheckbox>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </ProForm>
  )
})

export default RegisterForm
