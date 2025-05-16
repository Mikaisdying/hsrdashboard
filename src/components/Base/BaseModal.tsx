import { Modal } from 'antd'
import { useTheme } from '../../theme/ThemeContext'
import type { ReactNode, FC } from 'react'

interface BaseModalProps {
  open: boolean
  onClose: () => void
  width?: number | string
  children: ReactNode
  style?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  destroyOnHidden?: boolean
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
  destroyOnHidden = true,
  maskClosable = true,
  footer = null,
  closeIcon = null,
  position = 'center',
}) => {
  const { theme } = useTheme()

  const modalStyle: React.CSSProperties =
    position === 'corner'
      ? {
          top: 80,
          right: 32,
          position: 'fixed',
          zIndex: 3000,
          borderRadius: 12,
          padding: 0,
          ...style,
        }
      : {
          borderRadius: 12,
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
      destroyOnHidden={destroyOnHidden}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
