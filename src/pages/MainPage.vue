<template>
  <div class="main-page">
    <main-container>
      <form
        @submit="false"
        :class="
          !showCatalog
            ? `main-page__form`
            : `main-page__form main-page__form--for-catalog`
        "
      >
        <main-input
          type="text"
          name="search"
          placeholder="Назва..."
          class="main-page__form-element"
          :value="searchValue"
          @update:modelValue="changeVisualForm"
          :colorTheme="!showCatalog ? null : `dark`"
        />

        <main-button
          type="button"
          class="main-page__form-element"
          :colorTheme="!showCatalog ? null : `dark`"
          :style="!showCatalog ? null : `max-width: 100px`"
          @click="searchItem"
          >Пошук</main-button
        >
      </form>

      <div class="main-page__catalog catalog" v-if="showCatalog">
        <div v-if="searchValue === ''">
          <div
            class="catalog__container"
            :key="thing.id"
            v-for="thing in thingsArray"
          >
            <h2 class="catalog__title">{{ thing.title }}</h2>
            <div class="catalog__list">
              <product-item
                class="catalog__product-card"
                :key="item.id"
                v-for="item in catalogFilterDefault(thing.type)"
                :productItem="item"
              ></product-item>
            </div>
          </div>
        </div>

        <div class="catalog__container" v-else>
          <div class="catalog__list">
            <product-item
              class="catalog__product-card"
              :key="item.id"
              v-for="item in catalogFilterSearch(searchValue)"
              :productItem="item"
            ></product-item>
          </div>
        </div>
      </div>
    </main-container>
  </div>

  <my-modal
    :showModal="showItemModal"
    @hideModal="setShowItemModal(event)"
    class="item-modal"
  >
    <div class="item-modal__container">
      <img class="item-modal__main-image" :src="currentItem.img" />
      <div class="item-modal__main-info">
        <h3 class="item-modal__title">{{ currentItem.title }}</h3>
        <p class="item-modal__descr">
          {{ currentItem.body }}
        </p>
      </div>

      <div class="item-modal__sub-info">
        <p class="item-modal__price">
          <span>Ціна:</span> {{ currentItem.price }} грн.
        </p>
        <main-button class="item-modal__buy-btn" @click="buyItem"
          >Купити</main-button
        >
      </div>
    </div>

    <h3 class="item-modal__reccom-title">Рекомендуємо також:</h3>
    <div class="item-modal__reccom-list reccom-list">
      <a
        href="#"
        class="reccom-list__card"
        :key="reccomItem.id"
        v-for="reccomItem in getAdditionalReccom(currentItem)"
      >
        <div class="reccom-list__img-container">
          <img class="reccom-list__img" :src="reccomItem.img" />
        </div>
        <div class="reccom-list__info">
          <h3 class="reccom-list__title">{{ reccomItem.title }}</h3>
          <main-button class="reccom-list__detail-btn">Детальніше</main-button>
        </div>
      </a>
    </div>
  </my-modal>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      showCatalog: false,
      searchValue: "",
      thingsArray: [
        { id: 0, title: "Годування", type: 1 },
        { id: 1, title: "Лежаки/Клітки", type: 2 },
        { id: 2, title: "Іграшки", type: 3 },
        { id: 3, title: "Засоби догляду", type: 4 },
      ],
    };
  },

  computed: {
    ...mapState({
      showItemModal: (state) => state.catalog.showItemModal,
      currentItem: (state) => state.catalog.currentItem,
    }),

    ...mapGetters({
      catalogFilterDefault: "catalog/catalogFilterDefault",
      catalogFilterSearch: "catalog/catalogFilterSearch",
      getAdditionalReccom: "catalog/getAdditionalReccom",
    }),
  },

  methods: {
    ...mapMutations({
      setShowItemModal: "catalog/setShowItemModal",
    }),

    ...mapActions({
      fetchCatalog: "catalog/fetchCatalog",
    }),

    buyItem() {
      this.setShowItemModal(false);
      alert("Товар придбано!");
    },

    changeVisualForm(searchValue) {
      // @input="changeVisualForm" - відповідно пишемо це в Input
      // console.log(searchValue.target.value)
      // this.searchValue = searchValue.target.value;
      console.log(searchValue);
      this.searchValue = searchValue;
      this.showCatalog = true;
      sessionStorage.setItem('catalog', this.showCatalog);
      console.log('set');
    },

    searchItem() {
      this.showCatalog = true;
      sessionStorage.setItem('catalog', this.showCatalog);
    },
  },

  mounted() {
    this.fetchCatalog();
    this.showCatalog = sessionStorage.getItem('catalog');
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  min-height: calc(100vh - 60px - 70px);

  &__form {
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    width: 100%;

    &--for-catalog {
      flex-flow: row;
      height: 40px;
      margin-top: 15px;
      gap: 15px;
    }
  }

  &__form-element {
    width: 100%;
    margin: 0;
    height: 60px;
    font-size: 16px;
    font-weight: bold;
    max-width: 430px;
  }
}

.catalog {
  min-height: calc(100vh - 60px);

  &__container {
    width: 100%;
    margin: 25px auto;
    color: $accent;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__list {
    color: white;
    width: 100%;
    display: flex;
    align-content: baseline;
    flex-flow: column;
    gap: 15px;
  }

  &__product-card {
    width: 100%;
  }

  @media screen and (min-width: 380px) {
    &__list {
      flex-flow: row wrap;
    }

    &__product-card {
      width: calc((100% - 15px) / 2);
    }
  }
  @media screen and (min-width: 480px) {
  }
  @media screen and (min-width: 768px) {
    &__product-card {
      width: calc((100% - 30px) / 3);
    }
  }
  @media screen and (min-width: 1200px) {
    &__product-card {
      width: calc((100% - 45px) / 4);
    }
  }
}

.item-modal {
  &__container {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
  }

  &__main-image {
    width: 100%;
    margin-bottom: 15px;
  }

  &__main-info {
    display: flex;
    flex-flow: column;
    gap: 15px;
    text-align: left;
    width: 100%;
    margin-bottom: 30px;
  }

  &__title {
    color: $accent;
    text-align: center;
    font-size: 22px;
  }

  &__descr {
    font-size: 14px;
    text-align: justify;
  }

  &__sub-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__price span {
    font-weight: bold;
    color: $accent;
  }

  &__buy-btn {
    width: 100px;
    height: 50px;
  }

  &__reccom-list {
    display: flex;
    flex-flow: column;
    width: 100%;
    gap: 10px;
  }

  &__reccom-title {
    color: $accent;
    text-align: center;
    margin: 30px auto 10px;
  }

  @media screen and (min-width: 480px) {
  }

  @media screen and (min-width: 768px) {
    &__main-image {
      width: 50%;
    }
  }
}

.reccom-list {
  &__card {
    padding: 15px;
    border: 2px solid $accent;
    background: white;
    border-radius: 10px;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
    gap: 10px;
  }

  &__info {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: calc(100% - 90px);
  }

  &__img-container {
    height: 80px;
    width: 80px;
    border: 1px solid rgba(0, 0, 0, 0);
    overflow: hidden;
    border-radius: 50%;
    box-shadow: none;
  }

  &__img {
    background: $accent;
    width: 100%;
  }

  &__title {
    color: $accent;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__detail-btn {
    margin: 0 0 0 auto;
  }
}
</style>