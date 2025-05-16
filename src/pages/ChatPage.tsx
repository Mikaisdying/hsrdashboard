import React, { useState } from 'react'
import ChatContact from '../views/ChatBox/ChatContact'
import ChatContainer from '../views/ChatBox/ChatContainer'
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
        margin: 'auto',
        padding: 20,
        display: 'flex',
        gap: 24,
        minHeight: 540,
        background: color.background,
        borderRadius: 16,
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          width: 380,
          minWidth: 280,
          maxWidth: 400,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          height: 600,
        }}
      >
        <ChatContact onSelectContact={(contact) => setSelectedContact(contact)} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: 600 }}>
        {selectedContact ? (
          <ChatContainer contact={selectedContact} onBack={() => setSelectedContact(null)} />
        ) : (
          <div
            style={{
              height: '100%',
              borderRadius: 12,
              background: color.background,
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
