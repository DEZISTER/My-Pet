<template>
  <!-- <input ref="input" class="terminal-input" placeholder="2" @keyup.enter="printToConsole"/> -->
  <form class="user-form" @submit="false">
    <main-input
      class="user-form__elem"
      type="text"
      placeholder="Ім'я улюбленця..."
      :value="newPetTemplate.name"
      @update:modelValue="(value) => (newPetTemplate.name = value)"
    />

    <main-select
      class="user-form__elem"
      :options="petTypes"
      :checkOptionValue="newPetTemplate.petType"
      @update:modelValue="(value) => (newPetTemplate.petType = value)"
    />

    <main-input
      class="user-form__elem"
      type="email"
      placeholder="Порода..."
      :value="newPetTemplate.breed"
      @update:modelValue="(value) => (newPetTemplate.breed = value)"
    />

    <main-input
      class="user-form__elem"
      type="text"
      placeholder="Вага..."
      :value="newPetTemplate.weight"
      @update:modelValue="(value) => (newPetTemplate.weight = value)"
    />

    <main-input
      class="user-form__elem"
      type="text"
      name="search"
      placeholder="Кількість років..."
      :value="newPetTemplate.years"
      @update:modelValue="(value) => (newPetTemplate.years = value)"
    />

    <main-button
      v-if="buttonSettings === 'create'"
      type="button"
      class="user-form__elem"
      @click="createPet"
      >Створити</main-button
    >
    <main-button
      v-if="buttonSettings === 'update'"
      type="button"
      class="user-form__elem"
      @click="updatePet"
      >Оновити</main-button
    >
  </form>
</template>

<script>
import router from "@/router/router";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      petTypes: [
        { id: 0, value: "cat", descr: "Кіт" },
        { id: 1, value: "dog", descr: "Пес" },
        { id: 2, value: "fish", descr: "Рибка" },
      ],
      newPetTemplate: {},
      upd: "",
    };
  },

  methods: {
    ...mapMutations({
      setButtonSettings: "users/setButtonSettings",
    }),
    ...mapActions({
      addPet: "pets/addPet",
      editPet: "pets/editPet",
    }),

    setInfoTemplate(template) {
        if (template.petType === "cat") {
          return (template.setInfo = Number(template.weight) >= 4.5 ? "big" : "small");
        } else if (template.petType === "dog") {
          return (template.setInfo = Number(template.weight) >= 30 ? "big" : "small");
        } else if (template.petType === "fish") {
          return (template.setInfo = Number(template.weight) >= 1 ? "big" : "small");
        }
    },

    async createPet() {
      // ТУТ НАПЕВНЕ МЕНІ ДОЦІЛЬНО ОРГАНІЗУВАТИ АНІМАЦІЮ ОЧІКУВАННЯ ПЕРЕД ПЕРЕАДРЕСАЦІЄЮ, ЯКА ЗАЙМАЄ ДОЛІ СЕКУНДИ
      this.setButtonSettings("update");
      this.setInfoTemplate(this.newPetTemplate);
      this.newPetTemplate.userId = localStorage.getItem('userId');
      await this.addPet(this.newPetTemplate);
      this.newPetTemplate = {};
      router.push("/pets");
    },

    async updatePet() {
      // ТУТ НАПЕВНЕ МЕНІ ДОЦІЛЬНО ОРГАНІЗУВАТИ АНІМАЦІЮ ОЧІКУВАННЯ ПЕРЕД ПЕРЕАДРЕСАЦІЄЮ, ЯКА ЗАЙМАЄ ДОЛІ СЕКУНДИ
      this.setButtonSettings("update");
      this.setInfoTemplate(this.newPetTemplate);
      await this.editPet(this.newPetTemplate);
      this.newPetTemplate = {};
      router.push("/pets");
    },
  },

  computed: {
    ...mapState({
      buttonSettings: (state) => state.users.buttonSettings,
      currentPet: (state) => state.pets.currentPet,
    }),

    ...mapGetters({}),
  },

  async created() {
    if (this.buttonSettings === "update") {
      this.newPetTemplate = { ...this.currentPet };
    } else if (this.buttonSettings === "create") {
      this.newPetTemplate = {
        name: "",
        petType: "cat",
        breed: "",
        weight: "",
        years: "",
      };
    }
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.user-form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px - 70px);
  width: 100%;
  gap: 15px;

  &__elem {
    width: 100%;
    max-width: 430px;
  }
}
</style>