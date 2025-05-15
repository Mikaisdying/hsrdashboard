import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
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
  const location = useLocation()
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

  // Determine the selected key based on current location
  const selectedKey = menuItems.find((item) => location.pathname === item.key)
    ? location.pathname
    : menuItems.find((item) => location.pathname.startsWith(item.key))?.key || '/'

  return (
    <div
      className="flex h-screen w-full flex-col"
      style={{
        background: color.background,
        borderRight: color.border,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="p-4 text-xl font-bold"
        style={{
          color: color.text,
          letterSpacing: 2,
          fontSize: 28,
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        VEXA
      </div>
      <Menu
        theme={theme}
        mode="inline"
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          height: '100%',
          background: color.background,
          border: 'none',
          padding: '12px 0',
        }}
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}

export default Sidebar
