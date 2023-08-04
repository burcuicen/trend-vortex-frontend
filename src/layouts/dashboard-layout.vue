<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header(reveal elevated class="bg-primary text-white")
    q-toolbar
      q-btn.dense.flat.round(icon="mdi-menu" @click="toggleLeftDrawer")
      q-btn.dense.flat.round(icon="mdi-menu" @click="toggleRightDrawer")
      q-toolbar-title
  q-drawer(show-if-above v-model="leftDrawerOpen" side="left" bordered)
    // drawer content
  q-drawer(show-if-above v-model="rightDrawerOpen" side="right" bordered)
    // drawer content

  q-page-container
    router-view
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    }
  }
}
</script>
