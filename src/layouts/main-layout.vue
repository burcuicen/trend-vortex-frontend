<template lang="pug">
q-layout
  landing-header
  q-page-container
    router-view

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingHeader from 'src/components/header.vue';


export default defineComponent({
  name: 'MainLayout',
  components: {
    LandingHeader,
  },
});
</script>
