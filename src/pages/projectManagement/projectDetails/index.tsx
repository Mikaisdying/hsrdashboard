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
  List,
} from 'antd'
import {
  UserOutlined,
  UserAddOutlined,
  LinkOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { getProjectById } from '../../../apis/projects/project.api'
import type { IProject } from '../../../apis/projects/project.interface'
import TaskCard from '../../../components/taskCard'

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

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getProjectById(id)
      .then(setProject)
      .finally(() => setLoading(false))
  }, [id])

  if (loading || !project) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  return (
    <div>
      {/* Header: Tên, mô tả, trạng thái, mời thành viên */}
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
      <Row gutter={24}>
        {/* Left: Danh sách TaskCard */}
        <Col flex={6}>
          <Title level={5} style={{ marginBottom: 16 }}>
            <UnorderedListOutlined /> Danh sách công việc
          </Title>
          {project.tasks && project.tasks.length > 0 ? (
            <Row gutter={[16, 16]}>
              {project.tasks.map((task) => (
                <Col span={12} key={task.id}>
                  <TaskCard title={task.name} description={task.description} />
                </Col>
              ))}
            </Row>
          ) : (
            <Text type="secondary">Chưa có công việc nào</Text>
          )}
        </Col>
        <Col>
          <Divider type="vertical" style={{ height: '100%' }} />
        </Col>
        {/* Right: Thông tin dự án, PM, Thành viên */}
        <Col flex={2}>
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
          <div>
            <Title level={5}>
              <TeamOutlined /> Thành viên
            </Title>
            {project.members && project.members.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={project.members}
                renderItem={(member) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={member.avatar} />}
                      title={member.name}
                      description={
                        <Space>
                          {member.email && <Text type="secondary">{member.email}</Text>}
                          {member.role && <Tag>{member.role}</Tag>}
                          {member.job && <Tag color="blue">{member.job}</Tag>}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Text type="secondary">Chưa có thành viên</Text>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProjectDetailsPage
