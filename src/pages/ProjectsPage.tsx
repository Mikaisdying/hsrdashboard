import React, { useState } from 'react'
import { Button, Card, Spin } from 'antd'
import AddNewProject from '../components/AddNewProject'
import { PlusOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

const mockProjects = [
  {
    id: 1,
    title: 'Website Redesign',
    desc: 'Redesign the company website',
    status: 'Working',
    updatedAt: '2024-06-01',
  },
  {
    id: 2,
    title: 'Mobile App',
    desc: 'Build a mobile app',
    status: 'Completed',
    updatedAt: '2024-05-28',
  },
  {
    id: 3,
    title: 'Testing Automation',
    desc: 'Automate QA',
    status: 'Working',
    updatedAt: '2024-05-30',
  },
]

const statuses = [
  { status: 'Working', icon: <span style={{ color: '#7265e6' }}>●</span> },
  { status: 'Completed', icon: <span style={{ color: '#52c41a' }}>●</span> },
]

const getStatusColor = (color: any, type: 'secondary' | 'desc' | 'date') => {
  if (type === 'secondary') return color.textSecondary
  if (type === 'desc') return color.textDesc
  if (type === 'date') return color.textDate
  return color.textSecondary
}

const ProjectsPage: React.FC = () => {
  const [newProject, setNewProject] = useState(false)
  const [loading] = useState(false)
  const { theme } = useTheme()
  const color = themeColors[theme]

  return (
    <div style={{ width: '100%' }}>
      {newProject && <AddNewProject setNewProject={setNewProject} />}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setNewProject(true)}>
          New Project
        </Button>
      </div>
      {loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {statuses.map((s) => (
            <div key={s.status} style={{ flex: 1, minWidth: 260 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 8,
                  color: color.text,
                }}
              >
                {s.icon} {s.status}{' '}
                <span
                  style={{
                    color: getStatusColor(color, 'secondary'),
                    fontWeight: 400,
                    marginLeft: 8,
                  }}
                >
                  ({mockProjects.filter((item) => item.status === s.status).length})
                </span>
              </div>
              {mockProjects
                .filter((item) => item.status === s.status)
                .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                .map((item) => (
                  <Card
                    key={item.id}
                    style={{
                      marginBottom: 12,
                      borderRadius: 10,
                      background: color.headerBg,
                      color: color.text,
                    }}
                  >
                    <div style={{ fontWeight: 500, fontSize: 16 }}>{item.title}</div>
                    <div
                      style={{
                        color: getStatusColor(color, 'desc'),
                        fontSize: 14,
                      }}
                    >
                      {item.desc}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: getStatusColor(color, 'date'),
                        marginTop: 8,
                      }}
                    >
                      Updated {item.updatedAt}
                    </div>
                  </Card>
                ))}
              {s.status === 'Working' && (
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => setNewProject(true)}
                  style={{ marginTop: 8 }}
                >
                  New Project
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
