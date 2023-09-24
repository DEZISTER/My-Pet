<template>
  <div class="app">
    <my-header />
    <main>
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { countnMixins1 } from "@/countnMixins1";
import { countnMixins2 } from "@/countnMixins2";

export default {
  mixins: [countnMixins1, countnMixins2],
  name: "my-test-component",

  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {},

  data() {
    return {
      showModal: false,
      thingsArray: [
        { id: 0, title: "Годування", type: 1 },
        { id: 1, title: "Лежаки/Клітки", type: 2 },
      ],
    };
  },

  watch: {
    showModal: (showModal) => {
      document.body.style.overflow = showModal ? "hidden" : "auto";
    },
  },

  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),

    ...mapGetters({
      catalogFilterDefault: "catalog/catalogFilterDefault",
    }),
  },

  methods: {
    ...mapMutations({
      setCurrentUser: "users/setCurrentUser",
    }),
    ...mapActions({
      fetchUsers: "users/fetchUsers",
    }),

    updateSelect(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },

  created() {},

  mounted() {
    this.fetchCatalog();
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/base/_modern-normalize.scss";
@import "@/scss/base/_default-settings.scss";
</style>