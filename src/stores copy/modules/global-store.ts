export default {
  namespaced: true,
  state: {
    isSidebarMinimized: false,
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.isSidebarMinimized = !state.isSidebarMinimized
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
  },
}
