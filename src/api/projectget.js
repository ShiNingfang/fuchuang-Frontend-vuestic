import request from '@/utils/request'

export function getMineProject(query) {
  return new Promise((resolve, reject) => {
    request({
      url: '/self_project',
      method: 'get',
      params: {
        user_id: query.id,
        limit: query.filters.perPage,
        page: query.filters.page,
        sort_by: query.filters.sortBy,
        sorting_order: query.filters.sortingOrder,
        // status: query.filters.mineStatus,
        // search: query.filters.search,
      },
    })
      .then((res) => {
        // console.log(res)
        resolve({
          code: res.code,
          data: res.data.map((item) => ({
            id: item.project_id,
            project_name: item.project_name,
            project_owner: {
              id: item.starter.starter_id,
              name: item.starter.starter_name,
              photo: item.starter.starter_avatar,
            },
            team: item.cooperator_list.map((value) => ({
              id: value.cooperator_id,
              name: value.cooperator_name,
              photo: value.cooperator_avatar,
            })),
            type: item.project_type,
            description: item.project_describ,
            create_date: item.project_time,
          })),
          pagination: res.pagination,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function getAvailable(query) {
  return new Promise((resolve, reject) => {
    request({
      url: '/project_cooperator',
      method: 'get',
      params: {
        user_id: query.id,
      },
    })
      .then((res) => {
        // console.log('/self_project_cooperator')
        console.log(res.data)
        resolve({
          code: res.code,
          data: res.data.map((item) => ({
            id: item.cooperator_id,
            name: item.cooperator_name,
            photo: item.cooperator_avatar,
          })),
          // pagination: res.pagination,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function getOtherProject(query) {
  // '/other_project'
  return new Promise((resolve, reject) => {
    request({
      url: '/other_project',
      method: 'get',
      params: {
        user_id: query.id,
        limit: query.filters.perPage,
        page: query.filters.page,
        sort_by: query.filters.sortBy,
        sorting_order: query.filters.sortingOrder,
        // status: query.filters.mineStatus,
        // search: query.filters.search,
      },
    })
      .then((res) => {
        console.log(res)
        resolve({
          code: res.code,
          data: res.data.map((item) => ({
            id: item.project_id,
            project_name: item.project_name,
            project_owner: {
              id: item.starter.starter_id,
              name: item.starter.starter_name,
              photo: item.starter.starter_avatar,
            },
            team: item.cooperator_list.map((value) => ({
              id: value.cooperator_id,
              name: value.cooperator_name,
              photo: value.cooperator_avatar,
            })),
            type: item.project_type,
            description: item.project_describ,
            create_date: item.project_time,
          })),
          pagination: res.pagination,
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
