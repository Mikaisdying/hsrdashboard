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
}

export type IUser = IMember
