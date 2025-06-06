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
}

export async function getProjectById(projectId: string | number): Promise<IProject> {
  return apiService<IProject>({
    url: `/projects/${projectId}`,
    method: 'GET',
  })
}

export async function getProjectDetailApi(projectId: string | number): Promise<IProjectDetail> {
  const project = await getProjectById(projectId)
  const works = await getWorksByProjectId(projectId)
  const allTasks = await apiService<ITask[]>({
    url: `/tasks?projectId=${projectId}`,
    method: 'GET',
  })
  const workIds = works.map((w) => w.id)
  const tasks = allTasks.filter((t) => t.workId && workIds.includes(t.workId))
  return {
    project,
    works,
    tasks,
  }
}
