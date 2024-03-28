import request from '@/utils/request'

export function getMineProject(query) {
  return request({
    url: '/self_project',
    method: 'get',
    params: query,
  })
}

export function getAvailable(query) {
  return request({
    url: '/project_mine/getOptions',
    method: 'get',
    params: query,
  })
}

export function getOtherProject(query) {
  return request({
    url: '/project_other/getItems',
    method: 'get',
    params: query,
  })
}
