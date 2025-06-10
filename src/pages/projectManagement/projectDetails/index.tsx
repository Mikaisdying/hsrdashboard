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
  Tabs,
  Modal,
  Input,
} from 'antd'
import {
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {
  getProjectDetailApi,
  updateProjectDescriptionApi,
} from '../../../apis/projects/project.api'
import {} from '../../../components/createTaskModal'
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
  const [editDescModalOpen, setEditDescModalOpen] = useState(false)
  const [descLoading, setDescLoading] = useState(false)
  const [descValue, setDescValue] = useState('')

  const fetchDetail = async () => {
    if (!id) return
    setLoading(true)
    try {
      const detail = await getProjectDetailApi(id)
      setProject({ ...detail.project, members: detail.members })
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

  const handleOpenEditDesc = () => {
    if (project) setDescValue(project.description)
    setEditDescModalOpen(true)
  }

  const handleSaveDesc = async () => {
    if (!project) return
    setDescLoading(true)
    try {
      await updateProjectDescriptionApi(project.id, descValue)
      setEditDescModalOpen(false)
      fetchDetail()
    } finally {
      setDescLoading(false)
    }
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
            <Paragraph
              type="secondary"
              style={{ marginBottom: 0, display: 'flex', alignItems: 'center' }}
            >
              <span>{project.description}</span>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                style={{ marginLeft: 8 }}
                onClick={handleOpenEditDesc}
              />
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
          items={[
            {
              key: 'tasks',
              label: (
                <span>
                  <UnorderedListOutlined /> Công việc
                </span>
              ),
              children: (
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
                    showAddTask={showAddTask}
                    setShowAddTask={setShowAddTask}
                    taskLoading={taskLoading}
                    setTaskLoading={setTaskLoading}
                    onSuccess={fetchDetail}
                  />
                </div>
              ),
            },
            {
              key: 'members',
              label: (
                <span>
                  <TeamOutlined /> Thông tin
                </span>
              ),
              children: <ProjectMemberTab project={project} fetchDetail={fetchDetail} />,
            },
          ]}
        />
      </div>
      <AddMemberModal
        open={showAddMember}
        onClose={() => setShowAddMember(false)}
        onSuccess={handleAddMemberSuccess}
        projectId={project.id}
        fetchDetail={fetchDetail}
      />
      <Modal
        open={editDescModalOpen}
        title="Sửa mô tả dự án"
        onCancel={() => setEditDescModalOpen(false)}
        onOk={handleSaveDesc}
        confirmLoading={descLoading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input.TextArea
          rows={4}
          value={descValue}
          onChange={(e) => setDescValue(e.target.value)}
          placeholder="Nhập mô tả mới cho dự án"
        />
      </Modal>
    </div>
  )
}

export default ProjectDetailsPage
