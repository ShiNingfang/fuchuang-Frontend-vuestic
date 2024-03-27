import Mock from 'mockjs'
const datapost = [
  // 数据
  {
    url: '/data_mine/create',
    type: 'post',
    response: (config) => {
      console.log('/data_mine/create')
      console.log(config)
      return {
        code: 200,
        data: 'success',
      }
    },
  },
  {
    url: '/data_mine/delete',
    type: 'post',
    response: (config) => {
      console.log('/data_mine/delete')
      console.log(config)
      return {
        code: 200,
        data: 'success',
      }
    },
  },
  {
    url: '/data_other/apply',
    type: 'post',
    response: (config) => {
      console.log('/data_other/apply')
      console.log(config)
      return {
        code: 200,
        data: 'success',
      }
    },
  },
  {
    url: '/data_author/handle',
    type: 'post',
    response: (config) => {
      console.log('/data_author/handle')
      console.log(config)
      return {
        code: 200,
        data: 'success',
      }
    },
  },

  // 项目
  {
    url: '/project_mine/create',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success',
      }
    },
  },
  {
    url: '/project_mine/task/create',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success',
      }
    },
  },
]

export default datapost
