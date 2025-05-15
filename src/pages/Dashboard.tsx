import HRMCard from '../components/HRMCard'
import BaseCard from '../components/BaseCard'
import { useState, useEffect } from 'react'
import BaseButton from '../components/BaseButton'
import { PlusOutlined } from '@ant-design/icons'

const MOBILE_WIDTH = 1007

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_WIDTH)

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
        top: 108.5,
        right: 32,
        zIndex: 999,
        display: 'flex',
        gap: 8,
      }}
    >
      <BaseButton type="primary" icon={<PlusOutlined />}>
        Create New Project
      </BaseButton>
      <BaseButton type="primary" className="border-none bg-yellow-400 text-black">
        Create New Team
      </BaseButton>
    </div>
  )

  return (
    <div>
      {ActionButtons}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
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
              <>
                Working on <span className="text-blue-400">0</span> projects
              </>
            ),
            progressPercent: 0,
            progressColor: '#69c0ff',
          },
          {
            title: 'Total Task Done',
            value: 0,
            description: (
              <>
                <span className="text-green-400">0</span> Tasks are left
              </>
            ),
            progressPercent: 0,
            progressColor: '#95de64',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            style={{
              minWidth: isMobile ? 170 : 220,
              maxWidth: isMobile ? '100%' : '100%',
              margin: '5px 0',
              boxSizing: 'border-box',
              display: 'flex',
            }}
          >
            <HRMCard {...card} style={{ width: '100%' }} />
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
      </div>

      {/* Thẻ f section */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: 10,
          justifyContent: 'flex-start',
          overflowX: 'hidden',
        }}
      >
        {[1, 2, 3, 4, 6, 5, 7, 8].map((i) => (
          <BaseCard
            key={i}
            style={{
              minWidth: 0,
              margin: '5px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p className="text-white">f</p>
            <p className="text-white">f</p>
            <small className="text-gray-400">Updated 22 hours ago</small>
          </BaseCard>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
