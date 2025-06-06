import React from 'react'
import { Row, Col, Typography } from 'antd'
import AddTaskModal from '../../../components/taskModal'
import WorkCard from '../../../components/workCard'
import type { IProject } from '../../../apis/projects/project.interface'
import type { IWork } from '../../../apis/tasks/work.interface'

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
          marginTop: 32,
          marginBottom: 0,
          // Remove fixed height and overflow to allow content to grow naturally
        }}
      >
        {project.works && project.works.length > 0 ? (
          <Row
            gutter={[12, 0]}
            wrap={false}
            style={{
              flexWrap: 'nowrap',
              marginBottom: 0,
              height: '100%',
            }}
          >
            {project.works.map((work: IWork) => (
              <Col flex="0 0 280px" key={work.id} style={{ minWidth: 280, maxWidth: 280 }}>
                <WorkCard
                  name={work.name}
                  tasks={work.tasks}
                  onAddTask={() => setShowAddTask(true)}
                />
              </Col>
            ))}
            {/* Add Work Card */}
            <Col flex="0 0 280px" key="add-work" style={{ minWidth: 280, maxWidth: 280 }}>
              <div
                style={{
                  border: '2px dashed #fff',
                  borderRadius: '10px',
                  padding: '10px',
                  background: 'rgba(24,25,28,0.7)',
                  minHeight: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  /* TODO: handle add work modal */
                }}
              >
                + Thêm work
              </div>
            </Col>
          </Row>
        ) : (
          <Typography.Text type="secondary">Chưa có công việc nào</Typography.Text>
        )}
      </div>
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
