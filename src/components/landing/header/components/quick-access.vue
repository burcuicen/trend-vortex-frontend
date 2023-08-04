<template lang="pug">
.user-menu
  router-link.user-menu__item(:to="{name:'Dashboard'}")
    q-icon(name="mdi-view-dashboard-outline" size="32px" color="white")
    span Dashboard
  .user-menu__item
    q-icon(name="mdi-cog-outline" size="32px" color="white")
    span Settings
  .user-menu__item
    q-icon(name="mdi-email-outline" size="32px" color="white")
    span Contact
  router-link.user-menu__item(:to="{ name: 'Logout' }")
    q-icon(name="mdi-logout-variant" size="32px" color="white")
    span Logout
</template>
<script lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuickAccess',
  emits: ['close'],
  computed: {
    isLoggeddIn() {
      const authStore = useAuthStore();
      return authStore.isLoggedIn;
    },
  },
  mounted() {
    window.addEventListener('mousedown', this.handleClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  },

  methods: {
    handleClickOutside(event) {
      const menu = this.$el;
      if (!menu.contains(event.target)) {
        this.$emit('close');
      }
    },
  },
});
</script>
<style lang="scss">
.user-menu {
  position: absolute;

  top: 100%;
  right: 10px;

  width: 250px;
  z-index: 1001;

  background-color: $primary;
  display: flex;
  flex-direction: column;

  padding-top: 20px;
  padding-bottom: 24px;

  border-radius: 8px;

  &__item {
    cursor: pointer;

    padding: 11px 20px;

    display: flex;
    align-items: center;
    gap: 8px;

    color: $white;

    &:hover {
      background-color: $white;
      color: $primary;

      .mdi {
        color: $primary !important;
      }
    }
  }
}
</style>
