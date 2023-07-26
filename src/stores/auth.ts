// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    login(payload) {
      this.user = payload.user
      this.token = payload.token
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
