import React from 'react'
import { Table, Button } from 'antd'
import { ProjectOutlined, PlusOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

const data = [
  { key: 1, name: 'Website Redesign', team: 'Design', status: 'Ongoing' },
  { key: 2, name: 'Mobile App', team: 'Development', status: 'Ongoing' },
  { key: 3, name: 'Testing Automation', team: 'QA', status: 'Completed' },
]

const AdminProjects: React.FC = () => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  const columns = [
    { title: 'Project Name', dataIndex: 'name', key: 'name' },
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
        <h2 style={{ fontSize: 20, fontWeight: 600, color: color.text }}>Projects</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Project
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default AdminProjects
