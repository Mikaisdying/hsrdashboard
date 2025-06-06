export interface IProject {
  id: string | number
  name: string
  code: string
  description: string
  status: string
  createdDate: string
  endDate: string
  budget: number
  updatedAt: string
  link: string[]
  pm?: IProjectMember
  members: IProjectMember[]
}

export interface IProjectMember {
  id: string | number
  name: string
  avatar: string
  email?: string
  role?: string
  job?: string
}
