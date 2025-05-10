import HRMCard from './HRMCard'
import type { ReactNode, FC } from 'react'

interface DashboardStatsCardProps {
  title: string
  value: number
  description: ReactNode
  progressPercent: number
  progressColor: string
  highlightClass?: string
  style?: React.CSSProperties
  className?: string
  theme?: 'dark' | 'light'
}

const DashboardStatsCard: FC<DashboardStatsCardProps> = (props) => (
  <HRMCard {...props} />
)

export default DashboardStatsCard
