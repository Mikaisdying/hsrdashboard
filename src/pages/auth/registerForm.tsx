import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { ProFormText, ProForm } from '@ant-design/pro-components'
import { theme } from 'antd'

const RegisterForm = ({
  onSubmit,
}: {
  onSubmit: (values: { fullName: string; mobile: string; password: string }) => void
}) => {
  const { token } = theme.useToken()

  return (
    <ProForm
      onFinish={onSubmit}
      submitter={{
        searchConfig: {
          submitText: 'Đăng ký',
        },
        resetButtonProps: false,
        submitButtonProps: {
          type: 'primary',
        },
      }}
    >
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
    </ProForm>
  )
}

export default RegisterForm
