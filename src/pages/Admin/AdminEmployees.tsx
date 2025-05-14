import React from 'react'
import { Table, Button, Avatar } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import { useTheme } from '../../theme/ThemeContext'
import { themeColors } from '../../theme/colors'

const data = [
  { key: 1, name: 'Alice', email: 'alice@company.com', team: 'Design', status: 'Active' },
  { key: 2, name: 'Bob', email: 'bob@company.com', team: 'Development', status: 'Active' },
  { key: 3, name: 'Charlie', email: 'charlie@company.com', team: 'QA', status: 'Inactive' },
]

const AdminEmployees: React.FC = () => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_: any, record: any) => (
        <Avatar icon={<UserOutlined />} style={{ background: color.avatarBg, color: color.text }}>
          {record.name.charAt(0)}
        </Avatar>
      ),
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Team', dataIndex: 'team', key: 'team' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ]

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600, color: color.text }}>Employees</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Employee
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default AdminEmployees
