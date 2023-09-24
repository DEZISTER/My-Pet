<template>
  <!-- :class="colorTheme == 'dark' ? 'main-input main-input--dark' : 'main-input'" -->
  <select class="main-select" @change="updateSelect">
    <option
      v-for="option in options"
      :value="option.value"
      :selected="checkOptionValue === option.value ? 'selected' : false"
      :key="option.id"
    >
      {{ option.descr }}
    </option>
  </select>

  <!-- <select class="main-select" @change="updateSelect">
    <slot></slot>
  </select> -->
</template>

<script>
export default {
  name: "main-select",
  props: {
    modelValue: [String, Number],
    colorTheme: {
      type: String,
    },
    options: {
      type: Array,
      require: true,
      default: [],
    },
    checkOptionValue: {},
  },

  methods: {
    updateSelect(event) {
      console.log("check");
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped  lang="scss">
.main-select {
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

  &:hover, &:focus {
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset 5px -5px 0px #ffccd8b0;
  }

  &--dark {
    border: 2px solid $accent;
  }
}
</style>