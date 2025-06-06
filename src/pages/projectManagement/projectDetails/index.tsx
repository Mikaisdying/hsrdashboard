import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Avatar, Button, Divider, Row, Col, Space, Skeleton, Tag, Tabs } from 'antd'
import {
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { getProjectById } from '../../../apis/projects/project.api'
import { createTaskApi } from '../../../apis/tasks/task.api'
import type { IProject } from '../../../apis/projects/project.interface'
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
  const [loading, setLoading] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)
  const [taskLoading, setTaskLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('tasks')
  const [showAddMember, setShowAddMember] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getProjectById(id)
      .then(setProject)
      .finally(() => setLoading(false))
  }, [id])

  const handleAddTask = async (values: any) => {
    if (!project) return
    setTaskLoading(true)
    await createTaskApi({
      name: values.name,
      description: values.description,
      deadline: values.deadline,
      assigneeIds: values.assignees,
      projectId: project.id,
    })
    setTaskLoading(false)
    setShowAddTask(false)
    setLoading(true)
    getProjectById(project.id)
      .then(setProject)
      .finally(() => setLoading(false))
  }

  const handleAddMemberSuccess = () => {
    setShowAddMember(false)
  }

  if (loading || !project) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  return (
    <div
      style={{
        minHeight: 0,
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
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
                onAddTask={handleAddTask}
                onSuccess={() => {
                  setLoading(true)
                  getProjectById(project.id)
                    .then(setProject)
                    .finally(() => setLoading(false))
                }}
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
