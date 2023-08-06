<template lang="pug">
.q-pa-md.hello
  .hello__title
    | Welcome &nbsp;
    span.hello__subtitle {{ user?.username }}
  .hello__content
    | This is your dashboard page
    br
    | Ready to start?

</template>
<script lang="ts">

import { useAuthStore } from 'src/stores/auth';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DashboardPage',
  computed: {
    user() {
      return useAuthStore().user;
    },
  },
});
</script>
<style lang="scss" >
.hello {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 100px;
  font-size: 2rem;

  &__subtitle {
    font-weight: 700;
    text-transform: capitalize;
  }

  &__content {
    margin-top: 12px;
    font-size: 1.5rem;
    text-align: center;
  }


}
</style>
