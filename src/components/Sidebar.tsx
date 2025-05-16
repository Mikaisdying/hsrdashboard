import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import routes from '../routes/appRoutes'
import type { FC } from 'react'
import { useTheme } from '../theme/ThemeContext'
import Logo from '../assets/logo.svg'

interface SidebarProps {
  onNavigate?: () => void
  className?: string
}

const Sidebar: FC<SidebarProps> = ({ onNavigate }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const userRole = 'user'
  const { theme } = useTheme()

  const menuItems = routes
    .filter((route) => route.role.includes(userRole))
    .map(({ key, icon, label }) => ({ key, icon, label }))

  const handleMenuClick = ({ key }: { key: string }) => {
    onNavigate?.()
    navigate(key)
  }

  const selectedKey = menuItems.find((item) => location.pathname === item.key)
    ? location.pathname
    : menuItems.find((item) => location.pathname.startsWith(item.key))?.key || '/'

  return (
    <div className="bg-background flex h-screen w-full flex-col shadow-[2px_0_8px_rgba(0,0,0,0.06)]">
      <div
        className="flex items-center justify-center p-4"
        style={{
          marginBottom: 8,
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          width={50}
          height={55}
          style={{ display: 'block', margin: '0 auto', marginTop: 20 }}
        />
      </div>
      <Menu
        theme={theme}
        mode="inline"
        onClick={handleMenuClick}
        items={menuItems}
        className="custom-sidebar-menu"
        style={{
          height: '100%',
          border: 'none',
          padding: '12px 0',
        }}
        selectedKeys={[selectedKey]}
      />
    </div>
  )
}

export default Sidebar
