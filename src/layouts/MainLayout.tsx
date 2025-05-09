import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import type { ReactNode, FC } from 'react'
import { useState, useEffect } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MOBILE_WIDTH = 1007
const SIDEBAR_WIDTH = 240

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_WIDTH)
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= MOBILE_WIDTH)

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
          background: '#1f1f1f',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 1000,
          transition: 'all 0.2s',
        }}
      >
        <Sidebar onNavigate={() => {}} />
      </div>
    )

  // Sidebar toggle button for desktop
  const renderDesktopSidebarToggle = () => {
    if (isMobile) return null
    return (
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: 24, color: '#fff' }} />}
        onClick={() => setSidebarOpen((v) => !v)}
        style={{
          position: 'fixed',
          top: 16,
          left: sidebarOpen ? SIDEBAR_WIDTH + 16 : 16,
          zIndex: 1100,
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
          bodyStyle={{ padding: 0, background: '#1f1f1f', height: '100vh' }}
          headerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '8px 16px',
            background: '#1f1f1f',
            borderBottom: 'none',
            minHeight: 56,
          }}
          title={
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 24, color: '#fff' }} />}
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
        </Drawer>
        {!sidebarOpen && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: '#fff' }} />}
            onClick={() => setSidebarOpen(true)}
            style={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1100,
              background: 'transparent',
              border: 'none',
            }}
          />
        )}
      </>
    )

  return (
    <div className="flex min-h-screen w-full">
      {renderDesktopSidebar()}
      {renderDesktopSidebarToggle()}
      {renderMobileSidebar()}
      {/* Main area: Topbar + Content */}
      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{
          marginLeft: !isMobile && sidebarOpen ? SIDEBAR_WIDTH : 0,
          transition: 'margin-left 0.2s',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Topbar />
        <main className="flex-1" style={{ padding: 24, minHeight: 280 }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
