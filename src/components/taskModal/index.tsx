import React, { useState } from 'react'
import {
  Modal,
  Steps,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
  ConfigProvider,
} from 'antd'

const { Step } = Steps
const { RangePicker } = DatePicker

interface AddTaskModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  onFinish?: (values: any) => Promise<void>
  membersOptions?: { label: string; value: number }[]
  loading?: boolean
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onSuccess,
  onFinish,
  membersOptions = [],
  loading: loadingProp,
}) => {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    try {
      await form.validateFields(['name', 'description'])
      setCurrent(1)
    } catch {}
  }

  const handlePrev = () => setCurrent(current - 1)

  const handleFinish = async () => {
    try {
      setLoading(true)
      await form.validateFields()
      const values = form.getFieldsValue()
      if (onFinish) {
        await onFinish(values)
      }
      setLoading(false)
      notification.success({ message: 'Tạo task thành công!' })
      onSuccess && onSuccess()
      onClose()
      setCurrent(0)
      form.resetFields()
    } catch {
      setLoading(false)
    }
  }

  const stepContent = [
    <>
      <Form.Item
        label="Tên Task"
        name="name"
        rules={[{ required: true, message: 'Nhập tên task' }]}
      >
        <Input placeholder="Tên task" />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea placeholder="Mô tả task" />
      </Form.Item>
    </>,
    <>
      <Form.Item
        label="Deadline"
        name="deadline"
        rules={[{ required: true, message: 'Vui lòng chọn hạn chót' }]}
      >
        <RangePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Thành viên" name="assignees">
        <Select mode="multiple" placeholder="Chọn thành viên" options={membersOptions} />
      </Form.Item>
    </>,
  ]

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Thêm Task mới" width={480}>
      <Steps current={current} style={{ marginBottom: 24 }}>
        <Step title="Thông tin" />
        <Step title="Deadline & Thành viên" />
      </Steps>
      <Form form={form} layout="vertical" initialValues={{ name: '', description: '' }}>
        <div style={{ minHeight: 120, marginBottom: 24 }}>{stepContent[current]}</div>
        <div style={{ textAlign: 'right' }}>
          {current > 0 && (
            <Button onClick={handlePrev} style={{ marginRight: 8 }}>
              Quay lại
            </Button>
          )}
          {current < stepContent.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Tiếp tục
            </Button>
          )}
          {current === stepContent.length - 1 && (
            <Button
              type="primary"
              loading={typeof loadingProp === 'boolean' ? loadingProp : loading}
              onClick={async () => {
                const values = form.getFieldsValue()
                form.setFieldsValue({ name: values.name?.trim() })
                await handleFinish()
              }}
            >
              Tạo Task
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  )
}

export default AddTaskModal
