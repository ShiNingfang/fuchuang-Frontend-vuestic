import mock from 'mockjs'
const generateMineData = () => ({
  dataset_id: mock.Random.increment(),
  dataset_name: mock.Random.ctitle(3, 10),
  size: mock.Random.integer(100, 10000),
  dataset_describe: mock.Random.csentence(10, 30),
  dataset_address: mock.Random.url(),
  dataset_use: mock.Random.integer(100, 10000),
  dataset_time: mock.Random.datetime(),
  dataset_state: mock.Random.pick(['public', 'private', 'deleted']),
})
const generateOtherData = () => ({
  dataset_id: mock.Random.increment(),
  dataset_name: mock.Random.ctitle(3, 10),
  size: mock.Random.integer(100, 10000),
  dataset_describe: mock.Random.csentence(10, 30),
  dataset_use: mock.Random.ctitle(5, 15),
  dataset_time: mock.Random.datetime(),
  user_name: mock.Random.cname(),
  user_id: mock.Random.integer(1, 1000),
  avater_url: mock.Random.image('200x200', mock.Random.color()),
  availble: mock.Random.pick(['waiting', 'available', 'disavailable']),
})
const generateAuthData = () => ({
  apply_id: mock.Random.increment(),
  dataset_name: mock.Random.ctitle(3, 10),
  dataset_describe: mock.Random.csentence(10, 30),
  apply_describe: mock.Random.csentence(10, 30),
  expiration_time: mock.Random.datetime(),
  applicant_name: mock.Random.cname(),
  applicant_id: mock.Random.integer(1, 1000),
  avater_url: mock.Random.image('200x200', mock.Random.color()),
  apply_state: mock.Random.pick(['waiting', 'reject', 'approve']),
})
const mineData = mock.mock({
  'list|20': [generateMineData()],
}).list
const otherData = mock.mock({
  'list|20': [generateOtherData()],
}).list
const authData = mock.mock({
  'list|20': [generateAuthData()],
}).list
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
