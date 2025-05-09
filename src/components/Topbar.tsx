import React, { useState } from 'react'
import { Layout, Input, Avatar, Space, Badge, Button } from 'antd'
import { BellOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const mockUser = {
  name: 'John Doe',
  img: 'https://i.pravatar.cc/150?img=3',
}

const Topbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [notificationCount] = useState(2)
  const [chatCount] = useState(1)

  return (
    <Header
      style={{
        background: '#141414',
        padding: '0 16px',
        height: 64,
        lineHeight: '64px',
        width: '100%',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
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
        {/* Search bar co giãn, icon luôn bên phải */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <Input.Search
            placeholder="Search"
            style={{
              width: '100%',
              maxWidth: 300,
              borderRadius: 24,
              margin: '0 auto',
              minWidth: 120,
            }}
          />
        </div>
        <Space size="large" style={{ marginLeft: 16, flexShrink: 0 }}>
          {currentUser ? (
            <>
              <Badge count={chatCount} size="small">
                <MessageOutlined style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }} />
              </Badge>
              <Badge count={notificationCount} size="small">
                <BellOutlined style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }} />
              </Badge>
              <Avatar
                src={currentUser.img}
                alt={currentUser.name}
                style={{ marginLeft: 8, cursor: 'pointer' }}
              >
                {currentUser.name.charAt(0)}
              </Avatar>
            </>
          ) : (
            <Button
              icon={<UserOutlined />}
              style={{
                borderRadius: 24,
                borderColor: '#1890ff',
                color: '#1890ff',
                background: 'transparent',
                boxShadow: 'none',
                outline: 'none',
                border: 'none',
              }}
              onClick={() => setCurrentUser(mockUser)}
            >
              Sign In
            </Button>
          )}
        </Space>
      </div>
    </Header>
  )
}

export default Topbar
