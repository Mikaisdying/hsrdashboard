import React, { useState } from 'react'
import ChatContact from '../components/ChatContact'
import ChatContainer from '../components/ChatContainer'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

const ChatPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<{ name: string; img: string } | null>(null)
  const { theme } = useTheme()
  const color = themeColors[theme]

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '40px auto',
        padding: 20,
        display: 'flex',
        gap: 24,
        minHeight: 540,
        background: color.headerBg,
        borderRadius: 16,
      }}
      className="ant-modal-content"
    >
      <div style={{ width: 380, minWidth: 280, maxWidth: 400, flexShrink: 0 }}>
        <ChatContact onSelectContact={contact => setSelectedContact(contact)} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {selectedContact ? (
          <ChatContainer contact={selectedContact} onBack={() => setSelectedContact(null)} />
        ) : (
          <div
            style={{
              height: 500,
              borderRadius: 12,
              background: color.headerBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#aaa',
              fontSize: 18,
            }}
          >
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
