import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Avatar, Select, Spin } from 'antd'
import { CloseOutlined, SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

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

  // Dummy search, replace with real API
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
    <Modal
      open={true}
      onCancel={() => setNewProject(false)}
      footer={null}
      width={600}
      bodyStyle={{
        borderRadius: 16,
        background: color.headerBg,
        color: color.text,
        padding: 0,
      }}
      closeIcon={<CloseOutlined style={{ color: color.text }} />}
      destroyOnClose
    >
      <div style={{ padding: 24, borderRadius: 16, background: color.headerBg }}>
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
                style={{ marginBottom: 8 }}
              />
              <Input.TextArea
                placeholder="Description (Required)*"
                name="desc"
                value={inputs.desc}
                onChange={handleInput}
                rows={3}
                style={{ marginBottom: 8 }}
              />
              <Input
                placeholder="Tags: separate by , eg- Mongo Db, React JS .."
                name="tags"
                value={inputs.tags}
                onChange={handleInput}
                style={{ marginBottom: 8 }}
              />
            </div>
            <Button
              type="primary"
              block
              disabled={!inputs.title || !inputs.desc}
              onClick={() => setStep(1)}
              style={{ marginTop: 12 }}
            >
              Next
            </Button>
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
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => setTools(tools.filter((_, i) => i !== idx))}
                    disabled={tools.length === 1}
                  />
                </div>
              ))}
              <Button icon={<PlusOutlined />} onClick={handleAddTool} style={{ marginTop: 4 }}>
                Add Tool
              </Button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Button onClick={() => setStep(0)} style={{ flex: 1 }}>
                Back
              </Button>
              <Button type="primary" onClick={() => setStep(2)} style={{ flex: 1 }}>
                Next
              </Button>
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
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => handleAddMember(user)}
                    disabled={!access || !role}
                  >
                    Add
                  </Button>
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
                          background: color.headerBg,
                          borderRadius: 8,
                          padding: '2px 8px',
                        }}
                      >
                        {user.access}
                      </span>
                      <span
                        style={{
                          background: color.headerBg,
                          borderRadius: 8,
                          padding: '2px 8px',
                        }}
                      >
                        {user.role}
                      </span>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveMember(user)}
                        danger
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Button onClick={() => setStep(1)} style={{ flex: 1 }}>
                Back
              </Button>
              <Button type="primary" onClick={handleCreate} style={{ flex: 1 }} disabled={loading}>
                {loading ? <Spin size="small" /> : 'Create Project'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default AddNewProject
