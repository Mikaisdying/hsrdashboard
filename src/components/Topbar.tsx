import React, { useState } from 'react'
import { Layout, Input, Avatar, Space, Badge, Button } from 'antd'
import { BellOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const mockUser = {
  name: 'John Doe',
  img: 'https://i.pravatar.cc/150?img=3',
}

const styles = {
  header: {
    background: '#141414',
    padding: '0 16px',
    height: 64,
    lineHeight: '64px',
    width: '100%',
    boxSizing: 'border-box' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative' as const,
  },
  searchWrapper: {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 300,
    minWidth: 120,
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    borderRadius: 24,
    background: '#23272f',
    color: '#fff',
    border: 'none',
    paddingLeft: 24,
    paddingRight: 24,
  },
  rightSection: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 8,
    cursor: 'pointer',
    background: '#7265e6',
  },
  signInButton: {
    borderRadius: 24,
    color: '#1890ff',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
  },
}

const UserActions = ({
  user,
  onSignIn,
}: {
  user: typeof mockUser | null
  onSignIn: () => void
}) => {
  const notificationCount = 2
  const chatCount = 1

  if (user) {
    return (
      <>
        <Badge count={chatCount} size="small" offset={[0, 4]}>
          <MessageOutlined style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }} />
        </Badge>
        <Badge count={notificationCount} size="small" offset={[0, 4]}>
          <BellOutlined style={{ color: '#fff', fontSize: 20, cursor: 'pointer' }} />
        </Badge>
        <Avatar src={user.img} alt={user.name} style={styles.avatar}>
          {user.name.charAt(0)}
        </Avatar>
      </>
    )
  }

  return (
    <Button icon={<UserOutlined />} style={styles.signInButton} onClick={onSignIn}>
      Sign In
    </Button>
  )
}

const Topbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<typeof mockUser | null>(mockUser)

  return (
    <Header style={styles.header}>
      <div style={styles.container}>
        {/* Centered Search */}
        <div style={styles.searchWrapper}>
          <Input.Search
            placeholder="Search"
            allowClear
            style={styles.searchInput}
            className="rounded-full border-none text-white"
          />
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <Space size="large">
            <UserActions user={currentUser} onSignIn={() => setCurrentUser(mockUser)} />
          </Space>
        </div>
      </div>
    </Header>
  )
}

export default Topbar
