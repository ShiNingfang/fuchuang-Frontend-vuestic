// src/stores/cards.ts

import { defineStore } from 'pinia'
import { sleep } from '../../services/utils'
import { PaymentCard, PaymentSystemType } from '../../pages/payments/types' // adjust the import path accordingly

// Simulated fetch function
const fetchPaymentCards = async () => {
  await sleep(1000)
  return [
    {
      id: '1',
      name: 'Main card',
      isPrimary: true,
      paymentSystem: PaymentSystemType.Visa,
      cardNumberMasked: '****1679',
      expirationDate: '0924',
    },
    {
      id: '2',
      name: 'Online shopping',
      isPrimary: false,
      paymentSystem: PaymentSystemType.MasterCard,
      cardNumberMasked: '****8921',
      expirationDate: '1123',
    },
    {
      id: '3',
      name: 'Backup Visa',
      isPrimary: false,
      paymentSystem: PaymentSystemType.MasterCard,
      cardNumberMasked: '****4523',
      expirationDate: '1222',
    },
  ]
}

// export const usePaymentCardsStore = defineStore({
//   id: 'paymentCards',
//   state: () => ({
//     paymentCards: [] as PaymentCard[],
//     loading: false,
//   }),
//   getters: {
//     currentPaymentCard: (state): PaymentCard | undefined => state.paymentCards.find((card) => card.isPrimary),
//     allPaymentCards: (state) => state.paymentCards,
//   },
//   actions: {
//     async load() {
//       this.loading = true
//       this.paymentCards = await fetchPaymentCards()
//       this.loading = false
//     },
//     create(card: PaymentCard) {
//       this.paymentCards.unshift(card)
//     },
//     update(card: PaymentCard) {
//       const index = this.paymentCards.findIndex((existingCard) => existingCard.id === card.id)
//       if (index !== -1) {
//         this.paymentCards.splice(index, 1, card)
//       }
//     },
//     remove(cardId: string) {
//       this.paymentCards = this.paymentCards.filter((card) => card.id !== cardId)
//     },
//   },
// })

export default {
  namespaced: true,
  state: {
    paymentCards: [],
    loading: false,
  },
  mutations: {
    SET_PAYMENT_CARDS(state, cards) {
      state.paymentCards = cards
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    ADD_CARD(state, card) {
      state.paymentCards.unshift(card)
    },
    UPDATE_CARD(state, card) {
      const index = state.paymentCards.findIndex((c) => c.id === card.id)
      if (index !== -1) {
        state.paymentCards.splice(index, 1, card)
      }
    },
    REMOVE_CARD(state, cardId) {
      state.paymentCards = state.paymentCards.filter((card) => card.id !== cardId)
    },
  },
  actions: {
    async load({ commit }) {
      commit('SET_LOADING', true)
      const cards = await fetchPaymentCards()
      commit('SET_PAYMENT_CARDS', cards)
      commit('SET_LOADING', false)
    },
    create({ commit }, card) {
      commit('ADD_CARD', card)
    },
    update({ commit }, card) {
      commit('UPDATE_CARD', card)
    },
    remove({ commit }, cardId) {
      commit('REMOVE_CARD', cardId)
    },
  },
  getters: {
    currentPaymentCard: (state) => state.paymentCards.find((card) => card.isPrimary),
    allPaymentCards: (state) => state.paymentCards,
  },
}
