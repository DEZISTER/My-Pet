<template>
  <div class="signIn">
    <main-container>
      <form @submit="false" class="signIn__form">
        <p class="signIn__title">Вхід</p>
        <main-input
          type="email"
          placeholder="E-mail"
          :class="(validData.email || signData.email == '') ? 'signIn__form-element' : 'signIn__form-element signIn__form-element--incorrect'"
          :value="signData.email"
          @update:modelValue="checkEmail"
        />

        <main-input
          type="password"
          placeholder="Пароль"
          :class="(validData.password || signData.password == '') ? 'signIn__form-element' : 'signIn__form-element signIn__form-element--incorrect'"
          :value="signData.password"
          @update:modelValue="checkPassword"
        />

        <main-button
          type="button"
          class="signIn__form-element"
          @click="signIn"
          >Увійти</main-button
        >

        <p class="signIn__sign-up">Ще нема аккаунта?&nbsp;<router-link to="/signUp" class="signIn__link">Зареєструйтесь!</router-link></p>
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
        email: '',
        password: '',
      },
      validData: {
        email: false,
        password: false,
      },
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
      signInUser: "users/signInUser",
    }),

    checkEmail(email) {
      this.signData.email = email;
      this.validData.email = this.regEmail.test(this.signData.email);
    },

    checkPassword(password) {
      this.signData.password = password;
      this.validData.password = this.regPassword.test(this.signData.password);
    },

    signIn() {
      console.log('HELLO');
      if(this.validData.email && this.validData.password) {
        this.signInUser(this.signData);
        console.log('SUCCESS');
      } else {
        console.log('BAD :(');
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
.signIn {
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

  &__sign-up {
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