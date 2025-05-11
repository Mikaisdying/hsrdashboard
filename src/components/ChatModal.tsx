import React, { useState } from 'react'
import { Modal } from 'antd'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'
import ChatContact from './ChatContact'
import ChatContainer from './ChatContainer'

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose }) => {
  const { theme } = useTheme()
  const color = themeColors[theme]
  const [selectedContact, setSelectedContact] = useState<null | { name: string; img: string }>(null)

  // Reset về contact list khi đóng modal
  const handleClose = () => {
    setSelectedContact(null)
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={420}
      style={{
        top: 80,
        right: 32,
        position: 'fixed',
        zIndex: 3000,
        background: color.headerBg,
        borderRadius: 12,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
        padding: 0,
      }}
      styles={{
        content: {
          background: color.headerBg,
          borderRadius: 12,
          padding: 0,
        },
        body: {
          padding: 0,
          borderRadius: 12,
          minHeight: 500,
          background: color.headerBg,
          overflow: 'hidden',
          transition: 'background 0.2s',
        },
      }}
      closeIcon={null}
      destroyOnClose
      mask={true}
      maskClosable={true}
    >
      <div style={{ width: '100%', height: '100%' }}>
        {!selectedContact ? (
          <ChatContact onSelectContact={contact => setSelectedContact(contact)} />
        ) : (
          <ChatContainer contact={selectedContact} onBack={() => setSelectedContact(null)} />
        )}
      </div>
    </Modal>
  )
}

export default ChatModal
