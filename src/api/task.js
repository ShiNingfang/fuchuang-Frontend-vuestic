import request from '@/utils/request'

export function getTaskSource(query) {
  return request({
    url: '/taskboard/getTaskSource',
    method: 'get',
    params: query,
  })
}

export function getAttackSource(query) {
  return request({
    url: '/taskboard/getAttackSource',
    method: 'get',
    params: query,
  })
}

// export function getTaskModel(query) {
//   const res = request({
//     url: '/taskboard/getTaskModel',
//     method: 'get',
//     params: query,
//   })
//   // 在这里对结果进行转换
//   console.log(res)
//   return JSON.parse(res)
// }

export function getTaskModel(query) {
  return request({
    url: '/taskboard/getTaskModel',
    method: 'get',
    params: query,
  }).then((res) => {
    // 在这里对结果进行转换
    console.log(JSON.parse(res.data))
    return JSON.parse(res.data) // 假设返回的数据在res.data中，根据实际情况修改
  })
}

export function saveTaskModel(query) {
  return request({
    url: '/taskboard/saveTaskModel',
    method: 'post',
    params: {
      id: query.id,
      data: JSON.stringify(query.data),
    },
  })
}

export function getTaskMenu() {
  return new Promise((resolve, reject) => {
    const data = [
      {
        label: '数据源',
        id: 'source',
        icon: 'Coin',
      },
      {
        label: '隐私保护算法',
        id: 'learn',
        children: [
          {
            label: '标准模式',
            id: 'Normal Training',
            icon: 'StarFilled',
          },
          {
            label: '差分隐私',
            id: 'Differential Privacy Training',
            icon: 'StarFilled',
          },
          {
            label: '同态加密',
            id: 'Homomorphic Encryption',
            icon: 'StarFilled',
          },
          {
            label: 'XNegDL',
            id: 'Negative Database',
            icon: 'StarFilled',
          },
          {
            label: 'PPUTL',
            id: 'Improved Generative Adversarial Networks',
            icon: 'StarFilled',
          },
          {
            label: '共享数据',
            id: 'Weight Sharing for Collaborative Learning',
            icon: 'StarFilled',
          },
        ],
      },
      {
        label: '模型对比',
        id: 'contrast',
        icon: 'Coin',
      },
    ]
    resolve(data)
  })
}

export function getAttackMenu() {
  return new Promise((resolve, reject) => {
    const data = [
      {
        label: '数据源',
        id: 'source',
        icon: 'Coin',
      },
      {
        label: '加密算法',
        id: 'learn',
        children: [
          {
            label: '标准模式',
            id: 'Normal',
            icon: 'StarFilled',
          },
          {
            label: '差分隐私',
            id: 'Differential Privacy Training',
            icon: 'StarFilled',
          },
          {
            label: '同态加密',
            id: 'Homomorphic Encryption',
            icon: 'StarFilled',
          },
          {
            label: '负数据库',
            id: 'Negative Database',
            icon: 'StarFilled',
          },
          {
            label: '改进的CGAN',
            id: '改进的CGAN',
            icon: 'StarFilled',
          },
          {
            label: '矩阵变换与排序',
            id: '矩阵变换与排序',
            icon: 'StarFilled',
          },
        ],
      },
      {
        label: '攻击算法',
        id: 'attack',
        children: [
          {
            label: '梯度泄露',
            id: 'Gradient Leakage',
            icon: 'StarFilled',
          },
          {
            label: '成员推理',
            id: 'Membership Inference',
            icon: 'StarFilled',
          },
          {
            label: '模型逆向',
            id: 'Model Inversion',
            icon: 'StarFilled',
          },
        ],
      },
      // , {
      //   label: '模型对比',
      //   id: 'contrast',
      //   icon: 'Coin'
      // }
    ]
    resolve(data)
  })
}

export function getAttackModel() {
  return new Promise((resolve, reject) => {
    const data = {
      nodes: [],
      endpoints: [],
      edges: [], // 边的对应关系(sourceId -> targetId)
      head: '',
    }
    resolve(data)
  })
}
