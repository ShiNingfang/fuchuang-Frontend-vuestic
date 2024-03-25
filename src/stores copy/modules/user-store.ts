export default {
  namespaced: true,
  state: {
    userName: 'Vasili Savitski',
    email: 'vasili@gmail.com',
    memberSince: '8/12/2020',
    pfp: 'https://picsum.photos/id/22/200/300',
    is2FAEnabled: false,
    id: 12,
    fullname: 'Vasili Savitski',
    username: 'snf',
    role: 'admin',
    avatar: undefined,
    notes: 'snf hhh',
    active: true,
  },
  mutations: {
    TOGGLE_2FA(state) {
      state.is2FAEnabled = !state.is2FAEnabled
    },
    CHANGE_USER_NAME(state, userName) {
      state.userName = userName
    },
    // 其他字段的mutations
  },
  actions: {
    toggle2FA({ commit }) {
      commit('TOGGLE_2FA')
    },
    changeUserName({ commit }, userName) {
      commit('CHANGE_USER_NAME', userName)
    },
    // 其他字段的actions
  },
}
