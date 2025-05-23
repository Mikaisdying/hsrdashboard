import { Modal, Steps, Form, Input, Button, Avatar, Select, Space, message } from 'antd'
import { useState } from 'react'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { createProjectApi } from '../../../apis/projects/project.api'
import { searchMembers } from '../../../apis/members/member.api'
import type { IMember } from '../../../apis/members/member.interface'

const { Step } = Steps

const defaultTools = [
  { name: 'Github', icon: '', link: '' },
  { name: 'Figma', icon: '', link: '' },
  { name: 'Jira', icon: '', link: '' },
  { name: 'Notion', icon: '', link: '' },
  { name: 'Slack', icon: '', link: '' },
  { name: 'Other', icon: '', link: '' },
]

interface AddProjectModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
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

  // Thay thế handleUserSearch bằng gọi API thật
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
          access: '',
          role: '',
        },
      ])
    }
  }

  const handleRemoveMember = (userId: number) => {
    setMembers(members.filter((m) => m.id !== userId))
  }

  const handleChangeAccess = (userId: number, access: string) => {
    setMembers(members.map((m) => (m.id === userId ? { ...m, access } : m)))
  }

  const handleChangeRole = (userId: number, role: string) => {
    setMembers(members.map((m) => (m.id === userId ? { ...m, role } : m)))
  }

  const steps = [
    {
      title: 'Project Details',
      content: (
        <Form form={form} layout="vertical" initialValues={{}}>
          <Form.Item
            label="Project Title"
            name="title"
            rules={[{ required: true, message: 'Please input project title' }]}
          >
            <Input placeholder="Title (Required)*" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: 'Please input description' }]}
          >
            <Input.TextArea rows={3} placeholder="Description (Required)*" />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Input placeholder="Tags: separate by comma" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Tools',
      content: (
        <Space direction="vertical" style={{ width: '100%' }}>
          {tools.map((tool, idx) => (
            <Input
              key={tool.name}
              addonBefore={tool.name}
              placeholder={`${tool.name} Link`}
              value={tools[idx].link}
              onChange={(e) => {
                const newTools = [...tools]
                newTools[idx].link = e.target.value
                setTools(newTools)
              }}
            />
          ))}
        </Space>
      ),
    },
    {
      title: 'Add Members',
      content: (
        <div>
          <Select<number>
            showSearch
            value={undefined}
            placeholder="Search users by name or email"
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
            notFoundContent={userSearch ? 'No users found' : null}
          />
          <Space direction="vertical" style={{ width: '100%' }}>
            {members.length === 0 && (
              <div style={{ color: '#888', textAlign: 'center' }}>No members added</div>
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
                    placeholder="Access"
                    style={{ width: 100 }}
                    value={m.access || undefined}
                    onChange={(val) => handleChangeAccess(m.id, val)}
                  >
                    <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="Member">Member</Select.Option>
                    <Select.Option value="Editor">Editor</Select.Option>
                    <Select.Option value="View Only">View Only</Select.Option>
                  </Select>
                  <Input
                    size="small"
                    placeholder="Role"
                    style={{ width: 90 }}
                    value={m.role}
                    onChange={(e) => handleChangeRole(m.id, e.target.value)}
                  />
                  <Button size="small" danger onClick={() => handleRemoveMember(m.id)}>
                    Remove
                  </Button>
                </Space>
              </Space>
            ))}
          </Space>
        </div>
      ),
    },
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
      const values = await form.validateFields()
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(',').map((t: string) => t.trim()) : [],
        tools: tools.filter((t) => t.link),
        members: members
          .filter((m) => m.access && m.role)
          .map((m) => ({
            id: m.id,
            name: m.fullName,
            email: m.email,
            access: m.access,
            role: m.role,
          })),
      }
      await createProjectApi(payload)
      message.success('Project created successfully')
      setLoading(false)
      onSuccess && onSuccess()
      onClose()
    } catch (e) {
      setLoading(false)
      message.error('Failed to create project')
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Create a new project"
      destroyOnClose
      width={600}
    >
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ minHeight: 180, marginBottom: 24 }}>{steps[current].content}</div>
      <div style={{ textAlign: 'right' }}>
        {current > 0 && (
          <Button style={{ marginRight: 8 }} onClick={handlePrev}>
            Back
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" loading={loading} onClick={handleFinish}>
            Create Project
          </Button>
        )}
      </div>
    </Modal>
  )
}
