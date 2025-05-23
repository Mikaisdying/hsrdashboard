import { apiService } from '../apiService'
import type { IProject } from './project.interface'

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
