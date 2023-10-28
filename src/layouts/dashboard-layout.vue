<template lang="pug">
q-layout(view="lHh lpR fFf", class="shadow-2 rounded-borders")
    q-header(elevated)
      q-toolbar
        q-btn(flat, @click="drawer = !drawer", round, dense, icon="mdi-menu")

    q-drawer(v-model="drawer", show-if-above, :mini="!drawer || miniState", @click.capture="drawerClick", :width="250", :breakpoint="500", bordered :mini-width="100" persistent, style="position: fixed; height: 100%; overflow-y: auto;")
      q-scroll-area(class="fit", :horizontal-thumb-style="{ opacity: 0 }")
        q-list.drawer(padding)
          .drawer__menu
            q-item.q-mb-lg(clickable, v-ripple)
              q-item-section
                q-img(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/logo.png" alt="logo", avatar)
            q-item.drawer__menu-item(clickable, v-ripple, v-for="item in menu" :key="item.name" @click="$router.push({ name: item.route })")
              q-item-section(avatar)
                q-icon(:name="item.icon" size="32px" color="primary")
              q-item-section {{ item.name }}
          .drawer__actions(style="position: absolute; bottom: 20px; width: 100%")
            q-item(clickable, v-ripple @click="$router.push({ name: 'GuestHome' })")
              q-item-section(avatar style="min-width: 0")
                q-icon(name="home" size="32px" color="primary")
              q-item-section Back to Home
            q-item(clickable, v-ripple @click="$router.push({ name: 'Logout' })")
              q-item-section(avatar)
                q-icon(name="mdi-logout-variant" size="32px" color="primary")
              q-item-section Logout

    q-page-container(style="overflow-y: auto; height: calc(100vh - 50px);")
      router-view
</template>

<script lang="ts">
const MENU = [
  {
    name: 'Trends Over Time',
    icon: 'trending_up',
    route: 'TrendsOverTime'
  },
  {
    name: 'Regional Insights',
    icon: 'pin_drop',
    route: 'RegionalInsights'
  },
  {
    name: 'Keyword Explorer',
    icon: 'tag',
    route: 'KeywordExplorer'
  },
  {
    name: 'Trend Mixer',
    icon: 'blender',
    route: 'TrendMixer'
  },
  {
    name: 'Topic Tunes',
    icon: 'tune',
    route: 'TopicTunes'
  }
  // {
  //   name: 'My Research',
  //   icon: 'biotech',
  //   route: 'MyResearch'
  // },
  // {
  //   name: 'Profile',
  //   icon: 'manage_accounts',
  //   route: 'Profile'
  // }
]
export default {
  data() {
    return {
      drawer: false,
      miniState: false,
      menu: MENU
    }
  },
  methods: {
    drawerClick(e: Event) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    }
  }
}
</script>
