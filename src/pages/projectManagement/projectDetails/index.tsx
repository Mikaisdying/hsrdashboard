import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Avatar, Button, Divider, Row, Col, Space, Skeleton, Tag, Tabs } from 'antd'
import {
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { getProjectById, getProjectDetailApi } from '../../../apis/projects/project.api'
import { handleAddTask as addTaskModalHandleAddTask } from '../../../components/taskModal/addTaskModal'
import type { IProject } from '../../../apis/projects/project.interface'
import type { IWork } from '../../../apis/tasks/work.interface'
import type { ITask } from '../../../apis/tasks/task.interface'
import ProjectTaskTab from './projectTaskTab'
import ProjectMemberTab from './projectMemberTab'
import AddMemberModal from './addMemberModal'

const { Title, Paragraph } = Typography

const statusColor: Record<string, string> = {
  NEW: 'blue',
  ONGOING: 'gold',
  ARCHIVED: 'default',
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams()
  const [project, setProject] = useState<IProject | null>(null)
  const [works, setWorks] = useState<IWork[]>([])
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)
  const [taskLoading, setTaskLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('tasks')
  const [showAddMember, setShowAddMember] = useState(false)

  const fetchDetail = async () => {
    if (!id) return
    setLoading(true)
    try {
      const detail = await getProjectDetailApi(id)
      setProject(detail.project)
      setWorks(detail.works)
      setTasks(detail.tasks)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [id])

  const handleAddMemberSuccess = () => {
    setShowAddMember(false)
  }

  if (loading || !project) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  return (
    <div style={{}}>
      <div style={{ boxSizing: 'border-box', flexShrink: 0 }}>
        {/* Header*/}
        <Row align="middle" justify="space-between">
          <Col>
            <Space align="center">
              <Title level={2} style={{ marginBottom: 0 }}>
                {project.name}
              </Title>
              <Tag
                color={statusColor[project.status] || 'default'}
                style={{ marginLeft: 8, marginBottom: 4 }}
              >
                {project.status}
              </Tag>
            </Space>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {project.description}
            </Paragraph>
          </Col>
          <Col>
            <Space>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src={project.pm?.avatar}
                style={{ backgroundColor: '#1890ff' }}
              />
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => setShowAddMember(true)}
              >
                Mời thành viên
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginBottom: 24, height: '100%' }}
          tabBarStyle={{ margin: 0 }}
          size="large"
          items={undefined}
        >
          <Tabs.TabPane
            tab={
              <span>
                <UnorderedListOutlined /> Công việc
              </span>
            }
            key="tasks"
          >
            <div
              style={{
                minHeight: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ProjectTaskTab
                project={project}
                works={works}
                tasks={tasks}
                onAddTask={async (values: any) =>
                  addTaskModalHandleAddTask(
                    values,
                    project,
                    setTaskLoading,
                    setShowAddTask,
                    fetchDetail
                  )
                }
                onSuccess={fetchDetail}
                showAddTask={showAddTask}
                setShowAddTask={setShowAddTask}
                taskLoading={taskLoading}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <TeamOutlined /> Thông tin
              </span>
            }
            key="members"
          >
            <ProjectMemberTab project={project} />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <AddMemberModal
        open={showAddMember}
        onClose={() => setShowAddMember(false)}
        onSuccess={handleAddMemberSuccess}
      />
    </div>
  )
}

export default ProjectDetailsPage
