<template>
  <input
    :value="modelValue"
    @input="updateInput"
    :class="colorTheme == 'dark' ? 'main-input main-input--dark' : 'main-input'"
  />
</template>

<script>
export default {
  name: "main-input",
  props: {
    modelValue: [String, Number],
    colorTheme: {
      type: String,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped  lang="scss">
.main-input {
  color: $accent;
  height: 50px;
  padding: 10px 20px;
  border-radius: 50px;
  border: 3px solid $accent;
  outline: none;
  transition-property: box-shadow;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset -5px -5px 0px #ffccd8b0;

  &::placeholder {
    font-weight: normal;
    color: $description-text-color;
  }

  &:hover, &:focus {
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset 5px -5px 0px #ffccd8b0;
  }

  &--dark {
    border: 3px solid $accent;
  }
}
</style>