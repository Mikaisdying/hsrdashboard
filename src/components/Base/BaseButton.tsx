import React from 'react'
import { Button, type ButtonProps } from 'antd'
import { useTheme } from '../../theme/ThemeContext'

export type BaseButtonType =
  | 'primary'
  | 'default'
  | 'dashed'
  | 'text'
  | 'link'
  | 'cancel'
  | 'success'
  | 'danger'
  | 'warning'

interface BaseButtonProps extends Omit<ButtonProps, 'type'> {
  icon?: React.ReactNode
  type?: BaseButtonType
}

const BaseButton: React.FC<BaseButtonProps> = ({ style, icon, children, ...props }) => {
  const { type, ...restProps } = props
  const { primaryColor } = useTheme()

  return (
    <Button
      {...restProps}
      icon={icon}
      type={
        type === 'cancel' || type === 'success' || type === 'danger' || type === 'warning'
          ? undefined
          : type
      }
      style={{
        borderRadius: 8,
        fontWeight: 400,
        ...(type === 'primary' && { background: primaryColor, color: '#fff', border: 'none' }),
        ...(type === 'success' && { background: '#52c41a', color: '#fff', border: 'none' }),
        ...(type === 'danger' && { background: '#ff4d4f', color: '#fff', border: 'none' }),
        ...(type === 'warning' && { background: '#faad14', color: '#fff', border: 'none' }),
        ...style,
      }}
    >
      {children}
    </Button>
  )
}

export default BaseButton
