<template>
  <div class="signUp">
    <main-container>
      <form @submit="false" class="signUp__form">
        <p class="signUp__title">Реєстрація</p>
        <main-input
          type="text"
          placeholder="Ім'я"
          :class="
            validData.name || signData.name == ''
              ? 'signUp__form-element'
              : 'signUp__form-element signUp__form-element--incorrect'
          "
          :value="signData.name"
          @update:modelValue="checkName"
        />

        <main-input
          type="email"
          placeholder="E-mail"
          :class="
            validData.email || signData.email == ''
              ? 'signUp__form-element'
              : 'signUp__form-element signUp__form-element--incorrect'
          "
          :value="signData.email"
          @update:modelValue="checkEmail"
        />

        <main-input
          type="password"
          placeholder="Пароль"
          :class="
            validData.password || signData.password == ''
              ? 'signUp__form-element'
              : 'signUp__form-element signUp__form-element--incorrect'
          "
          :value="signData.password"
          @update:modelValue="checkPassword"
        />

        <main-input
          type="password"
          placeholder="Підтвердження пароля"
          :class="
            validData.confirmPassword || signData.confirmPassword == ''
              ? 'signUp__form-element'
              : 'signUp__form-element signUp__form-element--incorrect'
          "
          :value="signData.confirmPassword"
          @update:modelValue="checkConfirnPassword"
        />

        <main-button type="button" class="signUp__form-element" @click="signUp"
          >Зареєструватись</main-button
        >

        <p class="signUp__sign-in">
          Уже є аккаунт?&nbsp;<router-link to="/signIn" class="signUp__link"
            >Увійдіть!</router-link
          >
        </p>
      </form>
    </main-container>
  </div>
</template>

<script>
import router from "@/router/router";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      signData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validData: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      regName: /^[A-Za-z]{3,20}$/,
      regEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      regPassword: /^\w{8,15}$/,
    };
  },

  methods: {
    ...mapMutations({
      setCurrentUser: "users/setCurrentUser",
    }),
    ...mapActions({
      addPet: "users/addPet",
      signUpUser: "users/signUpUser",
    }),

    checkName(name) {
      this.signData.name = name;
      this.validData.name = this.regName.test(this.signData.name);
    },

    checkEmail(email) {
      this.signData.email = email;
      this.validData.email = this.regEmail.test(this.signData.email);
    },

    checkPassword(password) {
      this.signData.password = password;
      this.validData.password = this.regPassword.test(this.signData.password);
    },

    checkConfirnPassword(password) {
      this.signData.confirmPassword = password;
      this.validData.confirmPassword = this.regPassword.test(
        this.signData.confirmPassword
      );
    },

    signUp() {
      console.log("HELLO");
      if (
        this.signData.password == this.signData.confirmPassword &&
        this.validData.name &&
        this.validData.email &&
        this.validData.password
      ) {
        delete this.signData.confirmPassword;
        this.signUpUser(this.signData);
        this.signData.name = '';
        this.signData.email = '';
        this.signData.password = '';
        this.signData.confirmPassword = '';
        console.log("SUCCESS");
        router.push("/signIn");
      } else {
        console.log("BAD :(");
      }
    },
  },

  computed: {
    ...mapState({
      buttonSettings: (state) => state.users.buttonSettings,
    }),

    ...mapGetters({}),
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.signUp {
  min-height: calc(100vh - 60px - 70px);
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  &__form {
    display: flex;
    flex-flow: column;
    gap: 15px;
    max-width: 430px;
    margin: auto;
  }

  &__title {
    font-size: 28px;
    text-align: center;
  }

  &__form-element {
    height: 60px;
    max-width: 430px;
    width: 100%;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    max-width: 430px;

    &--incorrect {
      outline: 5px solid rgba(255, 0, 0, 0.512);
    }
  }

  &__sign-in {
    font-size: 18px;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &__link {
    color: rgb(0, 191, 255);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>