import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Select,
  notification as antdNotification,
  Space,
} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import {
  searchMembers,
  createMember,
  approveMember,
  updateMember,
} from '../../../apis/members/member.api'
import type { IMember } from '../../../apis/members/member.interface'
import EditUserModal from './EditUserModal'

const { Option } = Select

const useNotification = () => {
  const [notification, notificationContext] = antdNotification.useNotification()
  return { notification, notificationContext }
}

const UserListPage = () => {
  const [data, setData] = useState<(IMember & { approved?: boolean })[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [adding, setAdding] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<IMember | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 1 | 0>(1)
  const { notification, notificationContext } = useNotification()

  const fetchData = () => {
    setLoading(true)
    searchMembers('')
      .then((res: IMember[]) => {
        let filtered = res
        if (statusFilter !== 'all') {
          filtered = res.filter((item) => item.status === statusFilter)
        }
        setData(
          filtered.map((item) => ({
            ...item,
            approved: item.isApproved,
          }))
        )
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [statusFilter])

  const handleAdd = async () => {
    try {
      const values = await form.validateFields()
      const isDuplicate = data.some((item) => item.email === values.email)
      if (isDuplicate) {
        notification.error({ message: 'Email đã tồn tại trong hệ thống!' })
        return
      }
      setAdding(true)
      await createMember({
        fullName: values.fullName,
        email: values.email,
        role: values.role || 'user',
        isApproved: true,
      })
      notification.success({ message: 'Thêm người dùng thành công!' })
      setModalOpen(false)
      form.resetFields()
      fetchData()
    } catch (err) {
      if ((err as any)?.errorFields) return
      notification.error({ message: 'Có lỗi khi thêm người dùng!' })
    } finally {
      setAdding(false)
    }
  }

  const handleApprove = async (email: string) => {
    try {
      await approveMember(email)
      notification.success({ message: 'Phê duyệt thành công!' })
      fetchData()
    } catch {
      notification.error({ message: 'Có lỗi khi phê duyệt!' })
    }
  }

  const handleEdit = (user: IMember) => {
    setEditingUser(user)
    setEditModalOpen(true)
  }

  const handleSaveEdit = async (values: Partial<IMember>) => {
    if (!editingUser) return
    setEditLoading(true)
    try {
      await updateMember(editingUser.id, values, editingUser)
      setEditModalOpen(false)
      setEditingUser(null)
      fetchData()
    } catch {
      notification.error({ message: 'Có lỗi khi cập nhật người dùng!' })
    } finally {
      setEditLoading(false)
    }
  }

  const columns: ColumnsType<IMember & { approved?: boolean }> = [
    {
      title: 'STT',
      key: 'stt',
      render: (_text, _record, index) => index + 1,
      align: 'center',
      width: 80,
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Trang thái',
      dataIndex: 'approved',
      key: 'approved',
      render: (_value: boolean, record) => {
        if (record.approved === true) return ''
        return (
          <span>
            <span
              style={{ cursor: 'pointer', marginRight: 8, color: 'green' }}
              onClick={() => handleApprove(record.email)}
            >
              ✔
            </span>
            <span style={{ cursor: 'pointer', color: 'red' }}>✖</span>
          </span>
        )
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 100,
      render: (_text, record) => (
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => handleEdit(record)}
          title="Chỉnh sửa"
        />
      ),
    },
  ]

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {notificationContext}
      <Space
        className="mb-4 flex flex-wrap items-center justify-between gap-4"
        style={{ width: '100%', marginBottom: 24 }}
        align="center"
        size={16}
      >
        <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 180 }}>
          <Option value={1}>Đang hoạt động</Option>
          <Option value={0}>Không hoạt động</Option>
          <Option value="all">Tất cả</Option>
        </Select>
        <Button type="primary" onClick={() => setModalOpen(true)} className="!ml-2">
          Thêm người dùng
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.email}
        bordered
        pagination={{ pageSize: 10 }}
        className="antd-table-custom mt-4 !overflow-hidden !rounded-lg !bg-white !shadow"
      />
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleAdd}
        confirmLoading={adding}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên người dùng"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Vai trò" name="role">
            <Input placeholder="user" />
          </Form.Item>
        </Form>
      </Modal>
      <EditUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        user={editingUser}
        loading={editLoading}
      />
    </div>
  )
}

export default UserListPage
