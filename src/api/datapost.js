import request from '@/utils/request'

export function createMineData(data) {
  return request({
    url: '/data_mine/create',
    method: 'post',
    params: {
      user_id: data.owner,
      dataset_name: data.name,
      size: data.number,
      dataset_address: data.path,
      dataset_describe: data.description,
    },
  })
}

export function changeMineDataState(data) {
  return request({
    url: '/data_mine/delete',
    method: 'post',
    params: {
      dataset_id: data.id,
      dataset_state: data.status,
    },
  })
}

export function applyData(data) {
  return request({
    url: '/apply',
    method: 'post',
    params: {
      applicant_id: data.owner.id,
      dataset_id: data.id,
      apply_describe: data.description,
      expiration_time: data.deadline,
    },
  })
}

export function approveApply(data) {
  return request({
    url: 'application_approve',
    method: 'post',
    params: {
      apply_id: data.id,
    },
  })
}

export function rejectApply(data) {
  return request({
    url: 'application_reject',
    method: 'post',
    params: {
      apply_id: data.id,
    },
  })
}
