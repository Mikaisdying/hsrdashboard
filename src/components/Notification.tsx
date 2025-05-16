import React from 'react'
import { Avatar } from 'antd'
import { useTheme } from '../theme/ThemeContext'
import BaseModal from './Base/BaseModal'

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
  useTheme() // chỉ để trigger re-render khi theme đổi

  return (
    <BaseModal position="corner" open={open} onClose={onClose} width={360}>
      <div
        style={{
          width: '100%',
          minWidth: 300,
          maxWidth: 400,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '10px 0',
          borderRadius: 16,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            margin: '8px 0 18px 18px',
            letterSpacing: 1,
          }}
        >
          Notifications
        </div>
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
          }}
        >
          {notification.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: 10,
                padding: '8px 18px',
                alignItems: 'center',
                borderBottom: idx !== notification.length - 1 ? `1px solid #eee` : 'none',
              }}
            >
              <Avatar src={currentUser.img} style={{ width: 32, height: 32 }}>
                {currentUser.name.charAt(0)}
              </Avatar>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: 0,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 500 }}>{item.type} invitation</div>
                <div style={{ fontSize: 13, fontWeight: 400 }}>{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  )
}

export default NotificationModal
