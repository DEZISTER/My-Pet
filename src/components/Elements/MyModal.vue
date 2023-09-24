<template>
  <div class="my-modal" v-if="showModal" @click="hideModal">
    <div @click.stop class="my-modal__card">
      <div class="my-modal__close-container">
        <main-button class="my-modal__close-btn" @click="hideModal"
          >x</main-button
        >
      </div>

      <div class="my-modal__container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-modal",
  props: {
    showModal: {
      type: Boolean,
    },
  },

  watch: {
    showModal: (showModal) => {
      document.body.style.overflow = showModal ? "hidden" : "auto";
    },
  },

  methods: {
    hideModal() {
      this.$emit("hideModal", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  margin: auto;
  color: black;
  z-index: 1000;
  padding: 0 25px;

  &__card {
    overflow-x: hidden;
    background: white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 80vh;
    width: 100%;
    position: relative;
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;
    margin: auto;

    &::before {
      content: "";
      width: 130%;
      height: 50vh;
      padding-bottom: 95%;
      background: #ffccd8;
      border-radius: 50%;
      position: absolute;
      left: -15%;
      top: -80px;
      right: 0%;
      margin: auto;
    }

    @media screen and (min-width: 480px) {
      width: 430px;
    }

    @media screen and (min-width: 768px) {
      width: 718px;
      &::before {
      content: "";
      width: 130%;
      height: 100vh;
      padding-bottom: 95%;
      background: #ffccd8;
      border-radius: 50%;
      position: absolute;
      left: -15%;
      top: -50%;
      right: 0%;
      margin: auto;
    }
    }
  }

  &__container {
    padding: 60px 15px;
    z-index: 1;
  }

  &__close-container {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  &__close-btn {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: absolute;
    top: 15px;
    right: 15px;
    border: 3px solid $accent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>