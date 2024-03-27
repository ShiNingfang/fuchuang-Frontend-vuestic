import request from '@/utils/request'

// 数据样本
export function getMineData(query) {
  return request({
    url: '/data_mine/getItems',
    method: 'get',
    params: query,
  })
}
export function getOtherData(query) {
  return request({
    url: '/data_other/getItems',
    method: 'get',
    params: query,
  })
}

export function getAuthData(query) {
  return request({
    url: '/data_author/getItems',
    // 这里少了/会出问题，404，可能导航就从当下开始而不是从/开始
    method: 'get',
    params: query,
  })
}
