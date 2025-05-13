import { Card, Progress } from 'antd'
import type { ReactNode, FC } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

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
  theme,
}) => {
  const { theme: contextTheme } = useTheme()
  const currentTheme = theme || contextTheme
  const color = themeColors[currentTheme]

  return (
    <Card
      title={title}
      style={{
        background: color.cardBg,
        color: color.cardText,
        border: color.cardBorder,
        borderRadius: 12,
        ...style,
      }}
      styles={{
        header: {
          background: color.cardHeadBg,
          color: color.cardHeadText,
          border: color.cardBorder,
          borderRadius: 12,
        },
        body: {
          color: color.cardBodyText,
          border: color.cardBodyBorder,
          borderRadius: 12,
        },
      }}
      className={className}
    >
      <p>{description}</p>
      <Progress percent={progressPercent} showInfo={false} strokeColor={progressColor} />
      <div className={`text-right font-bold ${highlightClass || ''}`}>{value}</div>
    </Card>
  )
}

export default HRMCard
