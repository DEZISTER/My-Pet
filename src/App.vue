<template>
  <div class="app">
    <my-header />

    <main>
      <router-view></router-view>
    </main>

    <my-footer />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      currentPet: (state) => state.pets.currentPet,
      pets: (state) => state.pets.pets,
    }),

    ...mapGetters({}),
  },

  methods: {
    ...mapMutations({
      setCurrentUser: "users/setCurrentUser",
    }),
    ...mapActions({
      fetchUsers: "users/fetchUsers",
      getUser: "users/getUser",
      signInUser: "users/signInUser",
      fetchCatalog: "catalog/fetchCatalog",
    }),
  },

  created() {},

  mounted() {
    this.fetchCatalog();
    this.signInUser();
    // this.fetchUsers();
  },
};
</script>

<style lang="scss">
@import "@/scss/base/_modern-normalize.scss";
@import "@/scss/base/_default-settings.scss";

.app {
  background: $page-bg-color;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  height: auto;

  &::before {
    content: "";
    width: 120%;
    padding-bottom: 50vh;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
    height: 120px;
    background: $element-bg-color;
    position: absolute;
    top: 0;
    left: -10%;
    z-index: -1;
  }
}
</style>
