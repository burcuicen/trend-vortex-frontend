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
        input.form__input(type="email" id="email" placeholder="Enter your email" v-model="form.email.value" @blur="validateEmail" :class="{'form__input--error': form.email.error}")
        .error(v-if="form.email.error") {{ form.email.errorMessage }}
      .form__group
        label.form__label(for="username") Username
        input.form__input(type="text" id="username" placeholder="Enter your user name" v-model="form.username.value" @blur="validateUsername" :class="{'form__input--error': form.username.error}")
        .error(v-if="form.username.error") {{ form.username.errorMessage }}
      .form__group
        label.form__label(for="password") Password
        input.form__input(type="password" id="password" placeholder="Enter your password" v-model="form.password.value" @blur="validatePassword" :class="{'form__input--error': form.password.error}")
        .error(v-if="form.password.error") {{ form.password.errorMessage }}
      .form__group
        label.form__label(for="confirmPassword") Confirm Password
        input.form__input(type="password" id="confirmPassword" placeholder="Enter your password" v-model="form.confirmPassword.value" @blur="validateConfirmPassword" :class="{'form__input--error': form.confirmPassword.error}")
        .error(v-if="form.confirmPassword.error") {{ form.confirmPassword.errorMessage }}
      .form__group
        button.form__button(@click="register") Register
    .form__footer
      .form__footer-text Already have an account?
      router-link.form__footer-link(:to="{name:'Login'}") Login
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
      form: {
        email: {
          value: '' as string,
          error: false,
          errorMessage: '',
        },
        username: {
          value: '',
          error: false,
          errorMessage: '',
        },
        password: {
          value: '',
          error: false,
          errorMessage: '',
        },
        confirmPassword: {
          value: '',
          error: false,
          errorMessage: '',
        }
      },
    }
  },

  methods: {
    validateEmail() {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(this.form.email.value)) {
        this.form.email.error = true;
        this.form.email.errorMessage = 'Invalid email format';
      } else {
        this.form.email.error = false;
        this.form.email.errorMessage = '';
      }
    },
    validateUsername() {
      if (this.form.username.value.length < 3) {
        this.form.username.error = true;
        this.form.username.errorMessage = 'Username must be at least 3 characters';
      } else {
        this.form.username.error = false;
        this.form.username.errorMessage = '';
      }
    },
    validatePassword() {
      if (this.form.password.value.length < 6) {
        this.form.password.error = true;
        this.form.password.errorMessage = 'Password must be at least 6 characters';
      } else {
        this.form.password.error = false;
        this.form.password.errorMessage = '';
      }
    },
    validateConfirmPassword() {
      if (this.form.password.value !== this.form.confirmPassword.value) {
        this.form.confirmPassword.error = true;
        this.form.confirmPassword.errorMessage = 'Passwords must match';
      } else {
        this.form.confirmPassword.error = false;
        this.form.confirmPassword.errorMessage = '';
      }
    },
    async register() {
      const { email, username, password } = this.form
      const body: {
        email: string,
        username: string,
        password: string
      } = {
        email: email.value,
        username: username.value,
        password: password.value
      }
      const { err, res } = await this.$api.auth.register(body)
      if (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Register failed'
        })
      }
      if (res) await this.login()
    },
    async login() {
      const { username, password } = this.form
      const { err, res } = await this.$api.auth.login({ username: username.value, password: password.value })
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
      this.$router.push({ name: 'Dashboard' })
    },
    resetForm() {
      this.form.email = {
        value: '',
        error: false,
        errorMessage: '',
      }
      this.form.username = {
        value: '',
        error: false,
        errorMessage: '',
      }
      this.form.password = {
        value: '',
        error: false,
        errorMessage: '',
      }
      this.form.confirmPassword = {
        value: '',
        error: false,
        errorMessage: '',
      }
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
