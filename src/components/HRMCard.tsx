import { Card, Progress } from 'antd'
import type { ReactNode, FC } from 'react'

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

const getThemeStyle = (theme: 'dark' | 'light') => ({
  card: {
    background: theme === 'dark' ? '#23272f' : '#fff',
    color: theme === 'dark' ? '#fff' : '#23272f',
    border: 'none',
    borderRadius: 12,
  },
  head: {
    background: theme === 'dark' ? '#23272f' : '#fff',
    color: theme === 'dark' ? '#fff' : '#23272f',
    border: 'none',
    borderRadius: 12,
  },
  body: {
    color: theme === 'dark' ? '#fff' : '#23272f',
    border: 'none',
    borderRadius: 12,
  },
})

const HRMCard: FC<HRMCardProps> = ({
  title,
  value,
  description,
  progressPercent,
  progressColor,
  highlightClass,
  style,
  className,
  theme = 'dark',
}) => {
  const themeStyle = getThemeStyle(theme)
  return (
    <Card
      title={title}
      style={{ ...themeStyle.card, ...style }}
      styles={{ header: themeStyle.head, body: themeStyle.body }}
      className={className}
    >
      <p>{description}</p>
      <Progress percent={progressPercent} showInfo={false} strokeColor={progressColor} />
      <div className={`text-right font-bold ${highlightClass || ''}`}>{value}</div>
    </Card>
  )
}

export default HRMCard
