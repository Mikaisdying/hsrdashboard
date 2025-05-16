import React from 'react'
import { Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTheme } from '../../theme/ThemeContext'
import { themeColors } from '../../theme/colors'

const data = [
  { key: 1, name: 'Design', members: 10, lead: 'Alice' },
  { key: 2, name: 'Development', members: 20, lead: 'Bob' },
  { key: 3, name: 'QA', members: 5, lead: 'Charlie' },
]

const AdminTeams: React.FC = () => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  const columns = [
    { title: 'Team Name', dataIndex: 'name', key: 'name' },
    { title: 'Members', dataIndex: 'members', key: 'members' },
    { title: 'Team Lead', dataIndex: 'lead', key: 'lead' },
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
        <h2 style={{ fontSize: 20, fontWeight: 600, color: color.text }}>Teams</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Team
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default AdminTeams
