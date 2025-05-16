import React, { useState, useRef, useEffect } from 'react'
import { Avatar, Button, Input } from 'antd'
import { ArrowLeftOutlined, PaperClipOutlined, SendOutlined, DownOutlined } from '@ant-design/icons'
import { useTheme } from '../../theme/ThemeContext'

interface ChatContainerProps {
  contact: { name: string; img: string }
  onBack: () => void
}

const ChatContainer: React.FC<ChatContainerProps> = ({ contact, onBack }) => {
  const { theme } = useTheme()
  const [messages, setMessages] = useState([
    { type: 'received', text: 'Hello! How can I help you?', time: 'Today at 12:40' },
    { type: 'sent', text: 'Hi! I have a question.', time: 'Today at 12:41' },
    { type: 'received', text: 'Sure, go ahead!', time: 'Today at 12:42' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
  ])
  const [input, setInput] = useState('')

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const chatRef = useRef<HTMLDivElement | null>(null)
  const [atBottom, setAtBottom] = useState(true)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  useEffect(() => {
    const chatDiv = chatRef.current
    if (!chatDiv) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatDiv
      const isBottom = scrollHeight - scrollTop - clientHeight < 10
      setAtBottom(isBottom)
      if (isBottom) setHasNewMessage(false)
    }

    chatDiv.addEventListener('scroll', handleScroll)
    return () => chatDiv.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (atBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setHasNewMessage(true)
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      {
        type: 'sent',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInput('')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 12,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* TopBar */}
      <div
        style={{
          height: 64,
          borderBottom: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 2,
        }}
      >
        <ArrowLeftOutlined
          style={{ fontSize: 20, marginRight: 8, cursor: 'pointer' }}
          onClick={onBack}
        />
        <Avatar src={contact.img} size={46} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{contact.name}</span>
          <span style={{ fontSize: 12 }}>Online</span>
        </div>
      </div>
      {/* Chat - scrollable */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          background: theme === 'dark' ? '#181a20' : '#f7f7f7',
          position: 'relative',
        }}
      >
        {messages.map((msg, idx) =>
          msg.type === 'received' ? (
            <div
              key={idx}
              style={{
                margin: '16px 0 0 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  background: theme === 'dark' ? '#23272f' : '#e6e6e6',
                  color: theme === 'dark' ? '#fff' : '#23272f',
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
            <div
              key={idx}
              style={{
                margin: '16px 0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
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
        <div ref={bottomRef} />
        {/* Nút scroll xuống đáy sticky trong vùng chat */}
        {!atBottom && (
          <div
            style={{
              position: 'sticky',
              bottom: 16,
              display: 'flex',
              justifyContent: 'flex-end',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <Button
              type="text"
              shape="circle"
              onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                pointerEvents: 'auto',
                marginRight: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                background: hasNewMessage ? '#13c2c2' : 'rgba(0,0,0,0.3)',
                border: 'none',
                transition: 'background 0.2s',
              }}
              icon={
                <DownOutlined
                  style={{
                    fontSize: 20,
                    color: '#fff',
                  }}
                />
              }
            />
          </div>
        )}
      </div>
      {/* Footer fixed */}
      <div
        style={{
          height: 64,
          borderTop: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 10,
          position: 'sticky',
          bottom: 0,
          zIndex: 2,
        }}
      >
        <Button type="text" icon={<PaperClipOutlined style={{ fontSize: 20 }} />} />
        <Input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          style={{
            borderRadius: 12,
            background: theme === 'dark' ? '#23272f' : '#f5f5f5',
            color: theme === 'dark' ? '#fff' : '#23272f',
            border: 'none',
            flex: 1,
            marginRight: 8,
          }}
        />
        <Button type="text" icon={<SendOutlined style={{ fontSize: 22 }} />} onClick={handleSend} />
      </div>
    </div>
  )
}

export default ChatContainer
