export interface ITask {
  id: number
  name: string
  description?: string
  deadline?: string
  assigneeIds?: number[]
  projectId?: number | string
  status?: string
  priority?: string
  type?: string
  createdDate?: string
  endDate?: string
}

export interface IWork {
  id: string
  name: string
  tasks: ITask[]
}
