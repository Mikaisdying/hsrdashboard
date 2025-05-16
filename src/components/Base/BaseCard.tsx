import { Card } from 'antd'
import type { ReactNode, FC } from 'react'

interface BaseCardProps {
  title?: ReactNode
  children?: ReactNode
  style?: React.CSSProperties
  className?: string
  extra?: ReactNode
  highlightBorder?: string
}

const BaseCard: FC<BaseCardProps> = ({
  title,
  children,
  style,
  className,
  extra,
  highlightBorder,
}) => {
  return (
    <Card
      title={title}
      extra={extra}
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
        paddingLeft: highlightBorder ? 0 : undefined,
        display: 'flex',
        ...style,
      }}
      className={className}
      styles={{
        body: {
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
        header: {
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 16,
        },
      }}
    >
      {highlightBorder ? (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
          <div
            style={{
              width: 6,
              minWidth: 6,
              borderRadius: '8px 0 0 8px',
              background: highlightBorder,
              marginRight: 12,
            }}
          />
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      ) : (
        children
      )}
    </Card>
  )
}

export default BaseCard
