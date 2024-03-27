import Mock from 'mockjs'
const auth = [
  // 数据
  {
    url: '/register',
    type: 'post',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: 'success',
      }
    },
  },
  {
    url: '/login/login',
    type: 'post',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: 'success',
      }
    },
  },
]

export default auth
