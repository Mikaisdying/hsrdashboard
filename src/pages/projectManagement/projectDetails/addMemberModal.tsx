import React, { useState } from 'react'
import { Modal, Form, Button, Select } from 'antd'
import { addProjectMemberApi } from '../../../apis/projects/project.api'
import { searchMembers } from '../../../apis/members/member.api'

interface AddMemberModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  projectId: string | number
  fetchDetail?: () => void
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  open,
  onClose,
  onSuccess,
  projectId,
  fetchDetail,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [userOptions, setUserOptions] = useState<{ label: string; value: string }[]>([])

  React.useEffect(() => {
    async function fetchUsers() {
      const users = await searchMembers('')
      setUserOptions(
        users.map((u: any) => ({
          label: `${u.fullName} (${u.email})`,
          value: String(u.id),
        }))
      )
    }
    if (open) fetchUsers()
  }, [open])

  const handleFinish = async () => {
    try {
      setLoading(true)
      await form.validateFields()
      const values = form.getFieldsValue()
      // Thêm từng thành viên vào bảng projectMembers
      await Promise.all(
        (values.members || []).map((user_id: string | number) =>
          addProjectMemberApi(projectId, {
            user_id,
            role: 'MEMBER',
            joinedAt: new Date().toISOString().slice(0, 10),
          })
        )
      )
      setLoading(false)
      form.resetFields()
      onSuccess && onSuccess()
      fetchDetail && fetchDetail()
      onClose()
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
              (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
            options={userOptions}
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
