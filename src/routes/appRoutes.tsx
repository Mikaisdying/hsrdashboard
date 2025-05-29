import {
  DashboardOutlined,
  ProjectOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import { Outlet } from 'react-router-dom'

// Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard'
import { ProjectList } from '../pages/projectManagement'

// Dummy pages
const createPage = (label: string) => () => <div>{label}</div>

const TaskList = createPage('Task List Page')
const TaskDetail = createPage('Task Detail Page')
const QcTestList = createPage('QC Test List Page')
const QcReport = createPage('QC Report Page')
const DocumentList = createPage('Document List Page')
const MemberList = createPage('Member List Page')
const NotificationPage = createPage('Notification Page')
const SystemLayout = () => {
  return (
    <div>
      <h1>System Settings</h1>
      <Outlet />
    </div>
  )
}
const AuditLogPage = createPage('System - Audit Log Page')
const SettingPage = createPage('System - Settings Page')
const WorkflowPage = createPage('System - Workflow Page')

const routes = [
  {
    path: '/login',
    element: <Login />,
    layout: 'none',
  },
  {
    path: '/register',
    element: <Register />,
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
    path: '/qc/tests',
    element: <QcTestList />,
    layout: 'main',
    label: 'Kiểm thử & QC',
    icon: <CheckCircleOutlined />,
    roles: ['QC'],
  },
  {
    path: '/qc/reports',
    element: <QcReport />,
    layout: 'main',
    hidden: true,
    roles: ['QC'],
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
    element: <NotificationPage />,
    layout: 'main',
    label: 'Thông báo / Lịch vận hành',
    icon: <BellOutlined />,
    roles: ['SA', 'PM', 'DE', 'QC'],
  },
  {
    path: '/system',
    element: <SystemLayout />,
    layout: 'main',
    label: 'Cấu hình hệ thống',
    icon: <SettingOutlined />,
    roles: ['SA'],
    children: [
      {
        path: 'settings',
        element: <SettingPage />,
        label: 'Cài đặt',
        roles: ['SA'],
      },
      {
        path: 'workflow',
        element: <WorkflowPage />,
        label: 'Quy trình',
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
