// import { User } from '../users/types'

export type pjtUser = {
  id: number
  name: string
  photo: string // 网址，或者是空
}

export type Project = {
  id: number
  project_name: string
  project_owner: pjtUser
  team: pjtUser[]
  type: string
  description: string
  create_date: Date

  status?: 'important' | 'completed' | 'archived' | 'in progress'
}

// export type EmptyProject = Omit<Project, 'id' | 'project_name' | 'type' | 'team' | 'description' | 'creation_date'> & {
//   project_owner?: Project['project_owner'] // 假设你后续添加这个属性
//   status?: Project['status'] // 假设你后续添加这个属性
// }
