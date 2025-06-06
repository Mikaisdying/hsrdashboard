import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import TaskCard from '../../../components/taskCard'
import AddTaskModal from '../../../components/taskModal'
import type { ITask } from '../../../apis/tasks/task.interface'
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
                <div
                  style={{
                    border: '1px solid #222',
                    borderRadius: '10px',
                    padding: '4px 10px 10px 10px',
                    background: '#18191c',
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                      marginTop: 2,
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
                      {work.name}
                    </Typography.Title>
                  </div>
                  <div style={{ flex: 1, overflowY: 'visible', marginBottom: 0 }}>
                    {work.tasks.map((task: ITask) => (
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
                  <Button
                    type="dashed"
                    block
                    style={{
                      marginTop: 8,
                      color: '#fff',
                      borderColor: '#fff',
                      background: 'transparent',
                      marginBottom: 0,
                    }}
                    onClick={() => setShowAddTask(true)}
                  >
                    + Thêm thẻ
                  </Button>
                </div>
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
