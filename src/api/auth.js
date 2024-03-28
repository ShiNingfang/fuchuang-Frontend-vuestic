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
  return new Promise((resolve, reject) => {
    request({
      url: '/login',
      method: 'post',
      params: {
        user_name: data.name,
        password: data.password,
      },
    })
      .then((res) => {
        console.log(res)
        resolve({
          code: res.code,
          data: {
            id: res.data.user_id,
            name: res.data.user_name,
            photo: res.data.avater_url,
            // phone: res.data.phone,
            // email: res.data.email,
          },
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
