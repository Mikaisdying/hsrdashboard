import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Avatar,
  Button,
  Divider,
  Row,
  Col,
  Space,
  Skeleton,
  Tag,
  Descriptions,
  Tabs,
} from 'antd'
import {
  UserOutlined,
  UserAddOutlined,
  LinkOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { getProjectById } from '../../../apis/projects/project.api'
import { createTaskApi } from '../../../apis/tasks/task.api'
import type { IProject } from '../../../apis/projects/project.interface'
import ProjectTaskTab from './projectTaskTab'
import ProjectMemberTab from './projectMemberTab'

const { Title, Paragraph, Text } = Typography

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

  if (loading || !project) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Header*/}
      <Row align="middle" justify="space-between" style={{ marginBottom: 24 }}>
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
            <Button type="primary" icon={<UserAddOutlined />}>
              Mời thành viên
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 24 }}
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
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <TeamOutlined /> Thành viên
            </span>
          }
          key="members"
        >
          <ProjectMemberTab project={project} />
        </Tabs.TabPane>
      </Tabs>
      {/* Thông tin dự án */}
      <Descriptions
        title="Thông tin dự án"
        column={1}
        size="small"
        bordered
        style={{ marginBottom: 16 }}
      >
        <Descriptions.Item label="Mã dự án">{project.code}</Descriptions.Item>
        <Descriptions.Item label="Ngày bắt đầu">{project.createdDate}</Descriptions.Item>
        <Descriptions.Item label="Ngày kết thúc">{project.endDate}</Descriptions.Item>
        <Descriptions.Item label="Ngân sách">
          {project.budget?.toLocaleString()} VND
        </Descriptions.Item>
        <Descriptions.Item label="Liên kết">
          {project.link && project.link.length > 0 && project.link.some((l) => l) ? (
            <Space direction="vertical">
              {project.link.filter(Boolean).map((l, idx) => (
                <a key={idx} href={l} target="_blank" rel="noopener noreferrer">
                  <LinkOutlined /> {l}
                </a>
              ))}
            </Space>
          ) : (
            <Text type="secondary">Không có</Text>
          )}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginBottom: 24 }}>
        <Title level={5}>
          <UserOutlined /> Quản lý dự án
        </Title>
        <Space>
          <Avatar src={project.pm?.avatar} />
          <span>{project.pm?.name}</span>
          <Text type="secondary">{project.pm?.email}</Text>
        </Space>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
