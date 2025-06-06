import React, { useRef } from 'react'
import { Typography, Button } from 'antd'
import TaskCard from './taskCard'
import type { ITask } from '../apis/tasks/task.interface'

interface WorkCardProps {
  name: string
  tasks: ITask[]
  workId: string | number
  onAddTask?: (workId: string | number) => void
  children?: React.ReactNode
}

const WorkCard: React.FC<WorkCardProps> = ({ name, tasks, workId, onAddTask, children }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const taskListRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      style={{
        border: '1px solid #222',
        borderRadius: '10px',
        padding: '12px 10px 12px 10px',
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}
      >
        <Typography.Title
          level={5}
          style={{
            margin: 5,
            fontSize: 17,
            fontWeight: 700,
            lineHeight: '28px',
          }}
        >
          {name}
        </Typography.Title>
      </div>
      {/* Task List - scrollable, flex: 1, with max height */}
      <div
        ref={taskListRef}
        style={{
          flex: 1,
          minHeight: 0,
          maxHeight: 300, // Thêm maxHeight để hiện scroll khi task nhiều
          overflowY: 'auto',

          marginBottom: 0,
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              borderRadius: '4px',
              padding: '2px',
              marginBottom: '4px',
            }}
          >
            <TaskCard title={task.name} description={task.description} />
          </div>
        ))}
      </div>
      {/* Footer: always pinned to bottom, never scrolls */}
      <div style={{ marginTop: 8, flexShrink: 0 }}>
        {children}
        {onAddTask && (
          <Button
            type="dashed"
            block
            style={{
              background: 'transparent',
              marginBottom: 0,
            }}
            onClick={() => onAddTask(workId)}
          >
            + Thêm thẻ
          </Button>
        )}
      </div>
    </div>
  )
}

export default WorkCard
