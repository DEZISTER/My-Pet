<template>
  <footer class="my-footer">
    <main-container class="my-footer__container">
      <address class="my-footer__address">
        <div class="my-footer__info">
          <span class="my-footer__title">Telegram: </span>
          <a class="my-footer__descr" href="#"> @Kales_Nick </a>
        </div>
      </address>
    </main-container>
  </footer>
</template>

<script>
export default {
  name: "my-footer",
};
</script>

<style lang="scss" scoped>
.my-footer {
  margin: 10px auto 0;
  height: 60px;

  &__address {
    border-top: 3px solid $accent;
    padding: 20px 0;
    display: flex;
    flex-flow: column;
    gap: 20px;
  }

  &__info {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
    font-size: 16px;
  }

  &__title {
    font-weight: bold;
  }

  &__descr {
    color: $accent;
  }
}
</style>