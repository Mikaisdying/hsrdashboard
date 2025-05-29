import React from 'react'
import { Card, Avatar, Tooltip } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
dayjs.extend(relativeTime)
dayjs.locale('vi')

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
    title={
      <span style={{ fontWeight: 'bold' }}>
        {title?.trim() ? title : 'Dự án chưa có tên chính thức'}
      </span>
    }
  >
    <div style={{ flex: 1, marginBottom: 20 }}>
      {description?.trim() ? description : 'Chưa có mô tả chung'}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 12, color: '#888' }}>
        Cập nhật {dayjs(updatedAt).locale('vi').fromNow()}.
      </div>
      <Tooltip title={pmName}>
        <Avatar
          src={
            pmAvatarUrl?.trim()
              ? pmAvatarUrl
              : 'https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png'
          }
          size={32}
        />
      </Tooltip>
    </div>
  </Card>
)

export default ProjectCard
