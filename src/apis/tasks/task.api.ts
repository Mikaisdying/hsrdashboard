import { apiService } from '../apiService'
import type { ITask } from './task.interface'

export async function createTaskApi(payload: Partial<ITask> & { projectId: string | number }) {
  return apiService({
    url: '/tasks',
    method: 'POST',
    body: payload,
  })
}
