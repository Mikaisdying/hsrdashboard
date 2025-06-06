import React, { useState } from 'react'
import { Modal, Steps, Form, Input, Button, DatePicker, Select, notification } from 'antd'

const { Step } = Steps
const { RangePicker } = DatePicker

interface AddTaskModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  onFinish?: (values: any) => Promise<void>
  membersOptions?: { label: string; value: number }[]
  workOptions?: { label: string; value: string | number }[]
  loading?: boolean
  workId?: string | number | null
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onSuccess,
  onFinish,
  membersOptions = [],
  workOptions = [],
  loading: loadingProp,
  workId,
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
      let values = form.getFieldsValue()
      if (workId) values = { ...values, workId }
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
        rules={[
          { required: true, message: 'Nhập tên task' },
          {
            validator: (_, value) => {
              if (typeof value === 'string' && value.trim().length === 0) {
                return Promise.reject('Tên task không được chỉ chứa khoảng trắng')
              }
              return Promise.resolve()
            },
          },
        ]}
      >
        <Input placeholder="Tên task" />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea placeholder="Mô tả task" />
      </Form.Item>
      {!workId && (
        <Form.Item
          label="Danh sách (Work)"
          name="workId"
          rules={[{ required: true, message: 'Chọn danh sách' }]}
        >
          <Select placeholder="Chọn danh sách" options={workOptions} />
        </Form.Item>
      )}
      <Form.Item label="Độ ưu tiên" name="priority">
        <Select placeholder="Chọn độ ưu tiên">
          <Select.Option value="high">Cao</Select.Option>
          <Select.Option value="medium">Trung bình</Select.Option>
          <Select.Option value="low">Thấp</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Loại công việc" name="type">
        <Select placeholder="Chọn loại">
          <Select.Option value="feature">Tính năng</Select.Option>
          <Select.Option value="bug">Bug</Select.Option>
          <Select.Option value="improvement">Cải tiến</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Yêu cầu xác nhận" name="confirm_required" valuePropName="checked">
        <Select placeholder="Yêu cầu xác nhận?">
          <Select.Option value={true}>Có</Select.Option>
          <Select.Option value={false}>Không</Select.Option>
        </Select>
      </Form.Item>
    </>,
    <>
      <Form.Item label="Deadline" name="deadline">
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
                const trimmedName = values.name?.trim() || ''
                form.setFieldsValue({ name: trimmedName })
                try {
                  await form.validateFields()
                  await handleFinish()
                } catch {}
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
