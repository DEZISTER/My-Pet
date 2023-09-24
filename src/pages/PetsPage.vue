<template>
  <div class="pet-info">
    <main-container class="pet-info__container">
      <main-button @click="setUresFormAsCreate" class="pet-info__add">
        +
      </main-button>

      <div class="pet-info__list">
        <pet-item
          @click="setCurrentPet(pet)"
          class="pet-info__pet-item"
          :key="pet.id"
          v-for="pet in pets"
          href="#"
          :pet="pet"
        >
        </pet-item>
      </div>
    </main-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    ...mapMutations({
      setCurrentPet: "pets/setCurrentPet",
      setButtonSettings: "users/setButtonSettings",
    }),

    ...mapActions({
      deletePet: "pets/deletePet",
    }),

    setUresFormAsCreate() {
      this.setButtonSettings("create");
      this.$router.push("/settings");
    },

    async deleteThisPet(pet) {
      await this.deletePet(pet);
    },
  },

  computed: {
    ...mapState({
      pets: (state) => state.pets.pets,
    }),

    ...mapGetters({}),
  },
};
</script>

<style lang="scss" scoped>
.pet-info {
  width: 100%;
  color: white;

  &__container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px - 70px);
  }

  &__add {
    height: 70px;
    width: 100%;
    font-size: 30px;
    margin: 20px auto;
    max-width: 430px;
  }

  &__list {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    gap: 10px;
  }

  @media screen and (min-width: 480px) {
    &__list {
      gap: 20px;
    }
  }
}
</style>