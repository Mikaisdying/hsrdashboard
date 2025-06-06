import React, { useRef } from 'react'
import { Typography, Button } from 'antd'
import TaskCard from './taskCard'
import type { ITask } from '../apis/tasks/task.interface'

interface WorkCardProps {
  name: string
  tasks: ITask[]
  onAddTask?: () => void
  children?: React.ReactNode
}

const CARD_HEADER_HEIGHT = 44 // px, adjust if needed
const CARD_FOOTER_HEIGHT = 48 // px, adjust if needed
const CARD_MAX_HEIGHT = 480 // px, fallback max height if viewport is small
const TASK_LIST_MAX_HEIGHT = 320 // px, adjust as needed for your layout

const WorkCard: React.FC<WorkCardProps> = ({ name, tasks, onAddTask, children }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const taskListRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      style={{
        border: '1px solid #222',
        borderRadius: '10px',
        padding: '12px 10px 12px 10px',
        background: '#18191c',
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        height: 'auto',
        maxHeight: CARD_MAX_HEIGHT,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: 8,
          minHeight: CARD_HEADER_HEIGHT,
        }}
      >
        <Typography.Title
          level={5}
          style={{
            margin: 5,
            color: '#fff',
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
          overflowY: 'auto',
          maxHeight: TASK_LIST_MAX_HEIGHT,
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
      <div style={{ minHeight: CARD_FOOTER_HEIGHT, marginTop: 8, flexShrink: 0 }}>
        {children}
        {onAddTask && (
          <Button
            type="dashed"
            block
            style={{
              color: '#fff',
              borderColor: '#fff',
              background: 'transparent',
              marginBottom: 0,
            }}
            onClick={onAddTask}
          >
            + Thêm thẻ
          </Button>
        )}
      </div>
    </div>
  )
}

export default WorkCard
