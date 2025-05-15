import React, { useState, useEffect } from 'react'
import { Input, Avatar, Select, Spin } from 'antd'
import { CloseOutlined, SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'
import BaseButton from './Base/BaseButton'
import BaseModal from './Base/BaseModal'

interface AddNewProjectProps {
  setNewProject: (v: boolean) => void
  teamId?: string
  teamProject?: boolean
}

const AddNewProject: React.FC<AddNewProjectProps> = ({ setNewProject }) => {
  const { theme } = useTheme()
  const color = themeColors[theme]
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const [inputs, setInputs] = useState({ img: '', title: '', desc: '', tags: '' })
  const [tools, setTools] = useState([{ name: '', icon: '', link: '' }])
  const [members, setMembers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [role, setRole] = useState('')
  const [access, setAccess] = useState('')

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleAddTool = () => setTools([...tools, { name: '', icon: '', link: '' }])
  const handleToolChange = (idx: number, key: 'name' | 'icon' | 'link', value: string) => {
    const newTools = [...tools]
    newTools[idx][key] = value
    setTools(newTools)
  }

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

  const handleCreate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setNewProject(false)
    }, 1200)
  }

  return (
    <BaseModal
      open={true}
      onClose={() => setNewProject(false)}
      width={600}
      bodyStyle={{
        borderRadius: 16,
        background: color.background,
        color: color.text,
        padding: 0,
      }}
      closeIcon={<CloseOutlined style={{ color: color.text }} />}
      destroyOnClose
    >
      <div style={{ padding: 24, borderRadius: 16, background: color.background }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 16, color: color.text }}>
          Create a new project
        </h2>
        {step === 0 && (
          <>
            <div style={{ marginBottom: 12 }}>
              <Input
                placeholder="Title (Required)*"
                name="title"
                value={inputs.title}
                onChange={handleInput}
                style={{
                  marginBottom: 8,
                  background: color.primary,
                  color: color.textPrimary,
                  border:
                    color.border === 'none'
                      ? theme === 'dark'
                        ? '#444'
                        : '#d9d9d9'
                      : color.border,
                }}
              />
              <Input.TextArea
                placeholder="Description (Required)*"
                name="desc"
                value={inputs.desc}
                onChange={handleInput}
                rows={3}
                style={{
                  marginBottom: 8,
                  background: color.secondary,
                  color: color.textPrimary,
                  border:
                    color.border === 'none'
                      ? theme === 'dark'
                        ? '#444'
                        : '#d9d9d9'
                      : color.border,
                  boxShadow: theme === 'dark' ? '0 0 0 1px #444' : '0 0 0 1px #d9d9d9',
                  transition: 'all 0.2s',
                }}
              />
              <Input
                placeholder="Tags: separate by , eg- Mongo Db, React JS .."
                name="tags"
                value={inputs.tags}
                onChange={handleInput}
                style={{
                  marginBottom: 8,
                  background: color.secondary,
                  color: color.textPrimary,
                  border:
                    color.border === 'none'
                      ? theme === 'dark'
                        ? '#444'
                        : '#d9d9d9'
                      : color.border,
                  boxShadow: theme === 'dark' ? '0 0 0 1px #444' : '0 0 0 1px #d9d9d9',
                  transition: 'all 0.2s',
                }}
              />
            </div>
            <BaseButton
              type="primary"
              block
              disabled={!inputs.title || !inputs.desc}
              onClick={() => setStep(1)}
              style={{ marginTop: 12 }}
            >
              Next
            </BaseButton>
          </>
        )}
        {step === 1 && (
          <>
            <div style={{ marginBottom: 12 }}>
              <h4 style={{ marginBottom: 8 }}>Tools</h4>
              {tools.map((tool, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <Input
                    placeholder="Tool Name"
                    value={tool.name}
                    onChange={(e) => handleToolChange(idx, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Link"
                    value={tool.link}
                    onChange={(e) => handleToolChange(idx, 'link', e.target.value)}
                  />
                  <BaseButton
                    icon={<DeleteOutlined />}
                    onClick={() => setTools(tools.filter((_, i) => i !== idx))}
                    disabled={tools.length === 1}
                  />
                </div>
              ))}
              <BaseButton icon={<PlusOutlined />} onClick={handleAddTool} style={{ marginTop: 4 }}>
                Add Tool
              </BaseButton>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <BaseButton onClick={() => setStep(0)} style={{ flex: 1 }}>
                Back
              </BaseButton>
              <BaseButton type="primary" onClick={() => setStep(2)} style={{ flex: 1 }}>
                Next
              </BaseButton>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ marginBottom: 12 }}>
              <h4 style={{ marginBottom: 8 }}>Add Members</h4>
              <Input
                placeholder="Search by email..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
                >
                  <Avatar src={user.img}>{user.name.charAt(0)}</Avatar>
                  <span>
                    {user.name} ({user.email})
                  </span>
                  <Select
                    placeholder="Access"
                    value={access}
                    onChange={setAccess}
                    style={{ width: 100 }}
                  >
                    <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="Member">Member</Select.Option>
                    <Select.Option value="Editor">Editor</Select.Option>
                    <Select.Option value="View Only">View Only</Select.Option>
                  </Select>
                  <Input
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: 80 }}
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
                  <div style={{ fontWeight: 500, marginBottom: 8 }}>Added Members:</div>
                  {members.map((user) => (
                    <div
                      key={user.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
                    >
                      <Avatar src={user.img}>{user.name.charAt(0)}</Avatar>
                      <span>
                        {user.name} ({user.email})
                      </span>
                      <span
                        style={{
                          background: color.background,
                          borderRadius: 8,
                          padding: '2px 8px',
                        }}
                      >
                        {user.access}
                      </span>
                      <span
                        style={{
                          background: color.background,
                          borderRadius: 8,
                          padding: '2px 8px',
                        }}
                      >
                        {user.role}
                      </span>
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
              <BaseButton onClick={() => setStep(1)} style={{ flex: 1 }}>
                Back
              </BaseButton>
              <BaseButton
                type="primary"
                onClick={handleCreate}
                style={{ flex: 1 }}
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : 'Create Project'}
              </BaseButton>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  )
}

export default AddNewProject
