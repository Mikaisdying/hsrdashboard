import React from 'react'
import { Card } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import type { ITask } from '../../apis/tasks/task.interface'

interface TaskCardProps {
  task: ITask
  onClick?: (task: ITask) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <Card
      style={{
        border: 'none',
        borderRadius: '10px',
        padding: '6px 8px 6px 8px',
        marginBottom: '2px',
        cursor: onClick ? 'pointer' : undefined,
      }}
      styles={{ body: { padding: 0 } }}
      onClick={() => onClick && onClick(task)}
      hoverable={!!onClick}
    >
      <h4 style={{ fontSize: 14, margin: '2px 0 2px 4px', fontWeight: 600 }}>{task.name}</h4>
      {task.description && (
        <BarsOutlined style={{ color: '#b0b6be', fontSize: 18, marginTop: 2, marginBottom: 2 }} />
      )}
    </Card>
  )
}

export default TaskCard
