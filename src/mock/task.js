const taskSource = [
  {
    owner: {
      id: 1,
      name: '所有者姓名1',
      photo: '',
    },
    data: {
      id: 1,
      name: '样本名称1',
      number: 10,
      description: '样本描述1',
      path: '/sample/1',
    },
  },
  {
    owner: {
      id: 2,
      name: '所有者姓名2',
      photo: '',
    },
    data: {
      id: 2,
      name: '样本名称2',
      number: 8,
      description: '样本描述2',
      path: '/sample/2',
    },
  },
  {
    owner: {
      id: 3,
      name: '所有者姓名3',
      photo: '',
    },
    data: {
      id: 3,
      name: '样本名称3',
      number: 15,
      description: '样本描述3',
      path: '/sample/3',
    },
  },
  {
    owner: {
      id: 4,
      name: '所有者姓名4',
      photo: '',
    },
    data: {
      id: 4,
      name: '样本名称4',
      number: 5,
      description: '样本描述4',
      path: '/sample/4',
    },
  },
  {
    owner: {
      id: 5,
      name: '所有者姓名5',
      photo: '',
    },
    data: {
      id: 5,
      name: '样本名称5',
      number: 12,
      description: '样本描述5',
      path: '/sample/5',
    },
  },
  {
    owner: {
      id: 6,
      name: '所有者姓名6',
      photo: '',
    },
    data: {
      id: 6,
      name: '样本名称6',
      number: 7,
      description: '样本描述6',
      path: '/sample/6',
    },
  },
  {
    owner: {
      id: 7,
      name: '所有者姓名7',
      photo: '',
    },
    data: {
      id: 7,
      name: '样本名称7',
      number: 9,
      description: '样本描述7',
      path: '/sample/7',
    },
  },
  {
    owner: {
      id: 8,
      name: '所有者姓名8',
      photo: '',
    },
    data: {
      id: 8,
      name: '样本名称8',
      number: 11,
      description: '样本描述8',
      path: '/sample/8',
    },
  },
  {
    owner: {
      id: 9,
      name: '所有者姓名9',
      photo: '',
    },
    data: {
      id: 9,
      name: '样本名称9',
      number: 6,
      description: '样本描述9',
      path: '/sample/9',
    },
  },
  {
    owner: {
      id: 10,
      name: '所有者姓名10',
      photo: '',
    },
    data: {
      id: 10,
      name: '样本名称10',
      number: 13,
      description: '样本描述10',
      path: '/sample/10',
    },
  },
  {
    owner: {
      id: 11,
      name: '所有者姓名11',
      photo: '',
    },
    data: {
      id: 11,
      name: '样本名称11',
      number: 4,
      description: '样本描述11',
      path: '/sample/11',
    },
  },
  {
    owner: {
      id: 12,
      name: '所有者姓名12',
      photo: '',
    },
    data: {
      id: 12,
      name: '样本名称12',
      number: 8,
      description: '样本描述12',
      path: '/sample/12',
    },
  },
  {
    owner: {
      id: 13,
      name: '所有者姓名13',
      photo: '',
    },
    data: {
      id: 13,
      name: '样本名称13',
      number: 10,
      description: '样本描述13',
      path: '/sample/13',
    },
  },
  {
    owner: {
      id: 14,
      name: '所有者姓名14',
      photo: '',
    },
    data: {
      id: 14,
      name: '样本名称14',
      number: 7,
      description: '样本描述14',
      path: '/sample/14',
    },
  },
  {
    owner: {
      id: 15,
      name: '所有者姓名15',
      photo: '',
    },
    data: {
      id: 15,
      name: '样本名称15',
      number: 12,
      description: '样本描述15',
      path: '/sample/15',
    },
  },
]
const attackSource = [
  {
    id: 1,
    name: '样本名称1',
    number: 10,
    description: '样本描述1',
    path: '/sample/1',
  },
  {
    id: 2,
    name: '样本名称2',
    number: 8,
    description: '样本描述2',
    path: '/sample/2',
  },
  {
    id: 3,
    name: '样本名称3',
    number: 15,
    description: '样本描述3',
    path: '/sample/3',
  },
  {
    id: 4,
    name: '样本名称4',
    number: 5,
    description: '样本描述4',
    path: '/sample/4',
  },
  {
    id: 5,
    name: '样本名称5',
    number: 12,
    description: '样本描述5',
    path: '/sample/5',
  },
  {
    id: 6,
    name: '样本名称6',
    number: 7,
    description: '样本描述6',
    path: '/sample/6',
  },
  {
    id: 7,
    name: '样本名称7',
    number: 9,
    description: '样本描述7',
    path: '/sample/7',
  },
  {
    id: 8,
    name: '样本名称8',
    number: 11,
    description: '样本描述8',
    path: '/sample/8',
  },
  {
    id: 9,
    name: '样本名称9',
    number: 6,
    description: '样本描述9',
    path: '/sample/9',
  },
  {
    id: 10,
    name: '样本名称10',
    number: 13,
    description: '样本描述10',
    path: '/sample/10',
  },
  {
    id: 11,
    name: '样本名称11',
    number: 4,
    description: '样本描述11',
    path: '/sample/11',
  },
  {
    id: 12,
    name: '样本名称12',
    number: 8,
    description: '样本描述12',
    path: '/sample/12',
  },
  {
    id: 13,
    name: '样本名称13',
    number: 10,
    description: '样本描述13',
    path: '/sample/13',
  },
  {
    id: 14,
    name: '样本名称14',
    number: 7,
    description: '样本描述14',
    path: '/sample/14',
  },
  {
    id: 15,
    name: '样本名称15',
    number: 12,
    description: '样本描述15',
    path: '/sample/15',
  },
  {
    id: 16,
    name: '样本名称16',
    number: 9,
    description: '样本描述16',
    path: '/sample/16',
  },
  {
    id: 17,
    name: '样本名称17',
    number: 11,
    description: '样本描述17',
    path: '/sample/17',
  },
  {
    id: 18,
    name: '样本名称18',
    number: 6,
    description: '样本描述18',
    path: '/sample/18',
  },
  {
    id: 19,
    name: '样本名称19',
    number: 13,
    description: '样本描述19',
    path: '/sample/19',
  },
  {
    id: 20,
    name: '样本名称20',
    number: 5,
    description: '样本描述20',
    path: '/sample/20',
  },
]

const model = {
  nodes: [],
  endpoints: [],
  edges: [], // 边的对应关系(sourceId -> targetId)
  head: '',
}
const task = [
  // 保存模型
  {
    url: '/taskboard/saveTaskModel',
    type: 'post',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
      }
    },
  },

  // 获取任务数据源
  {
    url: '/taskboard/getTaskSource',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: taskSource,
      }
    },
  },

  // 获取攻击数据源
  {
    url: '/taskboard/getAttackSource',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: attackSource,
      }
    },
  },

  // 获取任务模型
  {
    url: '/taskboard/getTaskModel',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: JSON.stringify(model),
      }
    },
  },
]

export default task
