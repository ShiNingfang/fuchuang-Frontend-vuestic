// import { Project } from '../projects/types'
// import { User } from '../users/types'
export type AuthStatus = '' | 'waiting' | 'agree' | 'no'

export type AuthData = {
  id: number

  name: string
  getter: number
  number: number
  description: string

  usage: string
  deadline: Date

  status: AuthStatus
}
