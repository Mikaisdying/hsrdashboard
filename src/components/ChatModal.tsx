import React, { useState } from 'react'
import BaseModal from './BaseModal'
import ChatContact from './ChatContact'
import ChatContainer from './ChatContainer'

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose }) => {
  const [selectedContact, setSelectedContact] = useState<null | { name: string; img: string }>(null)

  // Reset về contact list khi đóng modal
  const handleClose = () => {
    setSelectedContact(null)
    onClose()
  }

  return (
    <BaseModal open={open} onClose={handleClose} width={420}>
      <div
        style={{
          width: '100%',
          height: 420,
          minHeight: 320,
          borderRadius: 16,
          overflow: 'auto',
          background: 'inherit',
        }}
      >
        {!selectedContact ? (
          <ChatContact onSelectContact={(contact) => setSelectedContact(contact)} />
        ) : (
          <ChatContainer contact={selectedContact} onBack={() => setSelectedContact(null)} />
        )}
      </div>
    </BaseModal>
  )
}

export default ChatModal
