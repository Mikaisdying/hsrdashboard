import { ProLayout, PageContainer } from '@ant-design/pro-components'
import routes from '../../routes/appRoutes'
import { Avatar, Popover, Button } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import React from 'react'
import ThemeToggle from '../../common/theme/themeToggle'
import { UserOutlined } from '@ant-design/icons'

const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)

  const handleLogout = () => {
    setPopoverOpen(false)
    // Ví dụ: navigate('/login')
  }

  const menuData = routes.map(({ path, label, icon }) => ({ path, name: label, icon }))

  return (
    <ProLayout
      title="HRM Dashboard"
      layout="mix"
      fixSiderbar
      location={{ pathname }}
      route={{ path: '/', routes: menuData }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            if (item.path && item.path !== pathname) navigate(item.path)
          }}
          style={{ color: 'inherit' }}
        >
          {dom}
        </a>
      )}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      actionsRender={() => [
        <Popover
          key="avatar-popover"
          content={
            <Button type="primary" danger block onClick={handleLogout}>
              Đăng xuất
            </Button>
          }
          trigger="click"
          placement="bottomRight"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
        >
          <Avatar
            size="default"
            style={{
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={<UserOutlined />}
          />
        </Popover>,
      ]}
      menuFooterRender={() =>
        !collapsed && (
          <div
            style={{
              padding: 15,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <ThemeToggle />
          </div>
        )
      }
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
}

export default MainLayout
