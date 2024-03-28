import request from '@/utils/request'

// post
export function Register(data) {
  const res = request({
    url: '/register',
    method: 'post',
    params: {
      user_name: data.name,
      password: data.password,
    },
  })
  return res
}

export function Login(data) {
  const res = request({
    url: '/login',
    method: 'post',
    params: {
      user_name: data.name,
      password: data.password,
    },
  })
  return {
    id: res.user_id,
    name: res.user_name,
    photo: res.avater_url,
    phone: res.phone,
    email: res.email,
  }
}
