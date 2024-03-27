// import { Project } from '../projects/types'
// import { User } from '../users/types'
export type AuthStatus = '' | 'waiting' | 'agree' | 'no'

export type AuthData = {
  id: number

  name: string
  getter: {
    id: number
    name: string
    photo: string // 网址，或者是空
  }
  number: number
  description: string

  usage: string
  deadline: Date

  status: AuthStatus
  // action?: boolean
}
