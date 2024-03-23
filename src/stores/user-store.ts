import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: 'Vasili Savitski',
    email: 'vasili@gmail.com',
    memberSince: '8/12/2020',
    pfp: 'https://picsum.photos/id/22/200/300',
    is2FAEnabled: false,
    // Adding optional fields from the User type
    id: 12,
    fullname: 'Vasili Savitski',
    username: 'snf',
    role: 'admin',
    avatar: undefined,
    notes: 'snf hhh',
    active: true,
  }),
  actions: {
    toggle2FA() {
      this.is2FAEnabled = !this.is2FAEnabled
    },

    changeUserName(userName: string) {
      this.userName = userName
    },

    // You can add more actions here to update the additional fields
  },
})
