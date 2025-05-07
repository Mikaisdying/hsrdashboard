import { Drawer, Button } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
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
      if (!mobile) setSidebarOpen(true)
      else setSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) setSidebarOpen(true)
    else setSidebarOpen(false)
  }, [isMobile])

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar for desktop */}
      {!isMobile && sidebarOpen && (
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
      )}
      {/* Sidebar toggle button for desktop */}
      {!isMobile && (
        <Button
          type="text"
          icon={
            sidebarOpen ? (
              <CloseOutlined style={{ fontSize: 24 }} />
            ) : (
              <MenuOutlined style={{ fontSize: 24 }} />
            )
          }
          onClick={() => setSidebarOpen((v) => !v)}
          style={{
            position: 'fixed',
            top: 16,
            left: sidebarOpen ? SIDEBAR_WIDTH + 16 : 16,
            zIndex: 1100,
            background: 'rgba(31,31,31,0.8)',
            border: 'none',
            transition: 'left 0.2s',
          }}
        />
      )}
      {/* Drawer for mobile */}
      {isMobile && (
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
            headerStyle={{ display: 'none' }}
          >
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
            {sidebarOpen && (
              <Button
                type="text"
                icon={<CloseOutlined style={{ fontSize: 24 }} />}
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 1200,
                  background: 'rgba(31,31,31,0.8)',
                  border: 'none',
                }}
              />
            )}
          </Drawer>
          {!sidebarOpen && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 24 }} />}
              onClick={() => setSidebarOpen(true)}
              style={{
                position: 'fixed',
                top: 16,
                left: 16,
                zIndex: 1100,
                background: 'rgba(31,31,31,0.8)',
                border: 'none',
              }}
            />
          )}
        </>
      )}
      {/* Main area: Topbar + Content */}
      <div
        className="flex min-w-0 flex-1 flex-col overflow-auto"
        style={{
          marginLeft: !isMobile && sidebarOpen ? SIDEBAR_WIDTH : 0,
          transition: 'margin-left 0.2s',
          width: '100%',
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
