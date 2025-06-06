import { apiService } from '../apiService'
import type { IProject } from './project.interface'
import type { IWork } from '../tasks/work.interface'

export async function getProjectsOnPlan(): Promise<IProject[]> {
  return apiService<IProject[]>({
    url: '/projects?status=NEW',
    method: 'GET',
  })
}

export async function getProjectsInProgress(): Promise<IProject[]> {
  return apiService<IProject[]>({
    url: '/projects?status=ONGOING',
    method: 'GET',
  })
}

export async function getProjectsArchived(): Promise<IProject[]> {
  return apiService<IProject[]>({
    url: '/projects?status=ARCHIVED',
    method: 'GET',
  })
}

export async function createProjectApi(payload: IProject) {
  return apiService({
    url: '/projects',
    method: 'POST',
    body: {
      ...payload,
      status: 'NEW',
      createdDate: new Date().toISOString().slice(0, 10),
    },
  })
}

export async function getProjectById(id: string | number): Promise<IProject> {
  const project = await apiService<IProject>({
    url: `/projects/${id}`,
    method: 'GET',
  })

  if (!project.tasks) {
    project.tasks = [
      { id: 1, name: 'Thiết kế UI', description: 'Thiết kế giao diện người dùng cho dự án.' },
      {
        id: 2,
        name: 'Phân tích yêu cầu',
        description: 'Thu thập và phân tích yêu cầu khách hàng.',
      },
      { id: 3, name: 'Lập trình backend', description: 'Xây dựng API và xử lý dữ liệu.' },
    ]
  }

  return project
}

export async function addProjectMemberApi(
  projectId: string | number,
  payload: { memberId: string; role: string }
): Promise<void> {
  return apiService<void>({
    url: `/projects/${projectId}/members`,
    method: 'POST',
    body: payload,
  })
}

export async function getWorksByProjectId(projectId: string | number): Promise<IWork[]> {
  return apiService<IWork[]>({
    url: `/projects/${projectId}/works`,
    method: 'GET',
  })
}

export async function createWorkForProject(projectId: string | number, payload: IWork) {
  return apiService({
    url: `/projects/${projectId}/works`,
    method: 'POST',
    body: payload,
  })
}
