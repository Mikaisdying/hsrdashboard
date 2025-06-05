import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import TaskCard from '../../../components/taskCard'
import AddTaskModal from '../../../components/taskModal'
import type { ITask } from '../../../apis/tasks/task.interface'
import type { IProject } from '../../../apis/projects/project.interface'

const { Title } = Typography

interface ProjectTaskTabProps {
  project: IProject
  onAddTask: (values: any) => Promise<void>
  showAddTask: boolean
  setShowAddTask: (show: boolean) => void
  taskLoading: boolean
  onSuccess?: () => void
}

const ProjectTaskTab: React.FC<ProjectTaskTabProps> = ({
  project,
  onAddTask,
  showAddTask,
  setShowAddTask,
  taskLoading,
  onSuccess,
}) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Title level={5} style={{ marginBottom: 0 }}>
          <UnorderedListOutlined /> Danh sách công việc
        </Title>
        <Button type="dashed" onClick={() => setShowAddTask(true)} loading={taskLoading}>
          + Thêm Task
        </Button>
      </div>
      {project.tasks && project.tasks.length > 0 ? (
        <Row gutter={[16, 16]}>
          {project.tasks.map((task: ITask) => (
            <Col span={12} key={task.id}>
              <TaskCard title={task.name} description={task.description} />
            </Col>
          ))}
        </Row>
      ) : (
        <Typography.Text type="secondary">Chưa có công việc nào</Typography.Text>
      )}
      <AddTaskModal
        open={showAddTask}
        onClose={() => setShowAddTask(false)}
        onSuccess={onSuccess}
        onFinish={onAddTask}
        membersOptions={project.members?.map((m: any) => ({ label: m.name, value: m.id })) || []}
        loading={taskLoading}
      />
    </div>
  )
}

export default ProjectTaskTab
