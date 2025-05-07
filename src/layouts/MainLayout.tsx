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

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_WIDTH)
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_WIDTH)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) setDrawerVisible(false)
  }, [isMobile])

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      {!isMobile ? (
        <aside className="flex w-[64px] min-w-[64px] flex-col bg-[#1f1f1f]">
          <Sidebar />
        </aside>
      ) : (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: 'white', fontSize: 24 }} />}
            onClick={() => setDrawerVisible(true)}
            style={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1100,
              background: 'rgba(31,31,31,0.8)',
              border: 'none',
            }}
          />
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={240}
          >
            <Sidebar onNavigate={() => setDrawerVisible(false)} />
          </Drawer>
        </>
      )}

      {/* Main area: Topbar + Content */}
      <div className="w-full min-w-0 flex-1 flex-col overflow-auto">
        <Topbar />
        <main className="flex-1" style={{ padding: 24, minHeight: 280 }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
