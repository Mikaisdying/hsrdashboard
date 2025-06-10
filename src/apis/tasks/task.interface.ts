export interface ITask {
  id: string | number
  name: string
  description: string
  status: string | null
  createdDate: string | null
  endDate?: string | null
  effort: number | null
  projectId: string | number
  workId: string | number
  assigneeIds: (string | number)[]
  creatorId: string | number | null
  deadline: string | null
  confirm_required: boolean | null
  isConfirmed: boolean | null
  priority: string | null
  type: string | null
  tech_area?: string | null
}

export interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}
