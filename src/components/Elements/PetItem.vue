<template>
  <a @click="setCurrentPet(pet)" class="pet-item" href="#">
    <div class="pet-item__bg">
      <svg class="pet-item__pet-img" width="60px" height="60px">
        <use href="@/images/icons.svg#icon-logo"></use>
      </svg>

      <button @click.stop class="pet-item__delete-btn" @click="deleteThisPet(pet)">
        <span>x</span>
      </button>
    </div>

    <p class="pet-item__pet-name">{{ pet.name }}</p>
  </a>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "pet-item",
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations({
      setCurrentPet: "pets/setCurrentPet",
    }),

    ...mapActions({
      deletePet: "pets/deletePet",
    }),

    async deleteThisPet(pet) {
      await this.deletePet(pet);
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
.pet-item {
  height: auto;
  width: 70px;
  font-size: 16px;
  display: flex;
  flex-flow: column;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;

  &__delete-btn {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    background: $bg-accent;
    color: $accent;
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    right: 0;
    top: 0;
    border: 2px solid $accent;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset -5px -5px 0px #ffccd8b0;
    transition-property: background-color, color, border, box-shadow;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &:hover,
    &:focus {
      background: $accent;
      color: $second-accent;
      box-shadow: none;
    }
  }

  &__bg {
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    position: relative;
    border: 2px solid white;
    background: $bg-accent;
    color: $accent;
    font-weight: bold;
    border: 3px solid $accent;
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
  }

  &__pet-img {
    padding: 10px;
    fill: $accent;
    transition-property: filter;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__pet-name {
    color: $accent;
  }
}
</style>