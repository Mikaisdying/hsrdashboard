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
        padding: 0,
      }}
      closeIcon={<CloseOutlined style={{ color: color.text }} />}
      destroyOnClose
    >
      <div className="bg-background text-text rounded-2xl" style={{ padding: 24 }}>
        <h2 className="text-text mb-4 text-[22px] font-medium">Create a new project</h2>
        {step === 0 && (
          <>
            <div className="mb-3">
              <Input
                placeholder="Title (Required)*"
                name="title"
                value={inputs.title}
                onChange={handleInput}
                className="bg-primary text-textPrimary border-border mb-2"
              />
              <Input.TextArea
                placeholder="Description (Required)*"
                name="desc"
                value={inputs.desc}
                onChange={handleInput}
                rows={3}
                className="bg-secondary text-textPrimary border-border mb-2"
                style={{
                  boxShadow: theme === 'dark' ? '0 0 0 1px #444' : '0 0 0 1px #d9d9d9',
                  transition: 'all 0.2s',
                }}
              />
              <Input
                placeholder="Tags: separate by , eg- Mongo Db, React JS .."
                name="tags"
                value={inputs.tags}
                onChange={handleInput}
                className="bg-secondary text-textPrimary border-border mb-2"
                style={{
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
              className="mt-3"
            >
              Next
            </BaseButton>
          </>
        )}
        {step === 1 && (
          <>
            <div className="mb-3">
              <h4 className="mb-2">Tools</h4>
              {tools.map((tool, idx) => (
                <div key={idx} className="mb-2 flex gap-2">
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
              <BaseButton icon={<PlusOutlined />} onClick={handleAddTool} className="mt-1">
                Add Tool
              </BaseButton>
            </div>
            <div className="mt-4 flex gap-2">
              <BaseButton onClick={() => setStep(0)} className="flex-1">
                Back
              </BaseButton>
              <BaseButton type="primary" onClick={() => setStep(2)} className="flex-1">
                Next
              </BaseButton>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-3">
              <h4 className="mb-2">Add Members</h4>
              <Input
                placeholder="Search by email..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-2"
              />
              {users.map((user) => (
                <div key={user.id} className="mb-2 flex items-center gap-2">
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
                <div className="mt-3">
                  <div className="mb-2 font-medium">Added Members:</div>
                  {members.map((user) => (
                    <div key={user.id} className="mb-2 flex items-center gap-2">
                      <Avatar src={user.img}>{user.name.charAt(0)}</Avatar>
                      <span>
                        {user.name} ({user.email})
                      </span>
                      <span className="bg-background rounded px-2 py-0.5">{user.access}</span>
                      <span className="bg-background rounded px-2 py-0.5">{user.role}</span>
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
            <div className="mt-4 flex gap-2">
              <BaseButton onClick={() => setStep(1)} className="flex-1">
                Back
              </BaseButton>
              <BaseButton
                type="primary"
                onClick={handleCreate}
                className="flex-1"
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
