<template lang="pug">
q-layout(view="hHh lpR fff")
  q-header
    landing-header
  q-page-container
    router-view
  q-footer
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
