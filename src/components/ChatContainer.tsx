import React, { useState } from 'react'
import { Avatar, Button, Input } from 'antd'
import { ArrowLeftOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'

interface ChatContainerProps {
  contact: { name: string; img: string }
  onBack: () => void
}

const ChatContainer: React.FC<ChatContainerProps> = ({ contact, onBack }) => {
  const { theme } = useTheme()
  const color = themeColors[theme]
  const [messages] = useState([
    { type: 'received', text: 'Hello! How can I help you?', time: 'Today at 12:40' },
    { type: 'sent', text: 'Hi! I have a question.', time: 'Today at 12:41' },
    { type: 'received', text: 'Sure, go ahead!', time: 'Today at 12:42' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
  ])
  const [input, setInput] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {/* TopBar */}
      <div
        style={{
          height: 64,
          borderBottom: `1px solid ${color.border === 'none' ? '#222' : color.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
          background: color.headerBg, // fix: header bg theo theme
        }}
      >
        <ArrowLeftOutlined
          style={{ fontSize: 20, marginRight: 8, cursor: 'pointer', color: color.icon }}
          onClick={onBack}
        />
        <Avatar src={contact.img} size={46} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 16, color: color.text }}>{contact.name}</span>
          <span style={{ fontSize: 12, color: color.text }}>Online</span>
        </div>
      </div>
      {/* Chat */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          background: theme === 'dark' ? '#181a20' : '#f7f7f7',
        }}
      >
        {messages.map((msg, idx) =>
          msg.type === 'received' ? (
            <div key={idx} style={{ margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div
                style={{
                  background: theme === 'dark' ? '#23272f' : '#e6e6e6',
                  color: color.text,
                  borderRadius: 12,
                  padding: '12px 16px',
                  maxWidth: '70%',
                  boxShadow: '0 0 6px rgba(0,0,0,0.2)',
                  fontSize: 14,
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: 12, color: '#aaa', marginLeft: 8 }}>{msg.time}</span>
            </div>
          ) : (
            <div key={idx} style={{ margin: '16px 0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div
                style={{
                  background: theme === 'dark' ? '#7265e6' : '#dbeafe',
                  color: theme === 'dark' ? '#fff' : '#23272f',
                  borderRadius: '12px 0 12px 12px',
                  padding: '12px 16px',
                  maxWidth: '70%',
                  boxShadow: '0 0 6px rgba(0,0,0,0.4)',
                  fontSize: 14,
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: 12, color: '#aaa', marginRight: 8 }}>{msg.time}</span>
            </div>
          )
        )}
      </div>
      {/* Send Message */}
      <div
        style={{
          minHeight: 64,
          borderTop: `1px solid ${color.border === 'none' ? '#222' : color.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 10,
          background: color.headerBg,
        }}
      >
        <Button type="text" icon={<PaperClipOutlined />} style={{ color: color.icon, fontSize: 20 }} />
        <Input
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            borderRadius: 12,
            background: theme === 'dark' ? '#23272f' : '#f5f5f5',
            color: color.text,
            border: 'none',
            flex: 1,
            marginRight: 8,
          }}
        />
        <Button type="text" icon={<SendOutlined />} style={{ color: color.icon, fontSize: 22 }} />
      </div>
    </div>
  )
}

export default ChatContainer
