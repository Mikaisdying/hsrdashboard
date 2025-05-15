import React from 'react'
import { Button, type ButtonProps } from 'antd'
import { useTheme } from '../../theme/ThemeContext'
import { themeColors } from '../../theme/colors'

interface BaseButtonProps extends ButtonProps {
  icon?: React.ReactNode
}

const BaseButton: React.FC<BaseButtonProps> = ({ style, icon, children, ...props }) => {
  const { themeColors: color } = useTheme()
  return (
    <Button
      {...props}
      icon={icon}
      style={{
        borderRadius: 8,
        fontWeight: 400,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
        border: color.border,
        background: props.type === 'primary' ? color.avatarBg : color.secondary,
        color: props.type === 'primary' ? '#fff' : color.text,
        ...style,
      }}
    >
      {children}
    </Button>
  )
}

export default BaseButton
