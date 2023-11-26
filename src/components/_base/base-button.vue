<template lang="pug">
button.base-button(@click="$emit('click')" :type="type") {{ label }}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
type ButtonType = 'primary' | 'secondary' | 'alert' | 'info' | 'warning'
export default defineComponent({
  name: 'BaseButton',
  emits: ['click'],
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String as () => ButtonType,
      default: 'primary' as ButtonType
    }
  },
  setup() {
    return {
    }
  },
})
</script>
<style lang="scss">
.base-button {
  --bg-color: transparent;
  --text-color: #F9F9F9;

  outline:none;
  border: none;
  cursor:pointer;

  border-radius: 4px;
  background-color: var(--bg-color);

  padding: 8px 17px;
  min-width: 72px;

  color: var(--text-color);

  font-size: 12px;
  font-weight: 500;

  transition: all 0.2s ease-in-out;

  &[type="primary"] {
    --bg-color: #57007B;
    &:hover {
      --bg-color: #DA80FF;
    }
  }
  &[type="secondary"] {
    --bg-color: #AA0070;
    &:hover {
      --bg-color: #ED71C3;
    }
  }
  &[type="alert"] {
    --bg-color: #E0395C;
    &:hover {
      --bg-color: #EF859B;
    }
  }
  &[type="info"] {
    --bg-color: #FD7A4B;
    &:hover {
      --bg-color: #FFA686;
    }
  }
  &[type="warning"] {
    --bg-color: #FFBA4B;
    &:hover {
      --bg-color: #FFCC7A;
    }
  }
}
</style>

