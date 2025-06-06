import { ProFormText, ProFormCheckbox, ProForm } from '@ant-design/pro-components'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { theme } from 'antd'

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (values: { email: string; password: string }) => void
}) => {
  const { token } = theme.useToken()

  return (
    <ProForm
      onFinish={onSubmit}
      submitter={{
        searchConfig: {
          submitText: 'Đăng nhập',
        },
        resetButtonProps: false,
        submitButtonProps: {
          type: 'primary',
        },
      }}
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
    </ProForm>
  )
}

export default LoginForm
