import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import routes from '../routes/appRoutes'
import type { FC } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

interface SidebarProps {
  onNavigate?: () => void
  className?: string
}

const Sidebar: FC<SidebarProps> = ({ onNavigate }) => {
  const navigate = useNavigate()
  const userRole = 'user'
  const { theme } = useTheme()
  const color = themeColors[theme]

  const menuItems = routes
    .filter((route) => route.role.includes(userRole))
    .map(({ key, icon, label }) => ({ key, icon, label }))

  const handleMenuClick = ({ key }: { key: string }) => {
    onNavigate?.()
    navigate(key)
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="p-4 text-xl font-bold" style={{ color: color.text }}>VEXA</div>
      <Menu
        theme={theme}
        mode="inline"
        onClick={handleMenuClick}
        items={menuItems}
        style={{ height: '100%', background: color.sidebarBg }}
      />
    </div>
  )
}

export default Sidebar
