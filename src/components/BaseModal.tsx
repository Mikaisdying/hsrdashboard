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
  position?: 'center' | 'corner'
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
  position = 'center',
}) => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  const modalStyle: React.CSSProperties =
    position === 'corner'
      ? {
          top: 80,
          right: 32,
          position: 'fixed',
          zIndex: 3000,
          borderRadius: 12,
          background: color.headerBg,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          padding: 0,
          ...style,
        }
      : {
          background: color.headerBg,
          borderRadius: 12,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          padding: 0,
          ...style,
        }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={footer}
      width={width}
      style={modalStyle}
      styles={{
        body: {
          padding: 0,
          minHeight: 200,
          borderRadius: 12,
          background: color.headerBg,
          transition: 'background 0.2s',
          ...bodyStyle,
        },
        content: {
          padding: 0,
          borderRadius: 20,
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
