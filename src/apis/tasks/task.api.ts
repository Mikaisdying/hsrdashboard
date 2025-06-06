import { apiService } from '../apiService'
import type { ITask } from './task.interface'
import type { IWork } from './work.interface'

export async function createTaskApi(payload: Partial<ITask> & { projectId: string | number }) {
  return apiService({
    url: '/tasks',
    method: 'POST',
    body: payload,
  })
}

export async function createWorkApi(payload: Partial<IWork> & { projectId: string | number }) {
  return apiService({
    url: `/projects/${payload.projectId}/works`,
    method: 'POST',
    body: payload,
  })
}

export async function getWorksApi(projectId: string | number) {
  return apiService<IWork[]>({
    url: `/projects/${projectId}/works`,
    method: 'GET',
  })
}
