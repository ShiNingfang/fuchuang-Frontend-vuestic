import Mock from 'mockjs'
const pagination = {
  page: 1,
  perPage: 10,
  total: 30,
}
const DataList = [
  {
    id: 1,
    project_name: '项目名称1',
    project_owner: {
      id: 1,
      name: '项目所有者姓名1',
      photo: '',
    },
    team: [
      {
        id: 2,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 3,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型1',
    description: '项目描述1',
    creation_date: new Date('2024-04-01T00:00:00Z'),
  },
  {
    id: 2,
    project_name: '项目名称2',
    project_owner: {
      id: 4,
      name: '项目所有者姓名2',
      photo: '',
    },
    team: [
      {
        id: 5,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 6,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型2',
    description: '项目描述2',
    creation_date: new Date('2024-04-02T00:00:00Z'),
  },
  {
    id: 3,
    project_name: '项目名称3',
    project_owner: {
      id: 7,
      name: '项目所有者姓名3',
      photo: '',
    },
    team: [
      {
        id: 8,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 9,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型3',
    description: '项目描述3',
    creation_date: new Date('2024-04-03T00:00:00Z'),
  },
  {
    id: 4,
    project_name: '项目名称4',
    project_owner: {
      id: 10,
      name: '项目所有者姓名4',
      photo: '',
    },
    team: [
      {
        id: 11,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 12,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型4',
    description: '项目描述4',
    creation_date: new Date('2024-04-04T00:00:00Z'),
  },
  {
    id: 5,
    project_name: '项目名称5',
    project_owner: {
      id: 13,
      name: '项目所有者姓名5',
      photo: '',
    },
    team: [
      {
        id: 14,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 15,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型5',
    description: '项目描述5',
    creation_date: new Date('2024-04-05T00:00:00Z'),
  },
  {
    id: 6,
    project_name: '项目名称6',
    project_owner: {
      id: 16,
      name: '项目所有者姓名6',
      photo: '',
    },
    team: [
      {
        id: 17,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 18,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型6',
    description: '项目描述6',
    creation_date: new Date('2024-04-06T00:00:00Z'),
  },
  {
    id: 7,
    project_name: '项目名称7',
    project_owner: {
      id: 19,
      name: '项目所有者姓名7',
      photo: '',
    },
    team: [
      {
        id: 20,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 21,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型7',
    description: '项目描述7',
    creation_date: new Date('2024-04-07T00:00:00Z'),
  },
  {
    id: 8,
    project_name: '项目名称8',
    project_owner: {
      id: 22,
      name: '项目所有者姓名8',
      photo: '',
    },
    team: [
      {
        id: 23,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 24,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型8',
    description: '项目描述8',
    creation_date: new Date('2024-04-08T00:00:00Z'),
  },
  {
    id: 9,
    project_name: '项目名称9',
    project_owner: {
      id: 25,
      name: '项目所有者姓名9',
      photo: '',
    },
    team: [
      {
        id: 26,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 27,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型9',
    description: '项目描述9',
    creation_date: new Date('2024-04-09T00:00:00Z'),
  },
  {
    id: 10,
    project_name: '项目名称10',
    project_owner: {
      id: 28,
      name: '项目所有者姓名10',
      photo: '',
    },
    team: [
      {
        id: 29,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 30,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型10',
    description: '项目描述10',
    creation_date: new Date('2024-04-10T00:00:00Z'),
  },
  {
    id: 11,
    project_name: '项目名称11',
    project_owner: {
      id: 31,
      name: '项目所有者姓名11',
      photo: '',
    },
    team: [
      {
        id: 32,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 33,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型11',
    description: '项目描述11',
    creation_date: new Date('2024-04-11T00:00:00Z'),
  },
  {
    id: 12,
    project_name: '项目名称12',
    project_owner: {
      id: 34,
      name: '项目所有者姓名12',
      photo: '',
    },
    team: [
      {
        id: 35,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 36,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型12',
    description: '项目描述12',
    creation_date: new Date('2024-04-12T00:00:00Z'),
  },
  {
    id: 13,
    project_name: '项目名称13',
    project_owner: {
      id: 37,
      name: '项目所有者姓名13',
      photo: '',
    },
    team: [
      {
        id: 38,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 39,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型13',
    description: '项目描述13',
    creation_date: new Date('2024-04-13T00:00:00Z'),
  },
  {
    id: 14,
    project_name: '项目名称14',
    project_owner: {
      id: 40,
      name: '项目所有者姓名14',
      photo: '',
    },
    team: [
      {
        id: 41,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 42,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型14',
    description: '项目描述14',
    creation_date: new Date('2024-04-14T00:00:00Z'),
  },
  {
    id: 15,
    project_name: '项目名称15',
    project_owner: {
      id: 43,
      name: '项目所有者姓名15',
      photo: '',
    },
    team: [
      {
        id: 44,
        name: '团队成员1姓名',
        photo: '',
      },
      {
        id: 45,
        name: '团队成员2姓名',
        photo: '',
      },
    ],
    type: '项目类型15',
    description: '项目描述15',
    creation_date: new Date('2024-04-15T00:00:00Z'),
  },
]

const AvailableList = [
  {
    id: 1,
    name: '团队成员1姓名',
    photo: '',
  },
  {
    id: 2,
    name: '团队成员2姓名',
    photo: '',
  },
  {
    id: 3,
    name: '团队成员1姓名',
    photo: '',
  },
  {
    id: 4,
    name: '团队成员2姓名',
    photo: '',
  },
  {
    id: 5,
    name: '团队成员1姓名',
    photo: '',
  },
  {
    id: 6,
    name: '团队成员2姓名',
    photo: '',
  },
  {
    id: 7,
    name: '团队成员1姓名',
    photo: '',
  },
  {
    id: 8,
    name: '团队成员2姓名',
    photo: '',
  },
  {
    id: 9,
    name: '团队成员1姓名',
    photo: '',
  },
  {
    id: 10,
    name: '团队成员2姓名',
    photo: '',
  },
]

const projectget = [
  // 项目
  {
    url: '/self_project',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: DataList,
        pagination,
      }
    },
  },
  // 项目-可选合作方
  {
    url: '/project_mine/getOptions',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: AvailableList,
        pagination,
      }
    },
  },
  // 项目-我方参与
  {
    url: '/project_other/getItems',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: DataList,
        pagination,
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
]

export default projectget
