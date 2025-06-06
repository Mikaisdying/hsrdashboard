import React, { useState } from 'react'
import { Modal, Form, Button, Select } from 'antd'

interface AddMemberModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleFinish = async () => {
    try {
      setLoading(true)
      const values = form.getFieldsValue()
      console.log('Mock API call with values:', values)
      setTimeout(() => {
        setLoading(false)
        form.resetFields()
        onSuccess && onSuccess()
        onClose()
      }, 1000)
    } catch {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Thêm Thành Viên" width={480}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Thành viên"
          name="members"
          rules={[{ required: true, message: 'Vui lòng chọn thành viên' }]}
        >
          <Select
            mode="multiple"
            placeholder="Tìm kiếm và chọn thành viên"
            showSearch
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase()) ?? false
            }
            options={[
              { label: 'Nguyễn Văn A (nguyenvana@example.com)', value: '1' },
              { label: 'Trần Thị B (tranthib@example.com)', value: '2' },
              { label: 'Lê Văn C (levanc@example.com)', value: '3' },
            ]}
          />
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" loading={loading} onClick={handleFinish}>
            Thêm Thành Viên
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddMemberModal
