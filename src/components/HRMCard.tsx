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
  theme,
}) => {
  useTheme() // chỉ để trigger re-render khi theme đổi, không dùng themeColors nữa

  return (
    <Card
      title={title}
      style={{
        borderRadius: 16,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
        ...style,
      }}
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
      className={className}
      headStyle={{ fontWeight: 600, fontSize: 18 }}
    >
      <p style={{ marginBottom: 12 }}>{description}</p>
      <Progress percent={progressPercent} showInfo={false} strokeColor={progressColor} />
      <div className={`text-right font-bold ${highlightClass || ''}`}>{value}</div>
    </Card>
  )
}

export default HRMCard
