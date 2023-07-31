// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    login(payload) {
      this.token = payload.token
      this.user = payload.user
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
