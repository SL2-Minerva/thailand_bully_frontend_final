// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UserLayoutType = {
  id: string | undefined
}

export type UsersType = {
  id: number
  role: string
  email: string
  name: string
  group: string
  organization?: string, 
  role_id?: any, 
  organization_id?: any,
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
}
