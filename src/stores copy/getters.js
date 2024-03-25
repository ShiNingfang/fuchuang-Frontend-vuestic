const getters = {
  // 假设你有一个app模块，里面存有sidebar, size, device等状态
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  // ... 其他app相关的getters ...

  // tagsView模块的getters
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,

  // user模块的getters
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,

  // permission模块的getters
  permission_routes: (state) => state.permission.routes,

  // errorLog模块的getters
  errorLogs: (state) => state.errorLog.logs,

  // logger模块的getters
  logs: (state) => state.logger.logs, // 获取所有日志

  // attack_logger模块的getters
  attack_logs: (state) => state.attack_logger.logs, // 获取攻击日志

  // paymentCards模块的getters
  currentPaymentCard: (state) => state.paymentCards.currentPaymentCard,
  allPaymentCards: (state) => state.paymentCards.allPaymentCards,

  // notifications模块的getters
  notifications: (state) => state.notifications.notifications,
}

export default getters
