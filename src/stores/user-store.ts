import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    memberSince: '',
    pfp: '',
    is2FAEnabled: false,
    id: -1,
    name: '',
    avatar: '',
    email: '', // 初始化为空字符串
    phone: '', // 初始化为空字符串
  }),
  actions: {
    toggle2FA() {
      this.is2FAEnabled = !this.is2FAEnabled
    },

    changeUserName(userName: string) {
      this.name = userName
    },

    saveLoginInfo(id: number, name: string, avatar: string) {
      this.id = id
      this.name = name
      this.avatar = avatar
    },
  },
  persist: {
    afterRestore: (ctx) => {
      console.log(`刚刚恢复完 '${ctx.store.$id}'`)
    },
  },
})
