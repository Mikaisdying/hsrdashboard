import { Card, Progress } from 'antd'
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
}

const cardStyle = {
  background: '#23272f',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
}

const headStyle = {
  background: '#23272f',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
}

const bodyStyle = {
  color: '#fff',
  border: 'none',
  borderRadius: 12,
}

const DashboardStatsCard: FC<DashboardStatsCardProps> = ({
  title,
  value,
  description,
  progressPercent,
  progressColor,
  highlightClass,
  style,
  className,
}) => (
  <Card
    title={title}
    style={{ ...cardStyle, ...style }}
    headStyle={headStyle}
    bodyStyle={bodyStyle}
    className={className}
  >
    <p>{description}</p>
    <Progress percent={progressPercent} showInfo={false} strokeColor={progressColor} />
    <div className={`text-right font-bold ${highlightClass || ''}`}>{value}</div>
  </Card>
)

export default DashboardStatsCard
