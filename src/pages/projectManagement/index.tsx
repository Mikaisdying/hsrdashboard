import { Button, Skeleton } from 'antd'
import { ScheduleOutlined, SyncOutlined, CiOutlined } from '@ant-design/icons'
import ProjectCard from '../../components/projectCard'
import { useState } from 'react'
import {
  getProjectsOnPlan,
  getProjectsInProgress,
  getProjectsArchived,
} from '../../apis/projects/project.api'
import AddProjectModal from './addProjectModal'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export const ProjectList = () => {
  const {
    data: onPlan,
    loading: loadingOnPlan,
    error: errorOnPlan,
  } = useFetch(getProjectsOnPlan, [])
  const {
    data: inProgress,
    loading: loadingInProgress,
    error: errorInProgress,
  } = useFetch(getProjectsInProgress, [])
  const {
    data: archived,
    loading: loadingArchived,
    error: errorArchived,
  } = useFetch(getProjectsArchived, [])
  const [showAddModal, setShowAddModal] = useState(false)
  const navigate = useNavigate()

  if (errorOnPlan || errorInProgress || errorArchived) {
    return <div>Error loading project data</div>
  }

  return (
    <div className="p-4">
      <AddProjectModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => window.location.reload()}
      />
      <div
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
          margin: '12px 0px',
        }}
      >
        {/* On Plan */}
        <div
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 16,
            minHeight: 200,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ScheduleOutlined
                style={{ marginRight: 8, color: '#1890ff', fontWeight: 700, fontSize: 20 }}
              />
              ON PLAN
              <span style={{ fontWeight: 400, marginLeft: 8 }}>({onPlan?.length || 0})</span>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {loadingOnPlan
              ? Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton key={idx} active paragraph={{ rows: 2 }} />
                ))
              : (onPlan || []).map((item) => (
                  <ProjectCard
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    updatedAt={item.updatedAt}
                    pmName={item.pm?.name || ''}
                    pmAvatarUrl={item.pm?.avatar || ''}
                    onClick={() => navigate(`/projects/${item.id}`)}
                  />
                ))}
          </div>
          <Button
            size="small"
            style={{
              width: '100%',
              height: 32,
              marginTop: 12,
              border: 'none',
              boxShadow: 'none',
            }}
            onClick={() => setShowAddModal(true)}
          >
            New Project
          </Button>
        </div>
        {/* In Progress */}
        <div
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 16,
            minHeight: 200,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SyncOutlined
                style={{ marginRight: 8, color: '#faad14', fontWeight: 700, fontSize: 20 }}
              />
              IN PROGRESS
              <span style={{ fontWeight: 400, marginLeft: 8 }}>({inProgress?.length || 0})</span>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {loadingInProgress
              ? Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton key={idx} active paragraph={{ rows: 2 }} />
                ))
              : (inProgress || []).map((item) => (
                  <ProjectCard
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    updatedAt={item.updatedAt}
                    pmName={item.pm?.name || ''}
                    pmAvatarUrl={item.pm?.avatar || ''}
                    onClick={() => navigate(`/projects/${item.id}`)}
                  />
                ))}
          </div>
        </div>
        {/* Archived */}
        <div
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 16,
            minHeight: 200,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CiOutlined
                style={{ marginRight: 8, color: '#bfbfbf', fontWeight: 700, fontSize: 20 }}
              />
              ARCHIVED
              <span style={{ fontWeight: 400, marginLeft: 8 }}>({archived?.length || 0})</span>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {loadingArchived
              ? Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton key={idx} active paragraph={{ rows: 2 }} />
                ))
              : (archived || []).map((item) => (
                  <ProjectCard
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    updatedAt={item.updatedAt}
                    pmName={item.pm?.name || ''}
                    pmAvatarUrl={item.pm?.avatar || ''}
                    onClick={() => navigate(`/projects/${item.id}`)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
