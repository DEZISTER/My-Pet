<template>
  <button
    :class="colorTheme == 'dark' ? 'main-button main-button--dark' : 'main-button'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "main-button",
  props: {
    colorTheme: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.main-button {
  background: $bg-accent;
  color: $accent;
  font-weight: bold;
  font-size: 14px;
  height: 50px;
  padding: 10px;
  border-radius: 50px;
  border: 3px solid $accent;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  transition-property: background-color, color, fill, border, box-shadow;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset -5px -5px 0px #ffccd8b0;
  cursor: pointer;

  &:hover,
  &:focus {
    background: $button-active;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset 5px -5px 0px #ffccd8b0;
  }

  &--dark {
    border-color: $accent;
  }
}
</style>