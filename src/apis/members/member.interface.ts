export interface IMember {
  id: number
  fullName: string
  email: string
  mobile?: string
  password?: string
  avatar?: string
  job?: string
  isApproved?: boolean
  role?: string
  status?: number
}

export type IUser = IMember
