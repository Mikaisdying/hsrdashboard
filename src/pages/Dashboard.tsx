import { Button, Card } from 'antd'
import DashboardStatsCard from '../components/DashboardStatsCard'
import { useState, useEffect } from 'react'

const MOBILE_WIDTH = 1007

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_WIDTH)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_WIDTH)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <div className="mb-6 flex flex-row items-stretch gap-x-[5px]">
        <div className={isMobile ? 'w-[170px] max-w-[170px] min-w-[170px]' : 'max-w-[25%] flex-1'}>
          <DashboardStatsCard
            title="Total Projects Done"
            value={0}
            description={
              <>
                Working on <span className="text-blue-400">0</span> projects
              </>
            }
            progressPercent={0}
            progressColor="#69c0ff"
          />
        </div>
        <div className={isMobile ? 'w-[170px] max-w-[170px] min-w-[170px]' : 'max-w-[25%] flex-1'}>
          <DashboardStatsCard
            title="Total Task Done"
            value={0}
            description={
              <>
                <span className="text-green-400">0</span> Tasks are left
              </>
            }
            progressPercent={0}
            progressColor="#95de64"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
        <div className="space-x-2">
          <Button type="primary" className="bg-purple-500">
            Create New Project
          </Button>
          <Button type="primary" className="border-none bg-yellow-400 text-black">
            Create New Team
          </Button>
        </div>
      </div>

      <Card className="w-full">
        <p className="text-white">f</p>
        <p className="text-white">f</p>
        <small className="text-gray-400">Updated 22 hours ago</small>
      </Card>
    </div>
  )
}

export default Dashboard
