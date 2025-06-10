import { Button, Modal, Select, Spin, Form, Input, notification } from 'antd'
import { useEffect, useState } from 'react'
import { IProject } from 'src/types/project'
import { createTaskApi } from 'src/api/task'
import { useSafeState } from 'src/hooks/useSafeState'

const { Option } = Select

interface AddTaskModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  membersOptions?: { label: string; value: number }[]
  workOptions?: { label: string; value: string | number }[]
  loading?: boolean
  setTaskLoading?: React.Dispatch<React.SetStateAction<boolean>>
  workId?: string | number | null
  project: IProject
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onSuccess,
  membersOptions = [],
  workOptions = [],
  loading: loadingProp,
  setTaskLoading,
  workId,
  project,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useSafeState<boolean>(false)

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open])

  const handleAddTask = async (values: any) => {
    if (!project) return
    setLoading(true)
    try {
      const task = await createTaskApi({
        ...values,
        projectId: project.id,
        status: 'NEW',
        createdDate: new Date().toISOString(),
      })
      setLoading(false)
      onClose()
      form.resetFields()
      notification.success({ message: 'Tạo task thành công!' })
      onSuccess && onSuccess()
      return task
    } catch (e) {
      setLoading(false)
      throw e
    }
  }

  return (
    <Modal
      title="Tạo mới task"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddTask}
        initialValues={{ status: 'NEW' }}
      >
        <Form.Item
          label="Tên task"
          name="name"
          rules={[{ required: true, message: 'Tên task là bắt buộc' }]}
        >
          <Input placeholder="Nhập tên task" />
        </Form.Item>

        <Form.Item label="Thành viên" name="memberIds">
          <Select
            mode="multiple"
            placeholder="Chọn thành viên"
            options={membersOptions}
          />
        </Form.Item>

        <Form.Item label="Công việc" name="workId">
          <Select placeholder="Chọn công việc" options={workOptions} />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Option value="NEW">Mới</Option>
            <Option value="IN_PROGRESS">Đang thực hiện</Option>
            <Option value="DONE">Đã hoàn thành</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingProp || loading}
          >
            Tạo task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTaskModal