import { Button, Card } from 'antd'
import HRMCard from '../components/HRMCard'
import { useState, useEffect } from 'react'

const MOBILE_WIDTH = 1007

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_WIDTH)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_WIDTH)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Nút action fixed trên cùng bên phải
  const ActionButtons = (
    <div
      style={{
        position: 'fixed',
        top: 80, // cách topbar một chút (topbar height 64px + 16px margin)
        right: 32,
        zIndex: 999,
        display: 'flex',
        gap: 8,
      }}
    >
      <Button type="primary" className="bg-purple-500">
        Create New Project
      </Button>
      <Button type="primary" className="border-none bg-yellow-400 text-black">
        Create New Team
      </Button>
    </div>
  )

  return (
    <div>
      {ActionButtons}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 24,
          width: '100%',
        }}
      >
        {[
          {
            title: 'Total Projects Done',
            value: 0,
            description: (
              <>Working on <span className="text-blue-400">0</span> projects</>
            ),
            progressPercent: 0,
            progressColor: '#69c0ff',
          },
          {
            title: 'Total Task Done',
            value: 0,
            description: (
              <><span className="text-green-400">0</span> Tasks are left</>
            ),
            progressPercent: 0,
            progressColor: '#95de64',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            style={{
              flex: isMobile ? '0 0 100%' : '1 1 25%',
              minWidth: isMobile ? 170 : 220,
              maxWidth: isMobile ? '100%' : '25%',
              margin: '5px 0',
              boxSizing: 'border-box',
              display: 'flex',
            }}
          >
            <HRMCard {...card} theme={theme} style={{ width: '100%' }} />
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
        {/* Xóa nút ở đây, đã fixed lên trên */}
      </div>

      {/* Thẻ f section */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'flex-start',
            overflowX: 'hidden',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              style={{
                flex: '1 1 100px',
                minWidth: 180,
                maxWidth: 300,
                margin: '5px 0',
              }}
            >
              <p className="text-white">f</p>
              <p className="text-white">f</p>
              <small className="text-gray-400">Updated 22 hours ago</small>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
