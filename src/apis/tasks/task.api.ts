import { apiService } from '../apiService'
import type { ITask } from './task.interface'
import type { IWork } from './work.interface'

// Lấy tất cả work của 1 project
export async function getWorksApi(projectId: string | number) {
  return apiService<IWork[]>({
    url: `/works?projectId=${projectId}`,
    method: 'GET',
  })
}

// Tạo work mới cho project
export async function createWorkApi(payload: { name: string; projectId: string | number }) {
  return apiService({
    url: '/works',
    method: 'POST',
    body: payload,
  })
}

// Sửa work
export async function updateWorkApi(id: string | number, payload: Partial<IWork>) {
  return apiService({
    url: `/works/${id}`,
    method: 'PUT',
    body: payload,
  })
}

// Xóa work
export async function deleteWorkApi(id: string | number) {
  return apiService({
    url: `/works/${id}`,
    method: 'DELETE',
  })
}

// Lấy tất cả task của 1 work
export async function getTasksByWorkIdApi(workId: string | number) {
  return apiService<ITask[]>({
    url: `/tasks?workId=${workId}`,
    method: 'GET',
  })
}

// Lấy tất cả task của 1 project
export async function getTasksByProjectIdApi(projectId: string | number) {
  return apiService<ITask[]>({
    url: `/tasks?projectId=${projectId}`,
    method: 'GET',
  })
}

// Tạo task mới
export async function createTaskApi(payload: Partial<ITask>) {
  return apiService({
    url: '/tasks',
    method: 'POST',
    body: payload,
  })
}

// Sửa task
export async function updateTaskApi(id: string | number, payload: Partial<ITask>) {
  return apiService({
    url: `/tasks/${id}`,
    method: 'PUT',
    body: payload,
  })
}

// Xóa task
export async function deleteTaskApi(id: string | number) {
  return apiService({
    url: `/tasks/${id}`,
    method: 'DELETE',
  })
}
