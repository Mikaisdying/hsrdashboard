import React from 'react'
import { Avatar } from 'antd'
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
  return (
    <BaseModal position="corner" open={open} onClose={onClose} width={360}>
      <div className="bg-background relative flex h-[400px] w-full max-w-[400px] min-w-[300px] flex-col rounded-2xl py-2.5">
        <div className="text-text my-2 ml-4 text-[22px] font-semibold tracking-wide">
          Notifications
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {notification.map((item, idx) => (
            <div
              key={idx}
              className={`border-border flex items-center gap-2.5 border-b px-4 py-2 ${idx === notification.length - 1 ? '!border-b-0' : ''}`}
            >
              <Avatar src={currentUser.img} style={{ width: 32, height: 32 }}>
                {currentUser.name.charAt(0)}
              </Avatar>
              <div className="flex w-full flex-col gap-0.5 p-0">
                <div className="text-text text-[15px] font-medium">{item.type} invitation</div>
                <div className="text-text/60 text-[13px] font-normal">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  )
}

export default NotificationModal
