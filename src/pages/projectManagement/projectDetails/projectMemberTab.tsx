import React from 'react'
import { Typography, Avatar, List, Tag, Space } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
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
    </div>
  )
}

export default ProjectMemberTab
