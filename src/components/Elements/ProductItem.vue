<template>
  <a
    class="product-card"
  >
    <div class="product-card__container">
      <div class="product-card__img-container">
        <div class="product-card__logo-container">
          <svg class="product-card__logo logo" width="80%" height="80%">
            <use href="@/images/icons.svg#icon-logo"></use>
          </svg>
        </div>

        <img class="product-card__img" :src="productItem.img" />
      </div>
      <h3 class="product-card__title">{{ productItem.title }}</h3>
      <div class="product-card__inner">
        <p class="product-card__price">
          <b>{{ productItem.price }}</b> грн.
        </p>
        <main-button class="product-card__btn" @click="openItemModal(productItem)"
          >Детальніше</main-button
        >
      </div>
    </div>
  </a>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "product-item",
  props: {
    productItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations({
      setShowItemModal: "catalog/setShowItemModal",
      setCurrentItem: "catalog/setCurrentItem",
    }),

    ...mapActions({}),

    openItemModal(productItem) {
      this.setCurrentItem(productItem);
      this.setShowItemModal(true);
    },
  },

  computed: {
    ...mapState({
    }),
    
    ...mapGetters({}),
  },

  created() {},
};
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  overflow: hidden;
  color: $accent;
  background: $page-bg-color;
  background: $second-sub-accent;
  border-radius: 15px;
  border: 3px solid $accent;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  // background-image: url("@/images/card-bg.jpg");
  // background-repeat: no-repeat;
  //   background-position: center;
  //   background-size: cover;

  // &::before {
  //   content: '';
  //   width: 95%;
  //   padding-bottom: 95%;
  //   background: $bg-elem-first;
  //   border-radius: 50%;
  //   position: absolute;
  //   top: -25%;
  //   left: -25%;
  // }

  // &::after {
  //   content: '';
  //   width: 50%;
  //   padding-bottom: 50%;
  //   background: $bg-elem-second;
  //   border-radius: 50%;
  //   position: absolute;
  //   bottom: 10%;
  //   right: -25%;
  // }

  &__container {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 30px 15px;
    height: 100%;
    gap: 15px;
    position: relative;
    z-index: 1;
  }

  &__img-container {
    position: relative;
    width: 70%;
    padding-bottom: 70%;
  }

  &__logo-container {
    width: 35%;
    padding-bottom: 35%;
    background: $second-accent;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    border-radius: 50%;
    box-sizing: content-box;
  }

  &__logo {
    position: absolute;
    fill: $logo-dark-theme;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  &__img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
    background: white;
    border: 1px solid white;
  }

  &__title {
    font-size: 16px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__inner {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
    position: relative;

    &::before {
      content: "";
      width: 130%;
      padding-bottom: 95%;
      background: #956c687a;
      border-radius: 50%;
      position: absolute;
      left: -15%;
      top: 35px;
      right: 0%;
      margin: auto;
      z-index: -1;
    }
  }
}
</style>