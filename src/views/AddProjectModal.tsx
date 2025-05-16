import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CloseOutlined, PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { StepsForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components'
import { Input, Avatar, Spin } from 'antd'
import { useTheme } from '../theme/ThemeContext.tsx'
import { themeColors } from '../theme/colors.ts'
import BaseStepForm from '../components/Base/BaseStepForm'
import BaseButton from '../components/Base/BaseButton.tsx'

// Custom hook cho nút Back
function useStepFormBack(stepFormRef: React.RefObject<any>) {
  return useCallback(() => {
    if (stepFormRef.current && typeof stepFormRef.current.prev === 'function') {
      stepFormRef.current.prev()
    }
  }, [stepFormRef])
}

interface AddNewProjectProps {
  setNewProject: (v: boolean) => void
  teamId?: string
  teamProject?: boolean
}

const AddNewProject: React.FC<AddNewProjectProps> = ({ setNewProject }) => {
  const { theme } = useTheme()
  const color = themeColors[theme]
  const [loading, setLoading] = useState(false)
  const [tools, setTools] = useState([{ name: '', icon: '', link: '' }])
  const [members, setMembers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [role, setRole] = useState('')
  const [access, setAccess] = useState('')
  const stepFormRef = useRef<any>(null)
  const handleBack = useStepFormBack(stepFormRef)

  useEffect(() => {
    if (search) {
      setUsers([
        { id: '1', name: 'Alice', email: 'alice@company.com', img: '' },
        { id: '2', name: 'Bob', email: 'bob@company.com', img: '' },
      ])
    } else {
      setUsers([])
    }
  }, [search])

  const handleCreate = async (values: any) => {
    setLoading(true)
    console.log('Form submitted with values:', values)
    alert('Project created successfully!')
    setTimeout(() => {
      setLoading(false)
      setNewProject(false)
    }, 1200)
  }

  // Tool handlers
  const handleAddTool = () => setTools([...tools, { name: '', icon: '', link: '' }])
  const handleToolChange = (idx: number, key: 'name' | 'icon' | 'link', value: string) => {
    setTools((prev) => {
      const newTools = [...prev]
      newTools[idx][key] = value
      return newTools
    })
  }
  const handleRemoveTool = (idx: number) => {
    if (tools.length > 1) setTools(tools.filter((_, i) => i !== idx))
  }

  // Member handlers
  const handleAddMember = (user: any) => {
    if (!members.find((u) => u.id === user.id) && access && role) {
      setMembers([...members, { ...user, access, role }])
      setAccess('')
      setRole('')
      setSearch('')
      setUsers([])
    }
  }
  const handleRemoveMember = (user: any) => {
    setMembers(members.filter((u) => u.id !== user.id))
  }

  // Style helpers
  const inputStyle = {
    marginBottom: 8,
    background: color.secondary,
    color: color.text,
    transition: 'all 0.2s',
  }
  const sectionTitleStyle = {
    marginBottom: 8,
    fontWeight: 500,
    color: color.text,
    fontSize: 16,
  }
  const avatarStyle = {
    background: color.avatarBg,
    color: color.text,
  }
  const tagStyle = {
    background: color.secondary,
    borderRadius: 8,
    padding: '2px 8px',
    color: color.text,
  }

  return (
    <BaseStepForm
      open={true}
      onClose={() => setNewProject(false)}
      closeIcon={<CloseOutlined style={{ color: color.text }} />}
    >
      <div style={{ padding: 24, borderRadius: 16, background: color.background }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 16, color: color.text }}>
          Create a new project
        </h2>
        <StepsForm
          formRef={stepFormRef}
          onFinish={handleCreate}
          submitter={false}
          stepsProps={{
            size: 'small',
            style: { marginBottom: 24 },
            current: undefined,
          }}
        >
          <StepsForm.StepForm
            name="basic"
            title="Basic"
            initialValues={{ img: '', title: '', desc: '', tags: '' }}
          >
            <ProFormText
              placeholder="Title (Required)*"
              name="title"
              fieldProps={inputStyle}
              rules={[{ required: true, message: 'Please input project title' }]}
            />
            <ProFormTextArea
              placeholder="Description (Required)*"
              name="desc"
              fieldProps={{
                ...inputStyle,
                rows: 3,
              }}
              rules={[{ required: true, message: 'Please input description' }]}
            />
            <ProFormText
              placeholder="Tags: separate by , eg- Mongo Db, React JS .."
              name="tags"
              style={inputStyle}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <BaseButton
                type="primary"
                style={{ flex: 1 }}
                onClick={() => stepFormRef.current?.submit?.()}
              >
                Next
              </BaseButton>
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm name="tools" title="Tools">
            <div style={{ marginBottom: 12 }}>
              <div style={{ ...sectionTitleStyle, color: color.text }}>Tools</div>
              {tools.map((tool, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <Input
                    placeholder="Tool Name"
                    value={tool.name}
                    onChange={(e) => handleToolChange(idx, 'name', e.target.value)}
                    style={inputStyle}
                  />
                  <Input
                    placeholder="Link"
                    value={tool.link}
                    onChange={(e) => handleToolChange(idx, 'link', e.target.value)}
                    style={inputStyle}
                  />
                  <BaseButton
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveTool(idx)}
                    disabled={tools.length === 1}
                  />
                </div>
              ))}
              <BaseButton icon={<PlusOutlined />} onClick={handleAddTool} style={{ marginTop: 4 }}>
                Add Tool
              </BaseButton>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <BaseButton style={{ flex: 1 }} onClick={handleBack}>
                Back
              </BaseButton>
              <BaseButton
                type="primary"
                style={{ flex: 1 }}
                onClick={() => stepFormRef.current?.submit?.()}
              >
                Next
              </BaseButton>
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm name="members" title="Members">
            <div style={{ marginBottom: 12 }}>
              <div style={sectionTitleStyle}>Add Members</div>
              <Input
                placeholder="Search by email..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ ...inputStyle, marginBottom: 8 }}
              />
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
                >
                  <Avatar src={user.img} style={avatarStyle}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <span>
                    {user.name} ({user.email})
                  </span>
                  <ProFormSelect
                    placeholder="Access"
                    name="access"
                    fieldProps={{
                      value: access,
                      onChange: setAccess,
                      style: { width: 100 },
                      options: [
                        { value: 'Admin', label: 'Admin' },
                        { value: 'Member', label: 'Member' },
                        { value: 'Editor', label: 'Editor' },
                        { value: 'View Only', label: 'View Only' },
                      ],
                    }}
                    noStyle
                  />
                  <ProFormText
                    placeholder="Role"
                    name="role"
                    fieldProps={{
                      value: role,
                      onChange: (e: any) => setRole(e.target.value),
                      style: { width: 80 },
                    }}
                    noStyle
                  />
                  <BaseButton
                    icon={<PlusOutlined />}
                    onClick={() => handleAddMember(user)}
                    disabled={!access || !role}
                  >
                    Add
                  </BaseButton>
                </div>
              ))}
              {members.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 500, marginBottom: 8, color: color.text }}>
                    Added Members:
                  </div>
                  {members.map((user) => (
                    <div
                      key={user.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
                    >
                      <Avatar src={user.img} style={avatarStyle}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <span>
                        {user.name} ({user.email})
                      </span>
                      <span style={tagStyle}>{user.access}</span>
                      <span style={tagStyle}>{user.role}</span>
                      <BaseButton
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveMember(user)}
                        danger
                      >
                        Remove
                      </BaseButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <BaseButton style={{ flex: 1 }} onClick={handleBack}>
                Back
              </BaseButton>
              <BaseButton type="primary" htmlType="submit" style={{ flex: 1 }} disabled={loading}>
                {loading ? <Spin size="small" /> : 'Create Project'}
              </BaseButton>
            </div>
          </StepsForm.StepForm>
        </StepsForm>
      </div>
    </BaseStepForm>
  )
}

export default AddNewProject
