<template lang="pug">
q-layout
  landing-header
  q-page-container
    router-view
  landing-footer

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingHeader from 'src/components/landing/header/index.vue';
import LandingFooter from 'src/components/footer.vue';


export default defineComponent({
  name: 'MainLayout',
  components: {
    LandingHeader,
    LandingFooter
  },
});
</script>
