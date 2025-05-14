import { Modal } from 'antd'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'
import type { ReactNode, FC } from 'react'

interface BaseModalProps {
  open: boolean
  onClose: () => void
  width?: number | string
  children: ReactNode
  style?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  destroyOnClose?: boolean
  maskClosable?: boolean
  footer?: ReactNode
  closeIcon?: ReactNode
}

const BaseModal: FC<BaseModalProps> = ({
  open,
  onClose,
  width = 420,
  children,
  style,
  bodyStyle,
  destroyOnClose = true,
  maskClosable = true,
  footer = null,
  closeIcon = null,
}) => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={footer}
      width={width}
      style={{
        top: 80,
        right: 32,
        position: 'fixed',
        zIndex: 3000,
        background: color.headerBg,
        borderRadius: 16,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
        padding: 0,
        ...style,
      }}
      styles={{
        content: { padding: 0, borderRadius: 16, background: color.headerBg },
        body: {
          padding: 5,
          borderRadius: 16,
          minHeight: 200,
          background: color.headerBg,
          overflow: 'auto',
          transition: 'background 0.2s',
          ...bodyStyle,
        },
      }}
      closeIcon={closeIcon}
      mask={true}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
