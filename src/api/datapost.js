import request from '@/utils/request'

export function createMineData(data) {
  return request({
    url: '/data_mine/create',
    method: 'post',
    data,
  })
}

export function changeMineDataState(data) {
  return request({
    url: '/data_mine/delete',
    method: 'post',
    data,
  })
}

export function applyData(data) {
  return request({
    url: '/data_other/apply',
    method: 'post',
    data,
  })
}

export function handleApply(data) {
  return request({
    url: '/data_author/handle',
    method: 'post',
    data,
  })
}
