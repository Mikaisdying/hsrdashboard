import React from 'react'
import { Row, Col } from 'antd'
import AddTaskModal from '../../../components/taskModal'
import WorkCard from '../../../components/workCard'
import AddWorkButton from '../../../components/AddWorkButton'
import { createWorkApi, getWorksApi } from '../../../apis/tasks/task.api'
import type { IWork } from '../../../apis/tasks/work.interface'
import type { IProject } from '../../../apis/projects/project.interface'
import type { ITask } from '../../../apis/tasks/task.interface'
import AddWorkForm from '../../../components/AddWorkForm'

interface ProjectTaskTabProps {
  project: IProject
  works: IWork[]
  tasks: ITask[]
  showAddTask: boolean
  setShowAddTask: (show: boolean) => void
  taskLoading: boolean
  setTaskLoading: React.Dispatch<React.SetStateAction<boolean>>
  onSuccess?: () => void
}

const ProjectTaskTab: React.FC<ProjectTaskTabProps> = ({
  project,
  works: worksProp,
  tasks: tasksProp,
  showAddTask,
  setShowAddTask,
  taskLoading,
  setTaskLoading,
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
                    onDeleted={onSuccess}
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
                <AddWorkForm
                  value={addWorkName}
                  loading={addWorkLoading}
                  onChange={setAddWorkName}
                  onAdd={handleAddWork}
                  onCancel={() => {
                    setShowAddWork(false)
                    setAddWorkName('')
                  }}
                />
              ) : (
                <AddWorkButton onClick={() => setShowAddWork(true)} />
              )}
            </Col>
          </Row>
        ) : showAddWork ? (
          <div style={{ maxWidth: 280, margin: '0 auto' }}>
            <AddWorkForm
              value={addWorkName}
              loading={addWorkLoading}
              onChange={setAddWorkName}
              onAdd={handleAddWork}
              onCancel={() => {
                setShowAddWork(false)
                setAddWorkName('')
              }}
            />
          </div>
        ) : (
          <AddWorkButton onClick={() => setShowAddWork(true)} />
        )}
      </div>
      <AddTaskModal
        open={showAddTask}
        onClose={() => {
          setShowAddTask(false)
          setCurrentWorkId(null)
        }}
        onSuccess={onSuccess}
        membersOptions={project.members?.map((m: any) => ({ label: m.name, value: m.id })) || []}
        loading={taskLoading}
        setTaskLoading={setTaskLoading}
        workId={currentWorkId}
        project={project}
        fetchDetail={onSuccess || (() => {})}
      />
    </div>
  )
}

export default ProjectTaskTab
