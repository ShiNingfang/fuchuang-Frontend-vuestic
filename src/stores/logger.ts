import { defineStore } from 'pinia'

export const useLoggerStore = defineStore('logger', {
  state: () => ({
    logs: [], // 用于存储日志的数组
  }),
  actions: {
    addLog(log) {
      this.logs.push(log)
    },
    clearLogs() {
      this.logs.splice(0) // 清空日志
    },
  },
})
