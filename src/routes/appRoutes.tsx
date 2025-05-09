import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  // BulbOutlined,
  // LogoutOutlined,
} from '@ant-design/icons'
import Dashboard from '../pages/Dashboard'
import ProjectsPage from '../pages/ProjectsPage'
import YourWorksPage from '../pages/YourWorksPage.tsx'
import CommunityPage from '../pages/CommunityPage'
import ChatPage from '../pages/ChatPage'

const routes = [
  {
    path: '/',
    key: '/',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    element: <Dashboard />,
    breadcrumb: 'Dashboard',
    role: ['user', 'admin'],
  },
  {
    path: '/projects',
    key: '/projects',
    label: 'Projects',
    icon: <ProjectOutlined />,
    element: <ProjectsPage />,
    breadcrumb: 'Projects',
    role: ['user', 'admin'],
  },
  {
    path: '/your-works',
    key: '/your-works',
    label: 'Your Works',
    icon: <UserOutlined />,
    element: <YourWorksPage />,
    breadcrumb: 'Your Works',
    role: ['user'],
  },
  {
    path: '/community',
    key: '/community',
    label: 'Community',
    icon: <TeamOutlined />,
    element: <CommunityPage />,
    breadcrumb: 'Community',
    role: ['user', 'admin'],
  },
  {
    path: '/chat',
    key: '/chat',
    label: 'Chat',
    icon: <MessageOutlined />,
    element: <ChatPage />,
    breadcrumb: 'Chat',
    role: ['user', 'admin'],
  },
]

export default routes
