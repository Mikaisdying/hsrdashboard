import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { ProFormText, ProForm } from '@ant-design/pro-components'
import { theme } from 'antd'
import { Button } from 'antd'

const RegisterForm = ({
  onSubmit,
  onSwitchToLogin,
}: {
  onSubmit: (values: { fullName: string; mobile: string; password: string }) => void
  onSwitchToLogin?: () => void
}) => {
  const { token } = theme.useToken()

  return (
    <ProForm onFinish={onSubmit} submitter={false}>
      <ProFormText
        name="fullName"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
        }}
        placeholder={'Họ tên (không bắt buộc)'}
      />
      <ProFormText
        name="gmail"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
        }}
        placeholder={'Gmail'}
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại!' },
          { pattern: /^0\d{9,10}$/, message: 'Số điện thoại không hợp lệ!' },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
          autoComplete: 'new-password',
        }}
        placeholder={'Mật khẩu'}
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      />
      <ProFormText.Password
        name="confirmPassword"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
          autoComplete: 'new-password',
        }}
        placeholder={'Nhập lại mật khẩu'}
        dependencies={['password']}
        rules={[
          { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'))
            },
          }),
        ]}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <Button
          type="link"
          onClick={typeof onSwitchToLogin === 'function' ? onSwitchToLogin : undefined}
        >
          Đã có tài khoản? Đăng nhập
        </Button>
        <div style={{ flex: 1 }} />
        <Button
          type="primary"
          htmlType="submit"
          style={{ minWidth: 100, justifySelf: 'flex-end' }}
          onClick={() => {
            const form = document.querySelector('form')
            if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
          }}
        >
          Đăng ký
        </Button>
      </div>
    </ProForm>
  )
}

export default RegisterForm
