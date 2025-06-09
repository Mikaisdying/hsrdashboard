import {
  Modal,
  Steps,
  Form,
  Input,
  Button,
  Avatar,
  Select,
  Space,
  notification as antdNotification,
} from 'antd'
import { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { createProjectApi } from '../../../apis/projects/project.api'
import { searchMembers } from '../../../apis/members/member.api'
import type { IMember } from '../../../apis/members/member.interface'
import type { IProject, IProjectMember } from '../../../apis/projects/project.interface'

const { Step } = Steps

const defaultTools = [
  { name: 'Github', link: '' },
  { name: 'Gitlab', link: '' },
  { name: 'Figma', link: '' },
  { name: 'Jira', link: '' },
  { name: 'Notion', link: '' },
  { name: 'Slack', link: '' },
]

interface AddProjectModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: (project?: IProject) => void
}

interface ISelectedMember extends IMember {
  access: string
  role: string
}

export default function AddProjectModal({ open, onClose, onSuccess }: AddProjectModalProps) {
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [tools, setTools] = useState(defaultTools)
  const [members, setMembers] = useState<ISelectedMember[]>([])
  const [userSearch, setUserSearch] = useState('')
  const [userOptions, setUserOptions] = useState<IMember[]>([])
  const [notification, notificationContext] = antdNotification.useNotification()

  const resetModal = () => {
    setCurrent(0)
    setLoading(false)
    form.resetFields()
    setTools(defaultTools)
    setMembers([])
    setUserSearch('')
    setUserOptions([])
  }

  const handleUserSearch = async (value: string) => {
    setUserSearch(value)
    if (!value) {
      setUserOptions([])
      return
    }
    try {
      const users = await searchMembers(value)
      setUserOptions(users)
    } catch {
      setUserOptions([])
    }
  }

  const handleAddMember = (userId: number) => {
    const user = userOptions.find((u) => u.id === userId)
    if (user && !members.find((m) => m.id === userId)) {
      setMembers([
        ...members,
        {
          ...user,
          access: members.length === 0 ? 'PM' : 'MEM',
          role: '',
        },
      ])
    }
  }

  const handleRemoveMember = (userId: number) => {
    setMembers(members.filter((m) => m.id !== userId))
  }

  const handleChangeAccess = (userId: number, access: string) => {
    if (access === 'PM') {
      const hasOtherPM = members.some((m) => m.access === 'PM' && m.id !== userId)
      if (hasOtherPM) return
      setMembers(
        members.map((m) =>
          m.id === userId ? { ...m, access } : m.access === 'PM' ? { ...m, access: '' } : m
        )
      )
    } else {
      setMembers(members.map((m) => (m.id === userId ? { ...m, access } : m)))
    }
  }

  const handleChangeRole = (userId: number, role: string) => {
    setMembers(members.map((m) => (m.id === userId ? { ...m, role } : m)))
  }

  const stepContent = [
    <>
      <Form.Item
        label="Tên dự án"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}
      >
        <Input placeholder="Tên dự án (Bắt buộc)*" />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <Input.TextArea rows={3} placeholder="Mô tả (Bắt buộc)*" />
      </Form.Item>
      <Form.Item label="Thẻ" name="tags">
        <Input placeholder="Thẻ: phân tách bằng dấu phẩy" />
      </Form.Item>
    </>,
    <Space direction="vertical" style={{ width: '100%' }}>
      {tools.map((tool, idx) => (
        <Input
          key={`${tool.name}-${idx}`}
          prefix={
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.name.toLowerCase()}/${tool.name.toLowerCase()}-original.svg`}
              alt={tool.name}
              style={{ width: 16, height: 16 }}
            />
          }
          placeholder={`Link ${tool.name}`}
          value={tools[idx].link}
          onChange={(e) => {
            const newTools = [...tools]
            newTools[idx].link = e.target.value
            setTools(newTools)
          }}
        />
      ))}
    </Space>,
    <div>
      <Select<number>
        showSearch
        value={undefined}
        placeholder="Tìm kiếm thành viên theo tên hoặc email"
        style={{ width: '100%', marginBottom: 12 }}
        onSearch={handleUserSearch}
        onSelect={handleAddMember}
        filterOption={false}
        optionLabelProp="label"
        options={userOptions
          .filter((u) => !members.find((m) => m.id === u.id))
          .map((u) => ({
            label: u.fullName,
            value: u.id,
            email: u.email,
            avatar: u.avatar,
          }))}
        notFoundContent={userSearch ? 'Không tìm thấy người dùng' : null}
      />
      <Space direction="vertical" style={{ width: '100%' }}>
        {members.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center' }}>Chưa thêm thành viên nào</div>
        )}
        {members.map((m) => (
          <Space
            key={m.id}
            style={{ justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}
          >
            <Space>
              <Avatar src={m.avatar} icon={!m.avatar && <UserOutlined />} />
              <span>{m.fullName}</span>
              <span style={{ color: '#888', fontSize: 12 }}>{m.email}</span>
            </Space>
            <Space>
              <Select
                size="small"
                placeholder="Phân quyền"
                style={{ width: 120 }}
                value={m.access || undefined}
                onChange={(val) => handleChangeAccess(m.id, val)}
              >
                <Select.Option
                  value="PM"
                  disabled={!!members.find((mem) => mem.access === 'PM' && mem.id !== m.id)}
                >
                  Quản lý dự án
                </Select.Option>
                <Select.Option value="LD">Trưởng nhóm</Select.Option>
                <Select.Option value="MEM">Thành viên</Select.Option>
              </Select>
              <Input
                size="small"
                placeholder="Vai trò"
                style={{ width: 90 }}
                value={m.role}
                onChange={(e) => handleChangeRole(m.id, e.target.value)}
              />
              <Button size="small" danger onClick={() => handleRemoveMember(m.id)}>
                Xóa
              </Button>
            </Space>
          </Space>
        ))}
      </Space>
    </div>,
  ]

  const handleNext = async () => {
    if (current === 0) {
      try {
        await form.validateFields()
        setCurrent(current + 1)
      } catch {}
    } else {
      setCurrent(current + 1)
    }
  }

  const handlePrev = () => setCurrent(current - 1)

  const handleFinish = async () => {
    try {
      setLoading(true)
      await form.validateFields()
      const values = form.getFieldsValue()
      const randomCode = `PRJ${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`
      const membersPayload: IProjectMember[] = members.map((m) => ({
        id: m.id,
        name: m.fullName,
        avatar: m.avatar ?? '',
      }))
      const pmMember = members.find((m) => m.access === 'PM')
      const payload: IProject = {
        id: 0,
        name: values.name?.trim(),
        code: randomCode,
        description: values.description?.trim(),
        status: 'NEW',
        createdDate: new Date().toISOString().slice(0, 10),
        endDate: '',
        budget: 0,
        updatedAt: '',
        link: tools.map((t) => t.link?.trim() || ''),
        pm: pmMember
          ? {
              id: pmMember.id,
              name: pmMember.fullName,
              avatar: pmMember.avatar ?? '',
            }
          : undefined,
        members: membersPayload,
      }
      await createProjectApi(payload)
      setLoading(false)
      notification.success({
        message: 'Hoàn thành!',
        description: 'Tạo dự án thành công.',
      })
      if (onSuccess) {
        onSuccess(payload)
      }
      onClose()
    } catch (e) {
      setLoading(false)
      notification.error({
        message: 'Tạo dự án thất bại',
      })
    }
  }

  return (
    <>
      {notificationContext}
      <Modal
        open={open}
        onCancel={() => {
          onClose()
        }}
        afterClose={resetModal}
        footer={null}
        title="Tạo dự án mới"
        width={600}
      >
        <Steps current={current} style={{ marginBottom: 24 }}>
          <Step title="Thông tin dự án" />
          <Step title="Công cụ" />
          <Step title="Thành viên" />
        </Steps>
        <Form form={form} layout="vertical" initialValues={{}}>
          <div style={{ minHeight: 180, marginBottom: 24 }}>
            {stepContent.map((content, idx) => (
              <div key={idx} style={{ display: current === idx ? 'block' : 'none' }}>
                {content}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            {current > 0 && (
              <Button style={{ marginRight: 8 }} onClick={handlePrev}>
                Quay lại
              </Button>
            )}
            {current < stepContent.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Tiếp tục
              </Button>
            )}
            {current === stepContent.length - 1 && (
              <Button type="primary" loading={loading} onClick={handleFinish}>
                Tạo dự án
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </>
  )
}
