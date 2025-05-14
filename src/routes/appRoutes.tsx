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
import AdminDashboard from '../pages/Admin/AdminDashboard'
import AdminEmployees from '../pages/Admin/AdminEmployees'
import AdminTeams from '../pages/Admin/AdminTeams'
import AdminProjects from '../pages/Admin/AdminProjects'

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
  {
    path: '/admin',
    key: '/admin',
    label: 'Admin Dashboard',
    icon: <DashboardOutlined />,
    element: <AdminDashboard />,
    breadcrumb: 'Admin Dashboard',
    role: ['admin'],
  },
  {
    path: '/admin/employees',
    key: '/admin/employees',
    label: 'Employees',
    icon: <UserOutlined />,
    element: <AdminEmployees />,
    breadcrumb: 'Employees',
    role: ['admin'],
  },
  {
    path: '/admin/teams',
    key: '/admin/teams',
    label: 'Teams',
    icon: <TeamOutlined />,
    element: <AdminTeams />,
    breadcrumb: 'Teams',
    role: ['admin'],
  },
  {
    path: '/admin/projects',
    key: '/admin/projects',
    label: 'Projects',
    icon: <ProjectOutlined />,
    element: <AdminProjects />,
    breadcrumb: 'Projects',
    role: ['admin'],
  },
]

export default routes
