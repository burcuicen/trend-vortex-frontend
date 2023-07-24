<template lang="pug">
.card
  q-icon.card__icon(:name="card.icon" size="34px" color="primary")
  .card__title {{ card.title }}
  .card__description {{ card.description }}

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LandingBeltCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  }
});
</script>
<style lang="scss" scoped>
.card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  height: 287px;
  width: 333px;

  padding: 27px 16px;

  border-radius: 7px;
  background: #FAFAFA;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.10);

  transition: transform 0.3s ease-in-out;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    box-shadow: 0 0 0 1px transparent, 0 0 0 1px transparent;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    box-shadow:
      0 0 0 1px transparent,
      0 0 0 1px transparent,
      0 0 0 1px linear-gradient(225deg, #F76680 0%, #57007B 100%),
      0 0 0 1px linear-gradient(225deg, #F76680 0%, #57007B 100%);
    opacity: 1;
  }

  &:hover {
    transform: translateY(5px);
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.20);
  }

  &__icon {
    background: #FAFAFA;
    border-radius: 50%;
    padding: 12px;
    border: 1px solid $primary;
  }

  &__title {
    background: linear-gradient(225deg, #F76680 0%, #57007B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 20px;
    font-weight: 600;
    line-height: 136.523%;
  }

  &__description {
    margin-top: 5px;
    color: #4A5568;
    font-size: 14px;
    font-weight: 400;
    line-height: 162.023%;
  }
}
</style>

