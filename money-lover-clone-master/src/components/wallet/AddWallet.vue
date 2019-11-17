<template>
  <div>
    <div class="w-100 h-24">
      <div class="w-100 bg-white p-5">
        <form class="w-full py-5 px-6 mt-5 border-2" @submit.prevent="onSave">
          <div class="w-full text-center font-bold text-3xl mt-3 mb-8">
            Add Wallet
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Wallet Name</label
            >
            <input
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="walletName"
            />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6"
              >Initial Balance</label
            >
            <input
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="initialBalance"
            />
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
          <p
            class="text-red-500 text-xl italic"
            v-show="!$v.walletName.required || !$v.initialBalance.required"
          >
            All the fields must not be left empty
          </p>
          <p
            class="text-red-500 text-xl italic"
            v-if="!$v.initialBalance.numeric"
          >
            Balance must be numeric types
          </p>
          <p class="text-red-500 text-xl italic" v-if="errors.length > 0">
            {{ errors }}
          </p>
          <div class="flex mt-4 mb-6 md:mb-0 justify-end">
            <button
              type="submit"
              class="flex-none mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
              :disabled="$v.$invalid"
            >
              Save
            </button>
            <router-link
              :to="{ name: 'wallet' }"
              tag="button"
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
import { required, numeric } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      walletName: "",
      initialBalance: 0
    };
  },
  computed: {
    errors() {
      return this.$store.getters.createWalletErrors;
    }
  },
  validations: {
    walletName: {
      required
    },
    initialBalance: {
      required,
      numeric
    }
  },
  methods: {
    onSave: async function() {
      const formData = {
        walletName: this.walletName,
        initialBalance: this.initialBalance
      };

      await this.$store.dispatch("createWallet", {
        name: formData.walletName,
        balance: formData.initialBalance
      });
      if (!this.errors.length > 0) {
        await this.$router.push({ name: "wallet" });
      }
    }
  },
  mounted() {
    this.$store.commit("setCurrentScreen", "addWallet");
  },
  beforeDestroy() {
    this.$store.commit("clearWalletErrors");
  }
};
</script>

<style></style>
