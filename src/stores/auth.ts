import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    get isLoggedIn() {
      return !!this.token
    }
  }),
  actions: {
    initialize() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
      }
    },
    login(payload) {
      this.token = payload.token
      this.user = payload.user
      localStorage.setItem('token', payload.token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
