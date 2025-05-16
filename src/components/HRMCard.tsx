import { Card, Progress } from 'antd'
import type { ReactNode, FC } from 'react'
import { useTheme } from '../theme/ThemeContext'

interface HRMCardProps {
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

const HRMCard: FC<HRMCardProps> = ({
  title,
  value,
  description,
  progressPercent,
  progressColor,
  highlightClass,
  style,
  className,
}) => {
  useTheme()

  return (
    <Card
      title={title}
      style={{
        borderRadius: 16,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
        ...style,
      }}
      className={`bg-secondary text-textPrimary border-border dark:bg-secondary dark:text-textPrimary dark:border-border rounded-2xl border ${className || ''} `}
      headStyle={{ fontWeight: 600, fontSize: 18 }}
      styles={{
        header: {
          borderRadius: 16,
          fontWeight: 600,
          fontSize: 18,
          padding: '16px 20px',
        },
        body: {
          borderRadius: 16,
          padding: 18,
        },
      }}
    >
      <p className="text-cardBodyText dark:text-dark-cardBodyText mb-3">{description}</p>
      <Progress percent={progressPercent} showInfo={false} strokeColor={progressColor} />
      <div className={`text-right font-bold ${highlightClass || ''}`}>{value}</div>
    </Card>
  )
}

export default HRMCard
