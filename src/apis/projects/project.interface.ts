export interface IProject {
  id: number
  name: string
  code: string
  description: string
  status: string
  createdDate: string
  endDate: string
  budget: number
  updatedAt: string
  pm: {
    id: number
    name: string
    avatar: string
  }
}
