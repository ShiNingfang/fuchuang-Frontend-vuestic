import request from '@/utils/request'

export function Register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

export function Login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data,
  })
}
