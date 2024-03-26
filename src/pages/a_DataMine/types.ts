// import { Project } from '../projects/types'
// import { User } from '../users/types'
export type MineStatus = '' | 'public' | 'private' | 'deleted'

export type MineData = {
  id: number
  owner: number
  path: string

  name: string
  number: number
  description: string
  status: MineStatus
  upload_time: Date
  auth_number: number
}
