import {
  DashboardOutlined,
  ProjectOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons'

// Pages
import Auth from '../pages/auth'
import Dashboard from '../pages/dashboard'
import { ProjectList } from '../pages/projectManagement'
import ProjectDetailsPage from '../pages/projectManagement/projectDetails'
import UserListPage from '../pages/system/user'
import CalendarPage from '../pages/calendar'

// Dummy pages
const createPage = (label: string) => () => <div>{label}</div>
const TaskList = createPage('Task List Page')
const TaskDetail = createPage('Task Detail Page')
const DocumentList = createPage('Document List Page')
const MemberList = createPage('Member List Page')
const AuditLogPage = createPage('System - Audit Log Page')
const SettingPage = createPage('System - Settings Page')

const routes = [
  {
    path: '/auth',
    element: <Auth />,
    layout: 'none',
  },
  {
    path: '/',
    element: <Dashboard />,
    layout: 'main',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    roles: ['SA', 'PM', 'DE', 'QC'],
  },
  {
    path: '/projects',
    element: <ProjectList />,
    layout: 'main',
    label: 'Quản lý dự án',
    icon: <ProjectOutlined />,
    roles: ['SA', 'PM'],
  },
  {
    path: '/projects/:id',
    element: <ProjectDetailsPage />,
    layout: 'main',
    hidden: true,
    roles: ['SA', 'PM'],
  },
  {
    path: '/tasks',
    element: <TaskList />,
    layout: 'main',
    label: 'Task',
    icon: <FileDoneOutlined />,
    roles: ['SA', 'PM', 'DE', 'QC'],
  },
  {
    path: '/tasks/:id',
    element: <TaskDetail />,
    layout: 'main',
    hidden: true,
    roles: ['SA', 'PM', 'DE', 'QC'],
  },
  {
    path: '/documents',
    element: <DocumentList />,
    layout: 'main',
    label: 'Tài liệu',
    icon: <FileTextOutlined />,
    roles: ['SA', 'PM', 'DE', 'QC'],
  },
  {
    path: '/members',
    element: <MemberList />,
    layout: 'main',
    label: 'Thành viên',
    icon: <TeamOutlined />,
    roles: ['SA'],
  },
  {
    path: '/notifications',
    element: <CalendarPage />,
    layout: 'main',
    label: 'Lịch vận hành thử',
    icon: <BellOutlined />,
    roles: ['SA', 'PM', 'DE', 'QC'],
  },
  {
    path: '/system',
    layout: 'main',
    label: 'Cấu hình hệ thống',
    icon: <SettingOutlined />,
    roles: ['SA'],
    disabled: true,
    children: [
      {
        path: 'settings',
        element: <SettingPage />,
        label: 'Cài đặt',
        roles: ['SA'],
      },
      {
        path: 'users',
        element: <UserListPage />,
        label: 'Người dùng',
        roles: ['SA'],
      },
      {
        path: 'audit-log',
        element: <AuditLogPage />,
        label: 'Nhật ký hệ thống',
        roles: ['SA'],
      },
    ],
  },
]

export default routes
