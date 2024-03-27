import Mock from 'mockjs'
const mineData = [
  {
    id: 1,
    name: '样本1',
    number: 10,
    description: '这是一个样本描述。',
    path: '/sample/1',
    auth_number: 5,
    upload_time: new Date('2024-03-26T08:00:00Z'),
    status: 'public',
  },
  {
    id: 2,
    name: '样本2',
    number: 8,
    description: '这是另一个样本描述。',
    path: '/sample/2',
    auth_number: 3,
    upload_time: new Date('2024-03-25T10:30:00Z'),
    status: 'private',
  },
  {
    id: 3,
    name: '样本3',
    number: 15,
    description: '这是第三个样本描述。',
    path: '/sample/3',
    auth_number: 7,
    upload_time: new Date('2024-03-24T15:45:00Z'),
    status: 'public',
  },
  {
    id: 4,
    name: '样本4',
    number: 5,
    description: '这是第四个样本描述。',
    path: '/sample/4',
    auth_number: 2,
    upload_time: new Date('2024-03-23T12:20:00Z'),
    status: 'deleted',
  },
  {
    id: 5,
    name: '样本5',
    number: 12,
    description: '这是第五个样本描述。',
    path: '/sample/5',
    auth_number: 6,
    upload_time: new Date('2024-03-22T09:10:00Z'),
    status: 'public',
  },
  {
    id: 6,
    name: '样本6',
    number: 7,
    description: '这是第六个样本描述。',
    path: '/sample/6',
    auth_number: 4,
    upload_time: new Date('2024-03-21T14:00:00Z'),
    status: 'private',
  },
  {
    id: 7,
    name: '样本7',
    number: 9,
    description: '这是第七个样本描述。',
    path: '/sample/7',
    auth_number: 5,
    upload_time: new Date('2024-03-20T11:30:00Z'),
    status: 'public',
  },
  {
    id: 8,
    name: '样本8',
    number: 11,
    description: '这是第八个样本描述。',
    path: '/sample/8',
    auth_number: 3,
    upload_time: new Date('2024-03-19T08:45:00Z'),
    status: 'private',
  },
  {
    id: 9,
    name: '样本9',
    number: 6,
    description: '这是第九个样本描述。',
    path: '/sample/9',
    auth_number: 2,
    upload_time: new Date('2024-03-18T13:20:00Z'),
    status: 'public',
  },
  {
    id: 10,
    name: '样本10',
    number: 13,
    description: '这是第十个样本描述。',
    path: '/sample/10',
    auth_number: 7,
    upload_time: new Date('2024-03-17T10:10:00Z'),
    status: 'public',
  },
  {
    id: 11,
    name: '样本11',
    number: 4,
    description: '这是第十一个样本描述。',
    path: '/sample/11',
    auth_number: 1,
    upload_time: new Date('2024-03-16T15:00:00Z'),
    status: 'private',
  },
  {
    id: 12,
    name: '样本12',
    number: 8,
    description: '这是第十二个样本描述。',
    path: '/sample/12',
    auth_number: 4,
    upload_time: new Date('2024-03-15T09:30:00Z'),
    status: 'public',
  },
  {
    id: 13,
    name: '样本13',
    number: 10,
    description: '这是第十三个样本描述。',
    path: '/sample/13',
    auth_number: 5,
    upload_time: new Date('2024-03-14T11:45:00Z'),
    status: 'deleted',
  },
  {
    id: 14,
    name: '样本14',
    number: 7,
    description: '这是第十四个样本描述。',
    path: '/sample/14',
    auth_number: 3,
    upload_time: new Date('2024-03-13T14:20:00Z'),
    status: 'public',
  },
  {
    id: 15,
    name: '样本15',
    number: 12,
    description: '这是第十五个样本描述。',
    path: '/sample/15',
    auth_number: 6,
    upload_time: new Date('2024-03-12T08:00:00Z'),
    status: 'public',
  },
  {
    id: 16,
    name: '样本16',
    number: 9,
    description: '这是第十六个样本描述。',
    path: '/sample/16',
    auth_number: 4,
    upload_time: new Date('2024-03-11T10:30:00Z'),
    status: 'private',
  },
  {
    id: 17,
    name: '样本17',
    number: 14,
    description: '这是第十七个样本描述。',
    path: '/sample/17',
    auth_number: 7,
    upload_time: new Date('2024-03-10T15:45:00Z'),
    status: 'public',
  },
  {
    id: 18,
    name: '样本18',
    number: 6,
    description: '这是第十八个样本描述。',
    path: '/sample/18',
    auth_number: 3,
    upload_time: new Date('2024-03-09T12:20:00Z'),
    status: 'private',
  },
  {
    id: 19,
    name: '样本19',
    number: 11,
    description: '这是第十九个样本描述。',
    path: '/sample/19',
    auth_number: 5,
    upload_time: new Date('2024-03-08T09:10:00Z'),
    status: 'public',
  },
  {
    id: 20,
    name: '样本20',
    number: 8,
    description: '这是第二十个样本描述。',
    path: '/sample/20',
    auth_number: 4,
    upload_time: new Date('2024-03-07T14:00:00Z'),
    status: 'public',
  },
]
const otherData = [
  {
    id: 1,
    name: '项目名称1',
    owner: {
      id: 1,
      name: '所有者姓名1',
      photo: '',
    },
    number: 10,
    description: '项目描述1',
    status: 'waiting',
  },
  {
    id: 2,
    name: '项目名称2',
    owner: {
      id: 2,
      name: '所有者姓名2',
      photo: '',
    },
    number: 8,
    description: '项目描述2',
    status: 'null',
  },
  {
    id: 3,
    name: '项目名称3',
    owner: {
      id: 3,
      name: '所有者姓名3',
      photo: '',
    },
    number: 15,
    description: '项目描述3',
    status: 'got',
  },
  {
    id: 4,
    name: '项目名称4',
    owner: {
      id: 4,
      name: '所有者姓名4',
      photo: '',
    },
    number: 5,
    description: '项目描述4',
    status: 'waiting',
  },
  {
    id: 5,
    name: '项目名称5',
    owner: {
      id: 5,
      name: '所有者姓名5',
      photo: '',
    },
    number: 12,
    description: '项目描述5',
    status: 'null',
  },
  {
    id: 6,
    name: '项目名称6',
    owner: {
      id: 6,
      name: '所有者姓名6',
      photo: '',
    },
    number: 7,
    description: '项目描述6',
    status: 'got',
  },
  {
    id: 7,
    name: '项目名称7',
    owner: {
      id: 7,
      name: '所有者姓名7',
      photo: '',
    },
    number: 9,
    description: '项目描述7',
    status: 'waiting',
  },
  {
    id: 8,
    name: '项目名称8',
    owner: {
      id: 8,
      name: '所有者姓名8',
      photo: '',
    },
    number: 11,
    description: '项目描述8',
    status: 'null',
  },
  {
    id: 9,
    name: '项目名称9',
    owner: {
      id: 9,
      name: '所有者姓名9',
      photo: '',
    },
    number: 6,
    description: '项目描述9',
    status: 'got',
  },
  {
    id: 10,
    name: '项目名称10',
    owner: {
      id: 10,
      name: '所有者姓名10',
      photo: '',
    },
    number: 13,
    description: '项目描述10',
    status: 'waiting',
  },
  {
    id: 11,
    name: '项目名称11',
    owner: {
      id: 11,
      name: '所有者姓名11',
      photo: '',
    },
    number: 4,
    description: '项目描述11',
    status: 'null',
  },
  {
    id: 12,
    name: '项目名称12',
    owner: {
      id: 12,
      name: '所有者姓名12',
      photo: '',
    },
    number: 8,
    description: '项目描述12',
    status: 'got',
  },
  {
    id: 13,
    name: '项目名称13',
    owner: {
      id: 13,
      name: '所有者姓名13',
      photo: '',
    },
    number: 10,
    description: '项目描述13',
    status: 'waiting',
  },
  {
    id: 14,
    name: '项目名称14',
    owner: {
      id: 14,
      name: '所有者姓名14',
      photo: '',
    },
    number: 7,
    description: '项目描述14',
    status: 'null',
  },
  {
    id: 15,
    name: '项目名称15',
    owner: {
      id: 15,
      name: '所有者姓名15',
      photo: '',
    },
    number: 12,
    description: '项目描述15',
    status: 'got',
  },
]
const authData = [
  {
    id: 1,
    name: '项目名称1',
    getter: {
      id: 1,
      name: '获得者姓名1',
      photo: '',
    },
    number: 10,
    description: '项目描述1',
    usage: '项目用途1',
    deadline: new Date('2024-04-10T00:00:00Z'),
    status: 'waiting',
  },
  {
    id: 2,
    name: '项目名称2',
    getter: {
      id: 2,
      name: '获得者姓名2',
      photo: '',
    },
    number: 8,
    description: '项目描述2',
    usage: '项目用途2',
    deadline: new Date('2024-04-11T00:00:00Z'),
    status: 'agree',
  },
  {
    id: 3,
    name: '项目名称3',
    getter: {
      id: 3,
      name: '获得者姓名3',
      photo: '',
    },
    number: 15,
    description: '项目描述3',
    usage: '项目用途3',
    deadline: new Date('2024-04-12T00:00:00Z'),
    status: 'no',
  },
  {
    id: 4,
    name: '项目名称4',
    getter: {
      id: 4,
      name: '获得者姓名4',
      photo: '',
    },
    number: 5,
    description: '项目描述4',
    usage: '项目用途4',
    deadline: new Date('2024-04-13T00:00:00Z'),
    status: 'waiting',
  },
  {
    id: 5,
    name: '项目名称5',
    getter: {
      id: 5,
      name: '获得者姓名5',
      photo: '',
    },
    number: 12,
    description: '项目描述5',
    usage: '项目用途5',
    deadline: new Date('2024-04-14T00:00:00Z'),
    status: 'agree',
  },
  {
    id: 6,
    name: '项目名称6',
    getter: {
      id: 6,
      name: '获得者姓名6',
      photo: '',
    },
    number: 7,
    description: '项目描述6',
    usage: '项目用途6',
    deadline: new Date('2024-04-15T00:00:00Z'),
    status: 'no',
  },
  {
    id: 7,
    name: '项目名称7',
    getter: {
      id: 7,
      name: '获得者姓名7',
      photo: '',
    },
    number: 9,
    description: '项目描述7',
    usage: '项目用途7',
    deadline: new Date('2024-04-16T00:00:00Z'),
    status: 'waiting',
  },
  {
    id: 8,
    name: '项目名称8',
    getter: {
      id: 8,
      name: '获得者姓名8',
      photo: '',
    },
    number: 11,
    description: '项目描述8',
    usage: '项目用途8',
    deadline: new Date('2024-04-17T00:00:00Z'),
    status: 'agree',
  },
  {
    id: 9,
    name: '项目名称9',
    getter: {
      id: 9,
      name: '获得者姓名9',
      photo: '',
    },
    number: 6,
    description: '项目描述9',
    usage: '项目用途9',
    deadline: new Date('2024-04-18T00:00:00Z'),
    status: 'no',
  },
  {
    id: 10,
    name: '项目名称10',
    getter: {
      id: 10,
      name: '获得者姓名10',
      photo: '',
    },
    number: 13,
    description: '项目描述10',
    usage: '项目用途10',
    deadline: new Date('2024-04-19T00:00:00Z'),
    status: 'waiting',
  },
  {
    id: 11,
    name: '项目名称11',
    getter: {
      id: 11,
      name: '获得者姓名11',
      photo: '',
    },
    number: 4,
    description: '项目描述11',
    usage: '项目用途11',
    deadline: new Date('2024-04-20T00:00:00Z'),
    status: 'agree',
  },
  {
    id: 12,
    name: '项目名称12',
    getter: {
      id: 12,
      name: '获得者姓名12',
      photo: '',
    },
    number: 8,
    description: '项目描述12',
    usage: '项目用途12',
    deadline: new Date('2024-04-21T00:00:00Z'),
    status: 'no',
  },
  {
    id: 13,
    name: '项目名称13',
    getter: {
      id: 13,
      name: '获得者姓名13',
      photo: '',
    },
    number: 10,
    description: '项目描述13',
    usage: '项目用途13',
    deadline: new Date('2024-04-22T00:00:00Z'),
    status: 'waiting',
  },
  {
    id: 14,
    name: '项目名称14',
    getter: {
      id: 14,
      name: '获得者姓名14',
      photo: '',
    },
    number: 7,
    description: '项目描述14',
    usage: '项目用途14',
    deadline: new Date('2024-04-23T00:00:00Z'),
    status: 'agree',
  },
  {
    id: 15,
    name: '项目名称15',
    getter: {
      id: 15,
      name: '获得者姓名15',
      photo: '',
    },
    number: 12,
    description: '项目描述15',
    usage: '项目用途15',
    deadline: new Date('2024-04-24T00:00:00Z'),
    status: 'no',
  },
]
const pagination = {
  page: 1,
  perPage: 10,
  total: 30,
}

