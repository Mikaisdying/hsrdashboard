import React, { useRef } from 'react'
import { Typography, Button, Dropdown } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import TaskCard from '../taskCard'
import { WorkCardMenu } from './workCardMenu'
import type { ITask } from '../../apis/tasks/task.interface'

interface WorkCardProps {
  name: string
  tasks: ITask[]
  workId: string | number
  onAddTask?: (workId: string | number) => void
  onDeleted?: () => void
  onTaskClick?: (task: ITask) => void
  children?: React.ReactNode
}

const WorkCard: React.FC<WorkCardProps> = ({
  name,
  tasks,
  workId,
  onAddTask,
  onDeleted,
  onTaskClick,
  children,
}) => {
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
          justifyContent: 'space-between',
          width: '100%',
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
        <Dropdown
          menu={{
            items: [
              {
                key: 'workCardMenu',
                label: (
                  <WorkCardMenu name={name} tasks={tasks} workId={workId} onDeleted={onDeleted} />
                ),
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<EllipsisOutlined />}
            style={{ marginLeft: 4, marginTop: 2, background: 'transparent' }}
          />
        </Dropdown>
      </div>
      {/* Task List */}
      <div
        ref={taskListRef}
        style={{
          flex: 1,
          minHeight: 0,
          maxHeight: 300,
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
            <TaskCard task={task} onClick={onTaskClick} />
          </div>
        ))}
      </div>
      {/* Footer */}
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
