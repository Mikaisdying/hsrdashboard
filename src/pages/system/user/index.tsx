import { Table, Modal, Form, Input, Button, notification as antdNotification } from 'antd'
import { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { searchMembers, createMember } from '../../../apis/members/member.api'
import type { IMember } from '../../../apis/members/member.interface'

const useNotification = () => {
  const [notification, notificationContext] = antdNotification.useNotification()
  return { notification, notificationContext }
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
    title: 'Phê duyệt',
    dataIndex: 'approved',
    key: 'approved',
    render: (value: boolean) => (value === undefined ? '' : value ? '✔' : '✖'),
  },
]

const UserListPage = () => {
  const [data, setData] = useState<(IMember & { approved?: boolean })[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [adding, setAdding] = useState(false)
  const { notification, notificationContext } = useNotification()

  const fetchData = () => {
    setLoading(true)
    searchMembers('')
      .then((res: IMember[]) => {
        setData(
          res.map((item, idx) => ({
            ...item,
            approved: idx % 2 === 0,
          }))
        )
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {notificationContext}
      <div className="mb-4 flex items-center justify-between">
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Thêm người dùng
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.email}
        bordered
        pagination={{ pageSize: 10 }}
        className="antd-table-custom"
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
    </div>
  )
}

export default UserListPage
