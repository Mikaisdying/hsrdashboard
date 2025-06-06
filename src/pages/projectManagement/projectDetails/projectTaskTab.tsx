import React from 'react'
import { Row, Col, Typography, Button, Input } from 'antd'
import AddTaskModal from '../../../components/taskModal'
import WorkCard from '../../../components/workCard'
import { createWorkApi, getWorksApi } from '../../../apis/tasks/task.api'
import type { IWork } from '../../../apis/tasks/work.interface'
import type { IProject } from '../../../apis/projects/project.interface'
import type { ITask } from '../../../apis/tasks/task.interface'

interface ProjectTaskTabProps {
  project: IProject
  works: IWork[]
  tasks: ITask[]
  onAddTask: (values: any) => Promise<any>
  showAddTask: boolean
  setShowAddTask: (show: boolean) => void
  taskLoading: boolean
  onSuccess?: () => void
}

const ProjectTaskTab: React.FC<ProjectTaskTabProps> = ({
  project,
  works: worksProp,
  tasks: tasksProp,
  onAddTask,
  showAddTask,
  setShowAddTask,
  taskLoading,
  onSuccess,
}) => {
  const [works, setWorks] = React.useState<IWork[]>(worksProp)
  const [tasks, setTasks] = React.useState<ITask[]>(tasksProp)
  const [showAddWork, setShowAddWork] = React.useState(false)
  const [addWorkLoading, setAddWorkLoading] = React.useState(false)
  const [addWorkName, setAddWorkName] = React.useState('')
  const [currentWorkId, setCurrentWorkId] = React.useState<string | number | null>(null)

  React.useEffect(() => {
    setWorks(worksProp)
  }, [worksProp])
  React.useEffect(() => {
    setTasks(tasksProp)
  }, [tasksProp])

  const handleAddTask = async (values: any) => {
    const result: any = await onAddTask({ ...values, workId: currentWorkId })
    if (currentWorkId && result && result.id) {
      setTasks((prev) => [...prev, { ...result, workId: currentWorkId }])
    }
  }

  const handleAddWork = async () => {
    if (!addWorkName.trim()) return
    setAddWorkLoading(true)
    try {
      await createWorkApi({
        name: addWorkName,
        projectId: project.id,
      })
      const worksFromApi = await getWorksApi(project.id)
      setWorks(worksFromApi as IWork[])
      setShowAddWork(false)
      setAddWorkName('')
    } finally {
      setAddWorkLoading(false)
    }
  }

  // Group tasks by workId
  const tasksByWork: Record<string, ITask[]> = React.useMemo(() => {
    const map: Record<string, ITask[]> = {}
    tasks.forEach((t) => {
      if (!t.workId) return
      if (!map[t.workId]) map[t.workId] = []
      map[t.workId].push(t)
    })
    return map
  }, [tasks])

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div style={{ marginTop: 32, marginBottom: 0 }}>
        {works && works.length > 0 ? (
          <Row
            gutter={[12, 0]}
            wrap={false}
            style={{
              flex: 1,
              minHeight: 0,
              height: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              flexWrap: 'nowrap',
              marginBottom: 0,
            }}
          >
            {works.map((work: IWork) => (
              <Col
                flex="0 0 280px"
                key={work.id}
                style={{ minWidth: 280, maxWidth: 280, height: '100%' }}
              >
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                  }}
                >
                  <WorkCard
                    name={work.name}
                    tasks={tasksByWork[work.id as string] || []}
                    workId={work.id}
                    onAddTask={(workId) => {
                      setCurrentWorkId(workId)
                      setShowAddTask(true)
                    }}
                  />
                </div>
              </Col>
            ))}
            <Col
              flex="0 0 280px"
              key="add-work"
              style={{ minWidth: 280, maxWidth: 280, height: '100%' }}
            >
              {showAddWork ? (
                <div
                  style={{
                    background: '#18191c',
                    borderRadius: 10,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                >
                  <Input
                    placeholder="Nhập tên danh sách..."
                    value={addWorkName}
                    onChange={(e) => setAddWorkName(e.target.value)}
                    autoFocus
                    onPressEnter={handleAddWork}
                    disabled={addWorkLoading}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                      type="primary"
                      onClick={handleAddWork}
                      loading={addWorkLoading}
                      disabled={!addWorkName.trim()}
                    >
                      Thêm danh sách
                    </Button>
                    <Button
                      danger
                      type="text"
                      style={{ fontSize: 22, lineHeight: 1, padding: 0 }}
                      onClick={() => {
                        setShowAddWork(false)
                        setAddWorkName('')
                      }}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    border: '2px dashed',
                    borderRadius: '10px',
                    padding: '10px',
                    minHeight: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                  onClick={() => setShowAddWork(true)}
                >
                  + Thêm work
                </div>
              )}
            </Col>
          </Row>
        ) : (
          <Typography.Text type="secondary">Chưa có công việc nào</Typography.Text>
        )}
      </div>
      <AddTaskModal
        open={showAddTask}
        onClose={() => {
          setShowAddTask(false)
          setCurrentWorkId(null)
        }}
        onSuccess={onSuccess}
        onFinish={handleAddTask}
        membersOptions={project.members?.map((m: any) => ({ label: m.name, value: m.id })) || []}
        loading={taskLoading}
        workId={currentWorkId}
      />
    </div>
  )
}

export default ProjectTaskTab
