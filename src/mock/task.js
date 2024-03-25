const task = [
  // get Flow Chart Data
  // {
  //   url: '/taskboard/getAllinfo',
  //   type: 'get',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: {
  //         nodes: [
  //           {
  //             id: 'aaa',
  //             points: {
  //               targets: [],
  //               sources: ['source1', 'source2', 'source10'],
  //             },
  //             position: {
  //               left: 300,
  //               top: 100,
  //             },
  //             data: {
  //               value: '数据源1',
  //               icon: 'Coin',
  //             },
  //           },
  //           {
  //             id: 'bbb',
  //             points: {
  //               targets: ['target1', 'target2', 'target3'],
  //               sources: ['source3'],
  //             },
  //             position: {
  //               left: 300,
  //               top: 300,
  //             },
  //             data: {
  //               value: '数据预处理1',
  //               icon: 'MagicStick',
  //             },
  //           },
  //           {
  //             id: 'ccc',
  //             points: {
  //               targets: ['ccc111', 'ccc222'],
  //               sources: ['ccc333'],
  //             },
  //             position: {
  //               left: 400,
  //               top: 500,
  //             },
  //             data: {
  //               value: '深度学习1111',
  //               icon: 'Coin',
  //             },
  //           },
  //           {
  //             id: 'ddd',
  //             points: {
  //               targets: ['ddd111'],
  //               sources: ['ddd333', 'ddd222'],
  //             },
  //             position: {
  //               left: 650,
  //               top: 300,
  //             },
  //             data: {
  //               value: '特征1111',
  //               icon: 'StarFilled',
  //               nodeState: 'warning',
  //             },
  //           },
  //         ],
  //         endpoints: [
  //           {
  //             id: 'target1',
  //             data: {
  //               value: '输入',
  //             },
  //           },
  //           {
  //             id: 'target2',
  //             data: {
  //               value: '输入1',
  //             },
  //           },
  //           {
  //             id: 'source1',
  //             data: {
  //               value: '输出表1',
  //             },
  //           },
  //           {
  //             id: 'source2',
  //             data: {
  //               value: '输出表2',
  //             },
  //           },
  //           {
  //             id: 'source3',
  //             data: {
  //               value: '输出表',
  //             },
  //           },
  //           {
  //             id: 'ccc111',
  //             data: {
  //               value: '输入c1',
  //             },
  //           },
  //           {
  //             id: 'ccc222',
  //             data: {
  //               value: '输入c2',
  //             },
  //           },
  //           {
  //             id: 'ccc333',
  //             data: {
  //               value: '输出表',
  //             },
  //           },
  //           {
  //             id: 'source10',
  //             data: {
  //               value: '输出表3',
  //             },
  //           },
  //           {
  //             id: 'target3',
  //             data: {
  //               value: '输入3',
  //             },
  //           },
  //           {
  //             id: 'ddd111',
  //             data: {
  //               value: '输入',
  //             },
  //           },
  //           {
  //             id: 'ddd222',
  //             data: {
  //               value: '输出DDD',
  //             },
  //           },
  //           {
  //             id: 'ddd333',
  //             data: {
  //               value: '输出E',
  //             },
  //           },
  //         ],
  //         edges: ['source1&&target1', 'source2&&target2', 'source3&&ccc111', 'source3&&ccc222'], // 边的对应关系(sourceId -> targetId)
  //         head: 'aaa',
  //       }
  //     }
  //   }
  // },

  {
    url: '/taskboard/getAllinfo',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          nodes: [],
          endpoints: [],
          edges: [], // 边的对应关系(sourceId -> targetId)
          head: '',
        },
      }
    },
  },

  // get Menu Data
  {
    url: '/api/getMenuData',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: [
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
        ],
      }
    },
  },

  // get Menu Data
  {
    url: '/api/getMenuAttack',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: [
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
        ],
      }
    },
  },
]

export default task
