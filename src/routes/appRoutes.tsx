import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import {
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
  MessageOutlined,
} from '@ant-design/icons'

const ProjectPage = () => <div>Project Page</div>
const CommunityPage = () => <div>Community Page</div>
const ChatPage = () => <div>Chat Page</div>

const routes = [
  {
    path: '/login',
    element: <Login />,
    layout: 'none',
  },
  {
    path: '/',
    element: <Dashboard />,
    layout: 'main',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: '/project',
    element: <ProjectPage />,
    layout: 'main',
    label: 'Project',
    icon: <ProjectOutlined />,
  },
  {
    path: '/community',
    element: <CommunityPage />,
    layout: 'main',
    label: 'Community',
    icon: <TeamOutlined />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
    layout: 'main',
    label: 'Chat',
    icon: <MessageOutlined />,
  },
]

export default routes
