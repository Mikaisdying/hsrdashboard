import { ProLayout, PageContainer } from '@ant-design/pro-components'
import { Avatar, Popover, Divider, Modal } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import ThemeToggle from '../../common/theme/themeToggle'
import routes from '../../routes/appRoutes'
import { ProLayoutTokenContext } from '../../App'

const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const proLayoutToken = useContext(ProLayoutTokenContext)

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userName = user.fullName || user.email || 'Tài khoản'
  const userAvatar = user.avatar || undefined

  const handleLogout = () => {
    setPopoverOpen(false)
    setLogoutModalOpen(true)
  }

  const confirmLogout = async () => {
    setLogoutModalOpen(false)
    localStorage.removeItem('user')
    navigate('/auth')
  }

  function mapRoutesToMenuData(routes: any[]): any[] {
    return routes
      .filter((r) => r.label && !r.hidden)
      .map((r) => {
        const children = r.children?.length ? mapRoutesToMenuData(r.children) : undefined
        return {
          path: r.path,
          name: r.label,
          icon: r.icon,
          ...(children && { children }),
        }
      })
  }

  return (
    <ProLayout
      logo={'/logo.svg'}
      title={false}
      layout="mix"
      fixSiderbar
      location={{ pathname }}
      route={{ path: '/', routes: mapRoutesToMenuData(routes) }}
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar src={userAvatar} icon={!userAvatar && <UserOutlined />} />
                <span>{userName}</span>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  color: '#ff4d4f',
                  padding: '8px 0',
                }}
                onClick={handleLogout}
              >
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </div>
            </div>
          }
          trigger="click"
          placement="bottomRight"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
        >
          <Avatar
            size={'large'}
            src={userAvatar}
            icon={!userAvatar && <UserOutlined />}
            style={{ marginRight: 40 }}
          />
        </Popover>,
        <Modal
          key="logout-modal"
          open={logoutModalOpen}
          title="Xác nhận đăng xuất"
          onOk={confirmLogout}
          onCancel={() => setLogoutModalOpen(false)}
          okText="Đăng xuất"
          cancelText="Hủy"
          centered
        >
          Bạn có chắc chắn muốn đăng xuất?
        </Modal>,
      ]}
      menuFooterRender={() =>
        !collapsed && (
          <div
            style={{ padding: 15, display: 'flex', justifyContent: 'left', alignItems: 'center' }}
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
