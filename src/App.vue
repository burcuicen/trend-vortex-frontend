<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from './stores/auth';

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    authStore.initialize();
    return {
      isLoggedIn: authStore.isLoggedIn
    }

  }
});
</script>
