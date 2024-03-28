import request from '@/utils/request'

export function createProject(data) {
  return request({
    url: '/create_project',
    method: 'post',
    params: {
      starter_id: data.project.project_owner.id,
      cooperator_id_list: data.team.map((member) => member.id),
      project_name: data.project_name,
      project_describ: data.description,
      project_type: data.type,
    },
  })
}
