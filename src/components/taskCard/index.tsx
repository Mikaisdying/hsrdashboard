import React from 'react'
import { Card, Typography } from 'antd'

interface TaskCardProps {
  title: string
  description?: string
}

const { Title, Paragraph } = Typography

const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => (
  <Card style={{ marginBottom: 12 }}>
    <Title level={5} style={{ marginBottom: 8 }}>
      {title}
    </Title>
    <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
      {description || 'Chưa có mô tả'}
    </Paragraph>
  </Card>
)

export default TaskCard
