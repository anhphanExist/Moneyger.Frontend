<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="w-100 h-24">
      <div class="w-100 bg-white p-5">
        <form class="w-full py-5 px-6 mt-5 border-2" @submit.prevent="onSave">
          <div class="w-full text-center font-bold text-3xl mt-3 mb-8">
            Edit Wallet
            <br />
            <div v-if="selectedWallet != null">
              (current name: {{ selectedWallet }})
            </div>
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Wallet New Name</label
            >
            <input
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="walletNewName"
            />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Balance</label
            >
            <div
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 bg-gray-300 text-gray-600 border-2"
            >
              {{ currentWalletBalance }}
            </div>
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Currency</label
            >
            <div
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 bg-gray-300 text-gray-600 border-2"
            >
              VND
            </div>
          </div>
          <p class="text-red-500 text-xl italic" v-if="!$v.required">
            All the fields must not be left empty
          </p>
          <div class="flex mt-4 mb-6 md:mb-0 justify-end">
            <button
              type="submit"
              class="flex-none mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
              :disabled="$v.invalid"
            >
              Save
            </button>
            <router-link
              v-bind:to="'wallet'"
              class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded"
              >Cancel</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      walletNewName: ""
    };
  },
  computed: {
    selectedWallet() {
      return this.$store.getters.getSelectedWallet;
    },
    currentWalletBalance() {
      return 10000;
    }
  },
  validations: {
    walletNewName: {
      required
    }
  },
  methods: {
    onSave() {}
  },
  mounted() {
    this.$store.commit("setCurrentScreen", "editWallet");
  }
};
</script>

<style></style>
