import { User } from '../users/types'

export type Project = {
  id: number
  project_name: string
  type: string
  description: string
  team: Omit<User, 'projects'>[]
  creation_date: string

  status: 'important' | 'completed' | 'archived' | 'in progress'
  project_owner: Omit<User, 'projects'>
}

export type EmptyProject = Omit<Project, 'id' | 'project_name' | 'type' | 'team' | 'description' | 'creation_date'> & {
  project_owner?: Project['project_owner'] // 假设你后续添加这个属性
  status?: Project['status'] // 假设你后续添加这个属性
}
