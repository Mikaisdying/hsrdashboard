import { Modal, Form, Input } from 'antd'
import { useEffect } from 'react'
import type { IMember } from '../../../apis/members/member.interface'

interface EditUserModalProps {
  open: boolean
  onClose: () => void
  onSave: (values: Partial<IMember>) => void
  user: IMember | null
  loading?: boolean
}

const EditUserModal = ({ open, onClose, onSave, user, loading }: EditUserModalProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user)
    } else {
      form.resetFields()
    }
  }, [user, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
    } catch {}
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
      title="Chỉnh sửa thông tin người dùng"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên người dùng"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input placeholder={user?.fullName || 'Chưa có thông tin'} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input placeholder={user?.email || 'Chưa có thông tin'} />
        </Form.Item>
        <Form.Item label="Vai trò" name="role">
          <Input placeholder={user?.role || 'Chưa có thông tin'} />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="mobile">
          <Input placeholder={user?.mobile || 'Chưa có thông tin'} />
        </Form.Item>
        <Form.Item label="Chức vụ" name="job">
          <Input placeholder={user?.job || 'Chưa có thông tin'} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserModal
