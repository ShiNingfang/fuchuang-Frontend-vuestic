export default {
  namespaced: true,
  state: {
    notifications: {
      searchingForAJob: {
        name: 'Searching for a job',
        isEnabled: true,
      },
      hiringSomeone: {
        name: 'Hiring someone',
        isEnabled: false,
      },
      connectingWithOthers: {
        name: 'Connecting with others',
        isEnabled: true,
      },
      postingAndCommenting: {
        name: 'Posting and commenting',
        isEnabled: true,
      },
      messaging: {
        name: 'Messaging',
        isEnabled: true,
      },
      groups: {
        name: 'Groups',
        isEnabled: false,
      },
      pages: {
        name: 'Pages',
        isEnabled: true,
      },
      attendingEvents: {
        name: 'Attending events',
        isEnabled: true,
      },
      newsAndReports: {
        name: 'News and reports',
        isEnabled: false,
      },
      updatingYourProfile: {
        name: 'Updating your profile',
        isEnabled: true,
      },
      verifications: {
        name: 'Verifications',
        isEnabled: true,
      },
    },
  },
  mutations: {
    TOGGLE_NOTIFICATION(state, { notificationKey }) {
      if (state.notifications[notificationKey]) {
        state.notifications[notificationKey].isEnabled = !state.notifications[notificationKey].isEnabled
      }
    },
    // 如果需要，可以添加更多的mutations来处理通知设置的更新
  },
  actions: {
    toggleNotification({ commit }, notificationKey) {
      commit('TOGGLE_NOTIFICATION', { notificationKey })
    },
    // 如果需要，可以添加更多的actions来处理异步逻辑
  },
  getters: {
    getNotification: (state) => (notificationKey) => {
      return state.notifications[notificationKey]
    },
    // 可以根据需要添加更多的getters
  },
}
