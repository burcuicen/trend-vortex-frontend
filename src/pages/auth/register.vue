<template lang="pug">
.register
  .register__form.form
    .form__header
      .form__header-pretitle Welcome !
      .form__header-title Sign up to
      .form__header-subtitle Trend Vortex Web App
    .form__body
      .form__group
        label.form__label(for="email") Email
        input.form__input(type="email" id="email" placeholder="Enter your email" v-model="email")
      .form__group
        label.form__label(for="username") Username
        input.form__input(type="text" id="username" placeholder="Enter your user name" v-model="username")
      .form__group
        label.form__label(for="password") Password
        input.form__input(type="password" id="password" placeholder="Enter your password" v-model="password")
      .form__group
        label.form__label(for="confirmPassword") Confirm Password
        input.form__input(type="confirmPassword" id="confirmPassword" placeholder="Enter your password" v-model="confirmPassword")
      .form__group
        button.form__button(@click="register") Register
    .form__footer
      .form__footer-text Already have an account?
      router-link.form__footer-link(to="/login") Login
  .register__asset
    q-img(src="https://trend-vortex.s3.eu-north-1.amazonaws.com/register.svg" alt="Register")
</template>

<script lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async register() {
      const { email, username, password } = this
      const { err, res } = await this.$api.auth.register({ email, username, password })
      if (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Register failed'
        })
      }
      if (res) return await this.login()
    },
    async login() {
      const { username, password } = this
      const { err, res } = await this.$api.auth.login({ username, password })
      if (err) {
        return this.$q.notify({
          color: 'negative',
          message: 'Login failed'
        })
      }
      const token = res.data.token
      await this.saveUser(token)
    },
    async saveUser(token: string) {
      const { err, res } = await this.$api.auth.getUserFromToken(token)
      if (err) {
        return this.$q.notify({
          color: 'negative',
          message: 'Login failed'
        })
      }
      const authStore = useAuthStore()

      authStore.login({ token, user: res.data })
      this.$q.cookies.set('token', token)

      this.$q.notify({
        color: 'positive',
        message: 'Register successful'
      })
      this.resetForm()
    },
    resetForm() {
      this.email = ''
      this.username = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
});
</script>
<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 41px;

  padding-top: 33px;
  padding-bottom: 54px;

  &__form {
    display: flex;
    flex-direction: column;

    gap: 20px;

    padding: 14px 47px 25px 35px;

    width: 505px;

    background-color: $white;

    border-radius: 10px;
    border: 0.5px solid #878787;
    box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      padding: 25px 24px 21px 23px;
      width: 90%;
      gap: 30px;
    }
  }

  &__asset {
    height: 600px;
    width: 600px;

    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
