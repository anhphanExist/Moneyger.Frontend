<template>
  <div>
    <div class="w-100 h-24">
      <div class="w-100 bg-white p-5">
        <form class="w-full py-5 px-6 mt-5 border-2" @submit.prevent="onSave">
          <div class="w-full text-center font-bold text-3xl mt-3 mb-8">
            Edit Profile
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Username</label
            >
            <div
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 bg-gray-300 text-gray-600 border-2"
            >
              {{ username }}
            </div>
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Old password</label
            >
            <input
              type="password"
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="password"
            />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >New password</label
            >
            <input
              type="password"
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="newPassword"
            />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Confirm new password</label
            >
            <input
              type="password"
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="confirmNewPassword"
            />
          </div>

          <p
            class="text-red-500 text-xs italic"
            v-if="
              !$v.password.required ||
                !$v.newPassword.required ||
                !$v.confirmNewPassword.required
            "
          >
            All the fields must not be left empty
          </p>

          <p
            class="text-red-500 text-xs italic"
            v-if="
              !$v.password.minLength ||
                !$v.newPassword.minLength ||
                !$v.confirmNewPassword.minLength
            "
          >
            All the passwords must be at least 6 characters
          </p>

          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.confirmNewPassword.sameAs"
          >
            Confirm password must be the same as password
          </p>

          <p class="text-red-500 text-xs italic" v-if="errors.length > 0">
            {{ errors }}
          </p>

          <div class="flex mt-4 mb-6 md:mb-0 justify-end">
            <button
              class="flex-none mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
              type="submit"
              :disabled="$v.$invalid"
            >
              Save
            </button>
            <router-link
              tag="button"
              :to="{ name: 'transaction' }"
              class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirmNewPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs("newPassword")
    }
  },
  computed: {
    username() {
      return localStorage.getItem("username");
    },
    errors() {
      return this.$store.getters.changePasswordErrors;
    }
  },
  methods: {
    async onSave() {
      const formData = {
        username: this.username,
        password: this.password,
        newPassword: this.newPassword
      };

      await this.$store.dispatch("changePassword", {
        username: formData.username,
        password: formData.password,
        newPassword: formData.newPassword
      });
      if (!this.errors.length > 0) {
        await this.$router.push({ name: "transaction" });
      }
    }
  },
  mounted() {
    this.$store.commit("setCurrentScreen", "transaction");
  },
  beforeDestroy() {
    this.$store.commit("clearErrors");
  }
};
</script>

<style></style>