const dataget = [
  // 数据
  {
    url: '/data_mine/getItems',
    type: 'get',
    response: (config) => {
      console.log('/data_mine/getItems')
      console.log(config)
      return {
        code: 200,
        data: mineData,
        pagination,
      }
    },
  },
  {
    url: '/data_other/getItems',
    type: 'get',
    response: (config) => {
      console.log('/data_other/getItems')
      console.log(config)
      return {
        code: 200,
        data: otherData,
        pagination,
      }
    },
  },
  {
    url: '/data_author/getItems',
    type: 'get',
    response: (config) => {
      console.log('/data_author/getItems')
      console.log(config)
      return {
        code: 200,
        data: authData,
        pagination,
      }
    },
  },

  // 项目
  {
    url: '/project_mine/getItems',
    type: 'get',
    response: (config) => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      const mockList = List2.filter((item) => {
        // if (importance && item.importance !== +importance) return false
        // if (type && item.type !== type) return false
        // if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      //   if (sort === '-id') {
      //     mockList = mockList.reverse()
      //   }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList,
        },
      }
    },
  },
  // 项目-可选合作方
  {
    url: '/project_mine/getOptions',
    type: 'get',
    response: (config) => {
      return {
        code: 200,
        data: {
          items: {
            number: ['snf', 'zzr', 'zzy', 'oyrl', 'wyx'],
            cooperator: ['snf', 'zzr', 'zzy', 'oyrl', 'wyx'],
          },
        },
      }
    },
  },

  // 任务面板
  {
    url: '/taskboard/getsimples',
    type: 'get',
    response: (config) => {
      return {
        code: 200,
        data: List,
      }
    },
  },
  {
    url: '/project_mine/task/getItems',
    type: 'get',
    response: (config) => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      const mockList = List3
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList,
        },
      }
    },
  },
  {
    url: '/project_other/getItems',
    type: 'get',
    response: (config) => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      const mockList = List2
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList,
        },
      }
    },
  },
]

export default dataget
