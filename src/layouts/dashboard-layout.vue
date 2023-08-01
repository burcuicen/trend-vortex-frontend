<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.elevated(class="bg-primary text-white")
    q-toolbar
      q-btn.dense.flat.round(icon="mdi-menu" @click="toggleLeftDrawer")

      q-toolbar-title
  q-drawer(show-if-above v-model="leftDrawerOpen" side="left" bordered)
    // drawer content

  q-page-container
    router-view
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>
