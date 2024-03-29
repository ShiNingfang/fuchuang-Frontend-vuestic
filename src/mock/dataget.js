import Mock from 'Mockjs'
const generateMineData = () => ({
  dataset_id: Mock.Random.increment(),
  dataset_name: Mock.Random.ctitle(3, 10),
  size: Mock.Random.integer(100, 10000),
  dataset_describe: Mock.Random.csentence(10, 30),
  dataset_address: Mock.Random.url(),
  dataset_use: Mock.Random.integer(100, 10000),
  dataset_time: Mock.Random.datetime(),
  dataset_state: Mock.Random.pick(['public', 'private', 'deleted']),
})
const generateOtherData = () => ({
  dataset_id: Mock.Random.increment(),
  dataset_name: Mock.Random.ctitle(3, 10),
  size: Mock.Random.integer(100, 10000),
  dataset_describe: Mock.Random.csentence(10, 30),
  dataset_use: Mock.Random.ctitle(5, 15),
  dataset_time: Mock.Random.datetime(),
  user_name: Mock.Random.cname(),
  user_id: Mock.Random.integer(1, 1000),
  avater_url: Mock.Random.image('200x200', Mock.Random.color()),
  available: Mock.Random.pick(['waiting', 'available', 'disavailable']),
})
const generateAuthData = () => ({
  apply_id: Mock.Random.increment(),
  dataset_name: Mock.Random.ctitle(3, 10),
  dataset_describe: Mock.Random.csentence(10, 30),
  apply_describe: Mock.Random.csentence(10, 30),
  expiration_time: Mock.Random.datetime(),
  applicant_name: Mock.Random.cname(),
  applicant_id: Mock.Random.integer(1, 1000),
  avater_url: Mock.Random.image('200x200', Mock.Random.color()),
  apply_state: Mock.Random.pick(['waiting', 'reject', 'approve']),
})
const mineData = []
const otherData = []
const authData = []

for (let i = 0; i < 20; i++) {
  mineData.push(generateMineData())
  otherData.push(generateOtherData())
  authData.push(generateAuthData())
}
const pagination = {
  page: 1,
  perPage: 10,
  total: 30,
}

const dataget = [
  // 数据
  {
    url: '/self_dataset',
    type: 'get',
    response: (config) => {
      console.log('/self_dataset')
      console.log(config)
      return {
        code: 200,
        data: mineData,
        pagination,
      }
    },
  },
  {
    url: '/other_dataset',
    type: 'get',
    response: (config) => {
      console.log('/other_dataset')
      console.log(config)
      return {
        code: 200,
        data: otherData,
        pagination,
      }
    },
  },
  {
    url: 'get_applications',
    type: 'get',
    response: (config) => {
      console.log('get_applications')
      console.log(config)
      return {
        code: 200,
        data: authData,
        pagination,
      }
    },
  },
]

export default dataget
