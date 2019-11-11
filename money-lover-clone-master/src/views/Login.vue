<template>
  <div id="login" class="mx-auto py-12 w-10/12 lg:w-2/6 md:w-1/2">
    <form 
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      v-on:submit.prevent="onSubmit"
      >
      <div class="mb-4">
        <h1 class="text-center font-semibold text-2xl md:text-4xl text-gray-800">MONEYGER</h1>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          v-model="username"
          autofocus
        />
        <p class="text-red-500 text-xs italic" v-if="!$v.username.required">Username must not be empty</p>
        <p class="text-red-500 text-xs italic" v-if="!$v.username.alphaNum">Username must contains only alphanumeric characters</p>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="password"
        />
        <p class="text-red-500 text-xs italic" v-if="!$v.password.required">Password must not be empty</p>
        <p class="text-red-500 text-xs italic" v-if="!$v.password.minLen">Password must be at least 4 characters</p>
      </div>
      <div class="flex sm:flex-row flex-col items-center justify-between mb-6 md:mb-16">
        <button 
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 sm:mb-0 rounded focus:outline-none focus:shadow-outline"
          v-bind:disabled="$v.$invalid"
        >
          Login
        </button>
        <div inline-block align-baseline>
          Do not have an account?
          <router-link
            to="/signup"
            class="font-bold text-sm text-blue-500 hover:text-blue-800"
          >Sign Up</router-link>
        </div>
      </div>

      <!-- Redirect to Sign Up -->
      <div class="text-center">
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >Forgot Password?<br/>Contact us at anhphan.csf@gmail.com</a>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, alphaNum } from "vuelidate/lib/validators";
export default {
  components: {},
  data() {
    return {
      username: "",
      password: "",
      errors: []
    };
  },
  validations: {
      username: {
          required,
          alphaNum
      },
      password: {
          required,
          minLen: minLength(4)
      }
  },
  methods: {
    onSubmit() {
      const formData = {
        username: this.username,
        password: this.password
      };
      
      this.$store.dispatch("login", {
        username: formData.username,
        password: formData.password
      });
      
      
      
    }
  }
};
</script>

<style lang="postcss" scoped></style>
