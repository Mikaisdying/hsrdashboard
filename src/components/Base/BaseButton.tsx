import React from 'react'
import { Button, type ButtonProps } from 'antd'
interface BaseButtonProps extends ButtonProps {
  icon?: React.ReactNode
}

const BaseButton: React.FC<BaseButtonProps> = ({ className = '', icon, children, ...props }) => {
  return (
    <Button
      {...props}
      icon={icon}
      className={`bg-secondary text-text border-border dark:bg-secondary dark:text-text dark:border-border rounded-lg font-normal shadow-sm ${className} `}
      style={{
        boxShadow: '0 1px 4px 0 rgba(8, 5, 5, 0.14)',
        ...props.style,
      }}
    >
      {children}
    </Button>
  )
}

export default BaseButton
