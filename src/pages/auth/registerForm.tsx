import { ProFormText, ProForm } from '@ant-design/pro-components'
import { MobileOutlined, LockOutlined } from '@ant-design/icons'
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
        fieldProps={{ size: 'large' }}
        placeholder={'Họ tên (không bắt buộc)'}
      />
      <ProFormText
        name="mobile"
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
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
          prefix: <LockOutlined style={{ color: token.colorText }} className={'prefixIcon'} />,
          autoComplete: 'new-password',
        }}
        placeholder={'Mật khẩu'}
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      />
    </ProForm>
  )
}

export default RegisterForm
