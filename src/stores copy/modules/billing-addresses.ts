// 假设 BillingAddress 类型已定义
import { BillingAddress } from '../types/billing-address'

// Vuex版本的store
export default {
  namespaced: true,
  state: {
    billingAddresses: [] as BillingAddress[],
    loading: false,
  },
  mutations: {
    SET_BILLING_ADDRESSES(state, billingAddresses: BillingAddress[]) {
      state.billingAddresses = billingAddresses
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },
    ADD_BILLING_ADDRESS(state, address: BillingAddress) {
      state.billingAddresses.unshift(address)
    },
    UPDATE_BILLING_ADDRESS(state, address: BillingAddress) {
      const index = state.billingAddresses.findIndex((existingCard) => existingCard.id === address.id)
      if (index !== -1) {
        state.billingAddresses.splice(index, 1, address)
      }
    },
    REMOVE_BILLING_ADDRESS(state, addressId: string) {
      state.billingAddresses = state.billingAddresses.filter((address) => address.id !== addressId)
    },
  },
  actions: {
    async loadBillingAddresses({ commit }) {
      commit('SET_LOADING', true)
      // 这里模拟获取账单地址数据的异步操作
      const billingAddresses = await fetchBillingAddresses() // 这应是实际的 API 调用
      commit('SET_BILLING_ADDRESSES', billingAddresses)
      commit('SET_LOADING', false)
    },
    addBillingAddress({ commit }, address: BillingAddress) {
      commit('ADD_BILLING_ADDRESS', address)
    },
    updateBillingAddress({ commit }, address: BillingAddress) {
      commit('UPDATE_BILLING_ADDRESS', address)
    },
    removeBillingAddress({ commit }, addressId: string) {
      commit('REMOVE_BILLING_ADDRESS', addressId)
    },
  },
}
