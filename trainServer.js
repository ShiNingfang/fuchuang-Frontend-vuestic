const express = require('express')
const http = require('http')
const socketIoClient = require('socket.io-client')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(express.json())

// 连接到运行在5000端口的后端服务
const backendSocket = socketIoClient('http://localhost:5000')
// 看来发送事件的时候不需要定义，接收事件的时候要定义
backendSocket.on('train_output', (data) => {
  console.log('训练输出 : ', data.output)
  // 将训练输出转发给所有连接到中间件服务器的前端客户端
  io.emit('train_output', data)
})

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// 暂且不考虑同意的弹窗
app.post('/data_source', (req, res) => {
  console.log('从前端接收消息:', req.body)

  // 发送data_source_query事件
  io.emit('data_source_query', { message: '新的训练请求已接收，正在处理...' })

  // 设置一个超时，以防未收到响应
  const timeout = setTimeout(() => {
    // res.status(408).json({ error: '请求超时' })
    const data = {
      result: 'success',
    }
    res.json(data)
  }, 2000) // 设置超时时间为5秒

  // 监听data_source_result事件
  const onResponse = (data) => {
    clearTimeout(timeout) // 收到响应，取消超时
    res.json(data) // 将收到的数据作为HTTP响应返回
    io.off('data_source_result', onResponse) // 移除监听器，避免内存泄漏
  }

  io.on('data_source_result', onResponse)
})

// 转发来自前端的train请求到5000端口的后端服务
app.post('/train', (req, res) => {
  console.log('从前端接收消息:', req.body)

  // 发送train请求到后端
  backendSocket.emit('train', req.body)

  // 监听来自后端的train_result事件
  const onResponse = (data) => {
    console.log('Received train result from backend:', data)
    // 将后端的响应直接返回给前端
    res.json(data)
    // 为了避免重复监听，接收到数据后立即移除监听器
    backendSocket.off('train_result', onResponse)
  }
  backendSocket.on('train_result', onResponse)
})

server.listen(3001, () => {
  console.log('中间件服务器端运行在http://localhost:3001')
})
