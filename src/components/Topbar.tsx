import React, { useState } from 'react'
import { Layout, Input, Avatar, Space, Badge, Button, Modal } from 'antd'
import { BellOutlined, MessageOutlined, UserOutlined, ArrowLeftOutlined, PaperClipOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'
import ChatModal from './ChatModal'

const { Header } = Layout

const mockUser = {
  name: 'John Doe',
  img: 'https://i.pravatar.cc/150?img=3',
}

const Topbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [notificationCount] = useState(2)
  const [chatCount] = useState(1)
  const { theme } = useTheme()
  const color = themeColors[theme]
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <Header
      style={{
        background: color.headerBg,
        padding: '0 16px',
        height: 64,
        lineHeight: '64px',
        width: '100%',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        borderBottom: color.border,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search"
            allowClear
            prefix={<SearchOutlined style={{ color: color.icon, fontSize: 18, marginRight: 6 }} />}
            style={{
              width: '100%',
              minWidth: 100,
              maxWidth: 500,
              borderRadius: 32,
              margin: '0 auto',
              background: color.searchBg,
              color: color.searchColor,
              border: 'none',
              paddingLeft: 20,
              paddingRight: 20,
              height: 40,
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
            }}
            className={`topbar-search-input topbar-search-${theme}`}
          />
          <style>
            {`
              .topbar-search-dark input::placeholder {
                color: #aaa !important;
              }
              .topbar-search-light input::placeholder {
                color: #23272f !important;
              }
            `}
          </style>
        </div>
        <Space size="large" style={{ marginLeft: 16, flexShrink: 0 }}>
          {currentUser ? (
            <>
              <Badge count={chatCount} size="small">
                <MessageOutlined
                  style={{ color: color.icon, fontSize: 20, cursor: 'pointer' }}
                  onClick={() => setChatOpen(open => !open)}
                />
              </Badge>
              <Badge count={notificationCount} size="small">
                <BellOutlined style={{ color: color.icon, fontSize: 20, cursor: 'pointer' }} />
              </Badge>
              <Avatar
                src={currentUser.img}
                alt={currentUser.name}
                style={{ marginLeft: 8, cursor: 'pointer', background: color.avatarBg, color: color.text }}
              >
                {currentUser.name.charAt(0)}
              </Avatar>
            </>
          ) : (
            <Button
              icon={<UserOutlined />}
              style={{
                borderRadius: 24,
                color: '#1890ff',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
              }}
              onClick={() => setCurrentUser(mockUser)}
            >
              Sign In
            </Button>
          )}
        </Space>
      </div>
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </Header>
  )
}

export default Topbar
