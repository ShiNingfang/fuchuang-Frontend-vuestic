import request from '@/utils/request'

// 数据样本
export function getMineData(query) {
  return request({
    url: '/self_dataset',
    method: 'get',
    params: {
      user_id: query.id,
      limit: query.filters.perPage,
      page: query.filters.page,
      sort_by: query.filters.sortBy,
      sorting_order: query.filters.sortingOrder,
      status: query.filters.mineStatus,
      search: query.filters.search,
    },
  })
}
export function getOtherData(query) {
  return request({
    url: '/other_dataset',
    method: 'get',
    params: {
      user_id: query.id,
      limit: query.filters.perPage,
      page: query.filters.page,
      sort_by: query.filters.sortBy,
      sorting_order: query.filters.sortingOrder,
      status: query.filters.otherStatus,
      search: query.filters.search,
    },
  })
}

export function getAuthData(query) {
  return request({
    url: '/get_applications',
    // 这里少了/会出问题，404，可能导航就从当下开始而不是从/开始
    method: 'get',
    params: {
      user_id: query.id,
      limit: query.filters.perPage,
      page: query.filters.page,
      sort_by: query.filters.sortBy,
      sorting_order: query.filters.sortingOrder,
      status: query.filters.authStatus,
      search: query.filters.search,
    },
  })
}
