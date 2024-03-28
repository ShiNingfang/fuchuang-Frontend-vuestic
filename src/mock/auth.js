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
    url: '/login',
    type: 'post',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: {
          user_id: 1,
          user_name: 'SNF',
          avater_url: '',
        },
      }
    },
  },
]

export default auth
