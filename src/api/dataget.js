import request from '@/utils/request'

// 数据样本
export function getMineData(query) {
  return new Promise((resolve, reject) => {
    request({
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
      .then((res) => {
        console.log(res)
        resolve({
          code: res.code,
          data: res.data.map((item) => ({
            id: item.dataset_id,
            name: item.dataset_name,
            number: item.size,
            description: item.dataset_describe,
            path: item.dataset_address,
            auth_number: item.dataset_use,
            upload_time: item.dataset_time,
            status: item.dataset_state,
          })),
          pagination: res.pagination,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function getOtherData(query) {
  return new Promise((resolve, reject) => {
    request({
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
      .then((res) => {
        console.log(res)
        resolve({
          code: res.code,
          data: res.data.map((item) => ({
            id: item.dataset_id,
            name: item.dataset_name,
            owner: {
              id: item.user_id,
              name: item.user_name,
              photo: item.avater_url,
            },
            number: item.dataset_use,
            description: item.dataset_describe,
            status: item.available,
          })),
          pagination: res.pagination,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function getAuthData(query) {
  return new Promise((resolve, reject) => {
    request({
      url: '/get_applications',
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
      .then((res) => {
        console.log(res)
        resolve({
          code: res.code,
          data: res.data.map((item) => ({
            id: item.apply_id,
            name: item.dataset_name,
            getter: {
              id: item.applicant_id,
              name: item.applicant_name,
              photo: item.avater_url,
            },
            description: item.dataset_describe,
            status: item.apply_state,
            usage: item.apply_describe,
            deadline: item.expiration_time,
          })),
          pagination: res.pagination,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
