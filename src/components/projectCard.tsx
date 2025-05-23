import React from 'react'
import { Card, Avatar, Tooltip } from 'antd'
import dayjs from '../utils/days'

interface ProjectCardProps {
  title: string
  description: string
  updatedAt: string
  pmName: string
  pmAvatarUrl: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  updatedAt,
  pmName,
  pmAvatarUrl,
}) => (
  <Card
    variant="borderless"
    style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 180 }}
    title={<span style={{ fontWeight: 'bold' }}>{title}</span>}
  >
    <div style={{ flex: 1, marginBottom: 20 }}>{description}</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 12, color: '#888' }}>Cập nhật {dayjs(updatedAt).fromNow()}.</div>
      <Tooltip title={pmName}>
        <Avatar src={pmAvatarUrl} size={32} />
      </Tooltip>
    </div>
  </Card>
)

export default ProjectCard
