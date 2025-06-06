import React from 'react'
import { Typography, Avatar, List, Tag, Space, Descriptions } from 'antd'
import { LinkOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { IProject } from '../../../apis/projects/project.interface'

const { Title } = Typography

interface ProjectMemberTabProps {
  project: IProject
}

const ProjectMemberTab: React.FC<ProjectMemberTabProps> = ({ project }) => {
  return (
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
                    {member.email && (
                      <Typography.Paragraph type="secondary">{member.email}</Typography.Paragraph>
                    )}
                    {member.role && <Tag>{member.role}</Tag>}
                    {member.job && <Tag color="blue">{member.job}</Tag>}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Typography.Paragraph type="secondary">Chưa có thành viên</Typography.Paragraph>
      )}
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
            <Typography.Paragraph type="secondary">Không có</Typography.Paragraph>
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
          <Typography.Paragraph type="secondary">{project.pm?.email}</Typography.Paragraph>
        </Space>
      </div>
    </div>
  )
}

export default ProjectMemberTab
