import React from 'react'
import { Avatar, Input } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import { useTheme } from '../../theme/ThemeContext'

const contacts = [
  {
    name: 'John Doe',
    img: 'https://i.pravatar.cc/150?img=3',
    lastMsg: 'Test message this is',
    time: '12:21 PM',
  },
  {
    name: 'Jane Smith',
    img: 'https://i.pravatar.cc/150?img=4',
    lastMsg: 'Hello there!',
    time: '11:10 AM',
  },
  {
    name: 'Alice',
    img: 'https://i.pravatar.cc/150?img=5',
    lastMsg: 'How are you?',
    time: '10:05 AM',
  },
  {
    name: 'Bob',
    img: 'https://i.pravatar.cc/150?img=6',
    lastMsg: 'See you soon!',
    time: '09:45 AM',
  },
]

interface ChatContactProps {
  onSelectContact: (contact: { name: string; img: string }) => void
}

const ChatContact: React.FC<ChatContactProps> = ({ onSelectContact }) => {
  const { theme } = useTheme()
  const borderColor = theme === 'dark' ? '#222' : '#e5e7eb'
  const contactBg = theme === 'dark' ? '#181a20' : '#fff'
  const contactText = theme === 'dark' ? '#fff' : '#23272f'
  const contactMsg = theme === 'dark' ? '#aaa' : '#888'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {/* TopBar */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
          position: 'sticky',
          zIndex: 2,
          margin: 10,
        }}
      >
        <Avatar src="https://i.pravatar.cc/150?img=3" size={46} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 16, color: contactText }}>
            <b>Messaging</b>
          </span>
        </div>
      </div>
      {/* SearchBar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          height: 56,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          position: 'sticky',
          bottom: 0,
          zIndex: 2,
        }}
      >
        <SearchOutlined style={{ fontSize: 20, color: contactText }} />
        <Input
          placeholder="Search messages"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 16,
            color: contactText,
            marginLeft: 16,
            flex: 1,
          }}
          className={`chat-search-input chat-search-${theme}`}
        />
        <style>
          {`
            .chat-search-dark::placeholder { color: #aaa !important; }
            .chat-search-light::placeholder { color: #888 !important; }
          `}
        </style>
      </div>
      {/* Contacts */}
      <div
        style={{
          height: 480, // 600 - 64 - 56
          overflowY: 'scroll',
          background: contactBg,
          borderBottomLeftRadius: 10,
        }}
      >
        {contacts.map((c) => (
          <div
            key={c.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 12px',
              cursor: 'pointer',
              borderBottom: `1px solid ${borderColor}`,
              transition: 'background 0.2s',
              background: contactBg,
            }}
            onClick={() => onSelectContact({ name: c.name, img: c.img })}
            tabIndex={0}
          >
            <Avatar src={c.img} size={46} icon={<UserOutlined />} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16, gap: 4 }}>
              <span style={{ fontWeight: 500, fontSize: 16, color: contactText }}>{c.name}</span>
              <span style={{ fontSize: 14, color: contactMsg }}>{c.lastMsg}</span>
            </div>
            <span style={{ fontSize: 12, color: contactMsg, marginLeft: 'auto' }}>{c.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatContact
