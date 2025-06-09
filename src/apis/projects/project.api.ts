import { apiService } from '../apiService'
import type { IProject } from './project.interface'
import type { IWork } from '../tasks/work.interface'
import type { ITask } from '../tasks/task.interface'

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

export async function addProjectMemberApi(
  projectId: string | number,
  payload: { user_id: string | number; role: string; joinedAt?: string }
): Promise<void> {
  return apiService<void>({
    url: '/projectMembers',
    method: 'POST',
    body: {
      project_id: projectId,
      user_id: payload.user_id,
      role: payload.role,
      joinedAt: payload.joinedAt || new Date().toISOString().slice(0, 10),
    },
  })
}

export async function deleteProjectMemberApi(memberId: number) {
  return apiService({
    url: `/projectMembers/${memberId}`,
    method: 'DELETE',
  })
}

export async function getWorksByProjectId(projectId: string | number): Promise<IWork[]> {
  return apiService<IWork[]>({
    url: `/works?projectId=${projectId}`,
    method: 'GET',
  })
}

export async function createWorkForProject(projectId: string | number, payload: IWork) {
  return apiService({
    url: '/works',
    method: 'POST',
    body: { ...payload, projectId },
  })
}

export interface IProjectDetail {
  project: IProject
  works: IWork[]
  tasks: ITask[]
  members: any[]
}

export async function getProjectById(projectId: string | number): Promise<IProject> {
  return apiService<IProject>({
    url: `/projects/${projectId}`,
    method: 'GET',
  })
}

export async function getProjectDetailApi(projectId: string | number): Promise<IProjectDetail> {
  const project = await apiService<IProject>({
    url: `/projects/${projectId}`,
    method: 'GET',
  })

  const projectMembers = await apiService<any[]>({
    url: `/projectMembers?project_id=${projectId}`,
    method: 'GET',
  })

  const users = await apiService<any[]>({
    url: `/users`,
    method: 'GET',
  })
  const members = projectMembers.map((pm) => {
    const user = users.find((u) => String(u.id) === String(pm.user_id))
    return {
      id: pm.id,
      name: user?.fullName,
      avatar: user?.avatar,
      email: user?.email,
      role: pm.role,
      job: user?.job,
      joinedAt: pm.joinedAt,
    }
  })
  // Lấy works và tasks như cũ
  const works = await apiService<IWork[]>({
    url: `/works?projectId=${projectId}`,
    method: 'GET',
  })
  const tasks = await apiService<ITask[]>({
    url: `/tasks?projectId=${projectId}`,
    method: 'GET',
  })
  return {
    project,
    works,
    tasks,
    members,
  }
}

export async function updateProjectDescriptionApi(projectId: string | number, description: string) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: { description },
  })
}

export async function updateProjectCodeApi(projectId: string | number, code: string) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: { code },
  })
}

export async function updateProjectStartDateApi(projectId: string | number, createdDate: string) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: { createdDate },
  })
}

export async function updateProjectEndDateApi(projectId: string | number, endDate: string) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: { endDate },
  })
}

export async function updateProjectBudgetApi(projectId: string | number, budget: number) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: { budget },
  })
}

export async function updateProjectLinksApi(projectId: string | number, link: string[]) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: { link },
  })
}

export async function updateProjectFieldsApi(
  projectId: string | number,
  fields: Partial<IProject>
) {
  return apiService({
    url: `/projects/${projectId}`,
    method: 'PATCH',
    body: fields,
  })
}
