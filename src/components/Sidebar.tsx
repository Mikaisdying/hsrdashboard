import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import routes from '../routes/appRoutes'
import type { FC } from 'react'
import { useTheme } from '../theme/ThemeContext'

interface SidebarProps {
  onNavigate?: () => void
  className?: string
}

const Sidebar: FC<SidebarProps> = ({ onNavigate }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const userRole = 'user'
  useTheme()

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
    <div className="bg-secondary border-border flex h-screen w-full flex-col rounded-tr-[18px] rounded-br-[18px] border-r shadow">
      <div
        className="text-text p-4 text-xl font-bold"
        style={{
          letterSpacing: 2,
          fontSize: 28,
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        VEXA
      </div>
      <Menu
        theme="light"
        mode="inline"
        onClick={handleMenuClick}
        items={menuItems}
        className="bg-secondary border-none py-3"
        style={{
          height: '100%',
        }}
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}

export default Sidebar
