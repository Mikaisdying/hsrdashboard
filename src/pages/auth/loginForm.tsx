import { ProFormText, ProFormCheckbox, ProForm } from '@ant-design/pro-components'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import { Button } from 'antd'

const LoginForm = ({
  onSubmit,
  onSwitchToRegister,
}: {
  onSubmit: (values: { email: string; password: string }) => void
  onSwitchToRegister?: () => void
}) => {
  const { token } = theme.useToken()

  return (
    <ProForm
      onFinish={onSubmit}
      submitter={false} // Ẩn submit mặc định để custom lại layout
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
      <div
        style={{
          display: 'flex',
          marginTop: 8,
        }}
      >
        <Button
          type="link"
          onClick={typeof onSwitchToRegister === 'function' ? onSwitchToRegister : undefined}
        >
          Chưa có tài khoản? Đăng ký ngay
        </Button>
        <div style={{ flex: 1 }} />
        <Button
          type="primary"
          htmlType="submit"
          style={{ minWidth: 100, justifySelf: 'flex-end' }}
          onClick={() => {
            const formRef = ProForm.useFormInstance()
            if (formRef) formRef.submit()
          }}
        >
          Đăng nhập
        </Button>
      </div>
    </ProForm>
  )
}

export default LoginForm
