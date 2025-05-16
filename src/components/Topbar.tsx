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
  const [chatOpen, setChatOpen] = useState(false)
  const [notiOpen, setNotiOpen] = useState(false)

  return (
    <Header
      className="bg-secondary border-border z-[2000] m-2.5 box-border flex items-center rounded-[18px] border-b"
      style={{
        padding: '0 24px',
        height: 64,
        lineHeight: '64px',
        width: '98%',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.19)',
        display: 'flex',
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
            icon={<MenuOutlined className="text-icon text-2xl" />}
            onClick={onSidebarToggle}
            className="mr-4 flex items-center border-none bg-transparent shadow-none"
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
            prefix={<SearchOutlined className="text-icon mr-1.5 text-lg" />}
            className={`topbar-search-input topbar-search-${theme} bg-searchBg text-searchColor h-10 rounded-full border-none px-5 shadow`}
            style={{
              width: '100%',
              transition: 'all 0.2s',
            }}
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
                  className="text-icon cursor-pointer text-[22px] transition-colors"
                  onClick={() => setChatOpen((open) => !open)}
                />
              </Badge>
              <Badge count={notificationCount} size="small">
                <BellOutlined
                  className="text-icon cursor-pointer text-[22px] transition-colors"
                  onClick={() => setNotiOpen((open) => !open)}
                />
              </Badge>
              <Avatar
                src={currentUser.img}
                alt={currentUser.name}
                className="bg-avatarBg text-text border-border ml-3 cursor-pointer border-2 shadow"
              >
                {currentUser.name.charAt(0)}
              </Avatar>
            </>
          ) : (
            <Button
              icon={<UserOutlined />}
              className="rounded-full border-none bg-transparent text-[#1890ff] shadow-none"
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
