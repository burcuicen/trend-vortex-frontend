<template lang="pug">
q-layout(view="hHh Lpr lff", class="shadow-2 rounded-borders")
  q-header(elevated)
    q-toolbar
      q-btn(flat, @click="drawer = !drawer", round, dense, icon="mdi-menu")
      q-toolbar-title Header

  q-drawer(v-model="drawer", show-if-above, :mini="!drawer || miniState", @click.capture="drawerClick", :width="200", :breakpoint="500", bordered, :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'")
    q-scroll-area(class="fit", :horizontal-thumb-style="{ opacity: 0 }")
      q-list(padding)
        q-item(clickable, v-ripple)
          q-item-section(avatar)
            q-icon(name="mdi-inbox")
          q-item-section Inbox

        q-item(active, clickable, v-ripple)
          q-item-section(avatar)
            q-icon(name="mdi-star")
          q-item-section Star

        q-item(clickable, v-ripple)
          q-item-section(avatar)
            q-icon(name="mdi-send")
          q-item-section Send

        q-item(clickable, v-ripple)
          q-item-section(avatar)
            q-icon(name="mdi-account")
          q-item-section Drafts

    div(class="q-mini-drawer-hide absolute", style="top: 15px; right: -17px")
      q-btn(dense, round, unelevated, color="accent", icon="mdi-chevron-left", @click="miniState = true")

  q-page-container
    router-view
</template>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
      miniState: false
    };
  },
  methods: {
    drawerClick(e: Event) {
      if (this.miniState) {
        this.miniState = false;
        e.stopPropagation();
      }
    }
  }
};
</script>

