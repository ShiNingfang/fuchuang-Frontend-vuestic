import request from '@/utils/request'

export function createProject(data) {
  return request({
    url: '/project_mine/create',
    method: 'post',
    data,
  })
}
