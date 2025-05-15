import React, { useState } from 'react'
import { Layout, Input, Avatar, Space, Badge, Button } from 'antd'
import {
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'
import { themeColors } from '../theme/colors'
import ChatModal from './ChatModal'
import NotificationModal from './Notification'

const { Header } = Layout

const mockUser = {
  name: 'John Doe',
  img: 'https://i.pravatar.cc/150?img=3',
}

interface TopbarProps {
  onSidebarToggle?: () => void
  sidebarOpen?: boolean
  isMobile?: boolean
}

const Topbar: React.FC<TopbarProps> = ({ onSidebarToggle, isMobile }) => {
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [notificationCount] = useState(2)
  const [chatCount] = useState(1)
  const { theme } = useTheme()
  const color = themeColors[theme]
  const [chatOpen, setChatOpen] = useState(false)
  const [notiOpen, setNotiOpen] = useState(false)

  return (
    <Header
      style={{
        background: color.sidebarBg,
        padding: '0 24px',
        height: 64,
        lineHeight: '64px',
        width: '98%',
        boxSizing: 'border-box',
        borderBottom: color.border,
        borderRadius: 18,
        margin: 10,
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.19)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Sidebar toggle button bên trái */}
        {onSidebarToggle && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: color.icon }} />}
            onClick={onSidebarToggle}
            style={{
              marginRight: 16,
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          />
        )}
        {/* Search input ở giữa topbar */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            maxWidth: isMobile ? '250px' : '600px',
            minWidth: 100,
            display: 'flex',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <Input
            placeholder="Search"
            allowClear
            prefix={<SearchOutlined style={{ color: color.icon, fontSize: 18, marginRight: 6 }} />}
            style={{
              width: '100%',
              borderRadius: 32,
              background: color.searchBg,
              color: color.searchColor,
              border: 'none',
              paddingLeft: 20,
              paddingRight: 20,
              height: 40,
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
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
        {/* ctct bên phải */}
        <Space size="large" style={{ marginLeft: 'auto', flexShrink: 0, zIndex: 3 }}>
          {currentUser ? (
            <>
              <Badge count={chatCount} size="small">
                <MessageOutlined
                  style={{
                    color: color.icon,
                    fontSize: 22,
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onClick={() => setChatOpen((open) => !open)}
                />
              </Badge>
              <Badge count={notificationCount} size="small">
                <BellOutlined
                  style={{
                    color: color.icon,
                    fontSize: 22,
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onClick={() => setNotiOpen((open) => !open)}
                />
              </Badge>
              <Avatar
                src={currentUser.img}
                alt={currentUser.name}
                style={{
                  marginLeft: 12,
                  cursor: 'pointer',
                  background: color.avatarBg,
                  color: color.text,
                  border: `2px solid ${color.border}`,
                  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.08)',
                }}
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
      <NotificationModal
        open={notiOpen}
        onClose={() => setNotiOpen(false)}
        currentUser={currentUser}
        notification={[
          { type: 'Team', message: 'You have been invited to join the HR Team.' },
          { type: 'Project', message: 'You have been assigned to Project X.' },
        ]}
      />
    </Header>
  )
}

export default Topbar
