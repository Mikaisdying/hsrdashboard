import { Drawer, Button, Switch } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import type { ReactNode, FC } from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

interface MainLayoutProps {
  children: ReactNode
}

const MOBILE_WIDTH = 1007
const SIDEBAR_WIDTH = 240

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_WIDTH)
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= MOBILE_WIDTH)
  const { theme, setTheme } = useTheme()
  const color = themeColors[theme]

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_WIDTH
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  // Sidebar rendering for desktop
  const renderDesktopSidebar = () =>
    !isMobile &&
    sidebarOpen && (
      <div
        style={{
          width: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          background: color.sidebarBg,
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 2001,
          transition: 'all 0.2s',
          boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Sidebar onNavigate={() => {}} />
        <div style={{ padding: 16, marginTop: 'auto' }}>
          <Switch
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
      </div>
    )

  // Sidebar toggle button for desktop
  const renderDesktopSidebarToggle = () => {
    if (isMobile) return null
    return (
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: 24, color: color.icon }} />}
        onClick={() => setSidebarOpen((v) => !v)}
        style={{
          position: 'fixed',
          top: 16,
          left: sidebarOpen ? SIDEBAR_WIDTH + 16 : 16,
          zIndex: 2100,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          transition: 'left 0.2s',
        }}
      />
    )
  }

  // Sidebar rendering for mobile (Drawer)
  const renderMobileSidebar = () =>
    isMobile && (
      <>
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setSidebarOpen(false)}
          open={sidebarOpen}
          width={SIDEBAR_WIDTH}
          mask={true}
          maskClosable={true}
          style={{ position: 'relative', height: '100vh' }}
          styles={{
            body: { padding: 0, background: color.sidebarBg, height: '100vh' },
            header: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '8px 16px',
              background: color.sidebarBg,
              borderBottom: 'none',
              minHeight: 56,
            },
          }}
          title={
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 24, color: color.icon }} />}
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                marginRight: -8,
              }}
            />
          }
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
          <div style={{ padding: 16, marginTop: 'auto' }}>
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </Drawer>
        {!sidebarOpen && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: color.icon }} />}
            onClick={() => setSidebarOpen(true)}
            style={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 2100,
              background: 'transparent',
              border: 'none',
            }}
          />
        )}
      </>
    )

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: color.contentBg }}>
      {renderDesktopSidebar()}
      {renderDesktopSidebarToggle()}
      {renderMobileSidebar()}
      <div
        style={{
          marginLeft: !isMobile && sidebarOpen ? SIDEBAR_WIDTH : 0,
          transition: 'margin-left 0.2s',
          overflowX: 'hidden',
          paddingTop: 64, 
        }}
      >
        <div style={{
          position: 'relative',
          zIndex: isMobile ? 1000 : 2000,
        }}>
          <Topbar />
        </div>
        <main style={{ padding: 24, minHeight: 280 }}>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
