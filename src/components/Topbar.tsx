import { Layout, Input, Avatar, Space, Badge } from 'antd'
import { BellOutlined, MessageOutlined } from '@ant-design/icons'

const { Header } = Layout

const Topbar = () => (
  <Header
    style={{
      background: '#141414',
      padding: '0 16px',
      height: 64,
      maxHeight: 64,
      lineHeight: '64px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
    }}
  >
    <div className="flex h-full items-center justify-between">
      <Input.Search placeholder="Search" style={{ width: 300 }} />
      <Space size="large">
        <MessageOutlined className="text-xl text-white" />
        <div className="relative inline-block">
          <Avatar src="https://i.pravatar.cc/150?img=3" />
          <Badge
            count={2}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              transform: 'translate(50%, 50%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </Space>
    </div>
  </Header>
)

export default Topbar
