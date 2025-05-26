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
  link: string[]
  pm?: IProjectMember
  members: IProjectMember[]
}

export interface IProjectMember {
  id: number
  name: string
  avatar: string
  email?: string
  role?: string //LEAD, MEMBER (PM sẽ null)
  job?: string //BA, QC, DEV (PM sẽ null)
}
