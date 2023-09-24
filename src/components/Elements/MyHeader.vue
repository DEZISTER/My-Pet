<template>
  <header class="my-header">
    <main-container class="my-header__container">
      <nav class="my-header__nav-menu nav-menu">
        <router-link to="/" class="nav-menu__link">
          <svg class="nav-menu__logo logo" width="60px" height="60px">
            <use href="@/images/icons.svg#icon-logo"></use>
          </svg>
        </router-link>
      </nav>

      <div class="settings-menu">
        <p class="settings-menu__current-user">
          {{ currentPet ? currentPet.name : "" }}
        </p>

        <router-link
          to="/pets"
          class="settings-menu__link"
          v-if="this.currentUser"
        >
          <svg class="settings-menu__icon" width="40px" height="40px">
            <use href="@/images/icons.svg#icon-pet"></use>
          </svg>
        </router-link>

        <router-link
          to="/settings"
          @click="setPetFormAsEdit"
          class="settings-menu__link"
          v-if="this.currentUser"
        >
          <svg class="settings-menu__icon" width="40px" height="40px">
            <use href="@/images/icons.svg#icon-edit"></use>
          </svg>
        </router-link>

        <router-link to="/signIn" class="settings-menu__link">
          <svg class="settings-menu__icon" width="40px" height="40px">
            <use href="@/images/icons.svg#icon-sing"></use>
          </svg>
        </router-link>
      </div>
    </main-container>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "my-header",
  props: {},

  methods: {
    ...mapMutations({
      setButtonSettings: "users/setButtonSettings",
    }),

    ...mapActions({}),

    setPetFormAsEdit() {
      this.setButtonSettings("update");
    },
  },

  computed: {
    ...mapState({
      currentPet: (state) => state.pets.currentPet,
      buttonSettings: (state) => state.users.buttonSettings,
      currentUser: (state) => state.users.currentUser,
    }),

    ...mapGetters({}),
  },
};
</script>

<style lang="scss" scoped>
.my-header {
  color: $accent;
  width: 100%;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__logo {
    height: 60px;
    width: 60px;
    fill: $accent;
  }
}

.logo {
  transition-property: background-color, color, border, fill;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.settings-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid $accent;
    background: $bg-accent;
    fill: $accent;
    transition-property: background-color, box-shadow;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset -5px -5px 0px #ffccd8b0;

    &:hover {
      background: white;
      box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3), inset 5px -5px 0px #ffccd8b0;
    }

    &.router-link-active {
      background: $accent;
      fill: $bg-accent;
      box-shadow: none;
    }
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 10px;
    transition-property: background-color, color, fill, border, box-shadow;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>