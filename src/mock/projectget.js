import Mock from 'mockjs'

const generateProject = () => ({
  project_id: Mock.Random.increment(),
  project_name: Mock.Random.ctitle(3, 10),
  starter: {
    starter_id: Mock.Random.integer(1, 100),
    starter_name: Mock.Random.cname(),
    starter_avatar: Mock.Random.image('200x200', Mock.Random.color()),
  },
  cooperator_list: Array.from({ length: Mock.Random.integer(1, 3) }).map(() => ({
    cooperator_id: Mock.Random.integer(1, 100),
    cooperator_name: Mock.Random.cname(),
    cooperator_avatar: Mock.Random.image('200x200', Mock.Random.color()),
  })),
  project_type: Mock.Random.word(3, 10),
  project_time: Mock.Random.datetime(),
  project_describ: Mock.Random.csentence(10, 30),
})

const generateCooperator = () => ({
  cooperator_id: Mock.Random.increment(),
  cooperator_name: Mock.Random.cname(),
  cooperator_avatar: Mock.Random.image('200x200', Mock.Random.color()),
})

const projects = []
const cooperators = []

for (let i = 0; i < 20; i++) {
  projects.push(generateProject())
  cooperators.push(generateCooperator())
}

const pagination = {
  page: 1,
  perPage: 10,
  total: 30,
}

const projectget = [
  // 项目
  {
    url: '/self_project',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: projects,
        pagination,
      }
    },
  },
  // 项目-可选合作方
  {
    url: '/project_cooperator',
    type: 'get',
    response: (config) => {
      console.log(config)
      console.log(`project_cooperator mock`)
      console.log(cooperators)
      return {
        code: 200,
        data: cooperators,
        // pagination,
      }
    },
  },
  // 项目-我方参与
  {
    url: '/other_project',
    type: 'get',
    response: (config) => {
      console.log(config)
      return {
        code: 200,
        data: projects,
        pagination,
      }
    },
  },
]

export default projectget
