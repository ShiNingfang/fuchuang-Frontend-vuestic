const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // 允许所有来源
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('attack', (data) => {
    console.log(data)
    // 模拟发送日志输出
    let counter = 0
    const attackInterval = setInterval(() => {
      // const log = []
      socket.emit('attack_output', { output: `Attack log message ${++counter}` })
      // console.log(`Attack log message ${++counter}`)
      // socket.emit('attack_output', { output: log[counter++] })
      if (counter >= 3) clearInterval(attackInterval) // 停止发送消息
    }, 1000)
    // 模拟攻击过程和结果
    setTimeout(() => {
      console.log(data)
      let result
      console.log('attack_type:' + data.params.attack_type)
      if (data.params.attack_type === 1) {
        result = {
          metrics: {
            0: {
              precision: 0.62,
              recall: 0.74,
              'f1-score': 0.68,
              support: 10000,
            },
            1: {
              precision: 0.68,
              recall: 0.55,
              'f1-score': 0.61,
              support: 10000,
            },
          },
        }
      } else if (data.params.attack_type === 0) {
        result = {
          pic: [
            '@/assets/attack_images/result1.png',
            '@/assets/attack_images/result2.png',
            '@/assets/attack_images/result3.png',
            '@/assets/attack_images/result4.png',
            '@/assets/attack_images/result5.png',
            '@/assets/attack_images/result6.png',
            '@/assets/attack_images/result7.png',
            '@/assets/attack_images/result8.png',
            '@/assets/attack_images/result9.png',
            '@/assets/attack_images/result10.png',
          ],
        }
      } else if (data.params.attack_type === 2) {
        result = {
          pic: ['@/assets/attack_images/result11.png'],
        }
      }
      console.log(result)
      socket.emit('attack_result', result)
    }, 3000) // 假设训练需要3秒钟
  })

  socket.on('train', (data) => {
    console.log(data)
    // 模拟发送日志输出
    let counter = 0
    const trainInterval = setInterval(() => {
      socket.emit('train_output', { output: `Train log message ${++counter}` })
      if (counter >= 3) clearInterval(trainInterval) // 停止发送消息
    }, 1000)

    // 模拟训练过程和结果
    setTimeout(() => {
      // 定义随机长度，例如，从5到20之间
      const length = Math.floor(Math.random() * (20 - 5 + 1) + 5)

      // 初始化准确率和损失值数组
      const acc = []
      const loss = []

      // 填充数组
      for (let i = 0; i < length; i++) {
        acc.push(Math.random().toFixed(2)) // 随机准确率，保留两位小数
        loss.push(Math.random().toFixed(2)) // 随机损失值，保留两位小数
      }

      // 假装这是训练过程产生的结果
      const mockResult = {
        acc, // 准确率数组
        loss, // 损失值数组
      }

      // 向客户端发送train_result事件和模拟的结果数据
      socket.emit('train_result', mockResult)
    }, 3000) // 假设训练需要3秒钟
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = 5000 // 可以根据需要更改端口
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
