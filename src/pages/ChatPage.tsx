import React, { useState } from 'react'
import ChatContact from '../components/ChatContact'
import ChatContainer from '../components/ChatContainer'
import { useTheme } from '../theme/ThemeContext'

const ChatPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<{ name: string; img: string } | null>(null)
  useTheme()

  return (
    <div className="bg-secondary mx-auto flex min-h-[540px] max-w-[1200px] gap-6 rounded-2xl p-5">
      <div className="w-[380px] max-w-[400px] min-w-[280px] flex-shrink-0">
        <ChatContact onSelectContact={(contact) => setSelectedContact(contact)} />
      </div>
      <div className="min-w-0 flex-1">
        {selectedContact ? (
          <ChatContainer contact={selectedContact} onBack={() => setSelectedContact(null)} />
        ) : (
          <div className="bg-secondary flex h-[500px] items-center justify-center rounded-xl text-lg text-[#aaa]">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
