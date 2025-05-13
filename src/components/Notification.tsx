import React from 'react'
import { Modal, Avatar } from 'antd'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

interface NotificationItem {
  type: string
  message: string
}

interface NotificationModalProps {
  open: boolean
  onClose: () => void
  currentUser: { name: string; img: string }
  notification: NotificationItem[]
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
  currentUser,
  notification,
}) => {
  const { theme } = useTheme()
  const color = themeColors[theme]

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={360}
      style={{
        top: 72,
        right: 32,
        position: 'fixed',
        zIndex: 3000,
        padding: 0,
      }}
      bodyStyle={{
        padding: 0,
        borderRadius: 12,
        minHeight: 200,
        background: color.headerBg,
        overflow: 'hidden',
        transition: 'background 0.2s',
      }}
      closeIcon={null}
      mask={true}
      maskClosable={true}
      destroyOnClose
    >
      <div
        style={{
          width: '100%',
          minWidth: 300,
          maxWidth: 400,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '6px 2px',
          background: color.headerBg,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: color.text,
            margin: '4px 0 12px 12px',
          }}
        >
          Notifications
        </div>
        {notification.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: 10,
              padding: '4px 12px 0 12px',
            }}
          >
            <Avatar
              src={currentUser.img}
              style={{ width: 32, height: 32 }}
            >
              {currentUser.name.charAt(0)}
            </Avatar>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: 0,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500, color: color.text }}>
                {item.type} invitation
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, color: color.text + '99' }}>
                {item.message}
              </div>
              <hr
                style={{
                  background: color.border + '99',
                  border: 'none',
                  width: '100%',
                  height: 1,
                  marginTop: 4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default NotificationModal
