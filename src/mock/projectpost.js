import Mock from 'mockjs'
const projectpost = [
  // 项目
  {
    url: '/create_project',
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

export default projectpost
