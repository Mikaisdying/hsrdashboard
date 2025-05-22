import { ProLayout, PageContainer } from '@ant-design/pro-components'
import { Avatar, Popover, Button } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import ThemeToggle from '../../common/theme/themeToggle'
import routes from '../../routes/appRoutes'
import { ProLayoutTokenContext } from '../../App'

const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const proLayoutToken = useContext(ProLayoutTokenContext)

  const handleLogout = () => {
    setPopoverOpen(false)
    // navigate('/login')
  }

  const mapRoutesToMenuData = (routes: any[]): any[] =>
    routes
      .filter((r) => r.label && !r.hidden)
      .map(({ path, label, icon, children }) => ({
        path,
        name: label,
        icon,
        ...(children?.length && { children: mapRoutesToMenuData(children) }),
      }))

  const menuData = mapRoutesToMenuData(routes)

  return (
    <ProLayout
      title="HRM Dashboard"
      layout="mix"
      fixSiderbar
      location={{ pathname }}
      route={{ path: '/', routes: menuData }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => item.path !== pathname && navigate(item.path!)}
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
      token={proLayoutToken}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
}

export default MainLayout
