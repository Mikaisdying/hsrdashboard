import { ProLayout, PageContainer } from '@ant-design/pro-components'
import { useTheme } from '../common/theme/ThemeContext'
import routes from '../routes/appRoutes'
import { Switch } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const iconStyle = { fontSize: 16 }
const switchBaseStyle = (theme: string) => ({
  marginRight: 20,
  background: theme === 'dark' ? '#0a0630' : '#e6f7f7',
  border: 'none',
  minWidth: 50,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 999,
  boxShadow: theme === 'dark' ? '0 0 4px #222' : '0 0 4px #b2f0f0',
  transition: 'background 0.3s',
})

const MainLayout: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const menuData = routes.map(({ path, label, icon }) => ({ path, name: label, icon }))

  const iconSpan = (icon: any, align: 'flex-start' | 'flex-end', color: string) => (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: align,
        width: 15,
        height: 15,
        paddingLeft: align === 'flex-start' ? 2 : 0,
        paddingRight: align === 'flex-end' ? 2 : 0,
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ ...iconStyle, color }} />
    </span>
  )

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
      navTheme={theme === 'dark' ? 'realDark' : 'light'}
      actionsRender={() => [
        <Switch
          key="theme-switch"
          checked={theme === 'dark'}
          checkedChildren={iconSpan(faMoon, 'flex-end', '#faad04')}
          unCheckedChildren={iconSpan(faSun, 'flex-start', '#ffcd57')}
          onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          style={switchBaseStyle(theme)}
        />,
      ]}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
}

export default MainLayout
