<template lang="pug">
.logout-page
  p Logging out...
</template>

<script lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LogoutPage',
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$q.cookies.remove('token');
      this.$router.push({ name: 'Login' });
    }
  },
  mounted() {
    this.logout();
  }
});
</script>

<style scoped>
.logout-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
