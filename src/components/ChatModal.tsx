import React, { useState } from 'react'
import BaseModal from './Base/BaseModal'
import ChatContact from './ChatContact'
import ChatContainer from './ChatContainer'

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose }) => {
  const [selectedContact, setSelectedContact] = useState<null | { name: string; img: string }>(null)

  const handleClose = () => {
    setSelectedContact(null)
    onClose()
  }

  return (
    <BaseModal open={open} onClose={handleClose} width={420} position="corner">
      <div className="bg-secondary h-[420px] min-h-[320px] w-full rounded-2xl">
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
