import React from 'react'
import DashboardStatsCard from '../../components/DashboardStatsCard'
import { UserOutlined, TeamOutlined, ProjectOutlined } from '@ant-design/icons'
import { useTheme } from '../../theme/ThemeContext'
import { themeColors } from '../../theme/colors'

const stats = [
  {
    title: 'Total Employees',
    value: 120,
    description: <>Active employees in the company</>,
    progressPercent: 80,
    progressColor: '#7265e6',
    icon: <UserOutlined />,
  },
  {
    title: 'Teams',
    value: 8,
    description: <>Active teams</>,
    progressPercent: 60,
    progressColor: '#1890ff',
    icon: <TeamOutlined />,
  },
  {
    title: 'Projects',
    value: 15,
    description: <>Ongoing projects</>,
    progressPercent: 50,
    progressColor: '#52c41a',
    icon: <ProjectOutlined />,
  },
]

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, color: color.text, marginBottom: 24 }}>
        Admin Dashboard
      </h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        {stats.map((stat, idx) => (
          <DashboardStatsCard
            key={idx}
            {...stat}
            theme={theme}
            style={{ minWidth: 220, flex: '1 1 220px' }}
          />
        ))}
      </div>
      {/* Add more admin widgets here */}
    </div>
  )
}

export default AdminDashboard
