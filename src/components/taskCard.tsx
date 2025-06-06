import React from 'react'
import { Card } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

interface TaskCardProps {
  title: string
  description?: string
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
  return (
    <Card
      style={{
        border: 'none',
        borderRadius: '10px',
        padding: '6px 8px 6px 8px',
        marginBottom: '2px',
      }}
      styles={{ body: { padding: 0 } }}
    >
      <h4 style={{ fontSize: 14, margin: '2px 0 2px 4px', fontWeight: 600 }}>{title}</h4>
      {description && (
        <BarsOutlined style={{ color: '#b0b6be', fontSize: 18, marginTop: 2, marginBottom: 2 }} />
      )}
    </Card>
  )
}

export default TaskCard
