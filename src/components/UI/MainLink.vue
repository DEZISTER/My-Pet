<template>
  <a class="main-link"><slot></slot></a>
</template>

<script>
export default {
  name: "main-link",
};
</script>

<style lang="scss" scoped>
.main-link {
  font-weight: 500;
    font-size: 18px;
    line-height: 35px;
    text-transform: uppercase;
    color: $mainAccent;

    &:hover, &:focus {
      text-decoration: underline;
      @include baseAnimation();
    }
}
</style>