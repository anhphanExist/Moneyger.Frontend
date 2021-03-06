<template>
  <div class="flex">
    <div class="w-1/4 bg-gray-500 h-full"></div>
    <div class="w-1/2 bg-gray-400 h-full p-3 mt-12">
      <form class="w-full max-w-lg m-auto" @submit.prevent="onSave">
        <label
          for
          class="block uppercase tracking-wide text-blue-700 text-xl font-bold m-auto"
          >Transfer Transaction</label
        >
        <div class="flex flex-wrap mt-2 -mx-3 mb-6">
          <!-- Wallet select -->
          <!-- Category select -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state-fromwallet"
              >From Wallet</label
            >
            <div class="relative">
              <label
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state-fromwallet"
              >
                {{ selectedWallet }}
              </label>
            </div>
          </div>
          <!-- Category Type Select -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state-towallet"
              >To Wallet</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state-towallet"
                v-model="destWalletName"
              >
                <option v-for="wallet in walletList" v-bind:key="wallet.name">{{
                  wallet.name
                }}</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Amount -->
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
              >Amount</label
            >
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="500,000"
              v-model="amount"
            />
          </div>
        </div>
        <!-- Note -->
        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
              >Note</label
            >
            <textarea
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              rows="4"
              placeholder="Your note"
              v-model="note"
            />
            
            <p class="text-red-500 text-xs italic" v-if="!$v.required">
              All the fields must not be left empty
            </p>
            <p class="text-red-500 text-xs italic" v-if="!$v.amount.decimal">
              Amount must be numeric types
            </p>
            <p class="text-red-500 text-xs italic" v-if="!$v.amount.maxValue || !$v.amount.minValue">
              You don't have that much money, cheater !!
            </p>
            <p class="text-red-500 text-xs italic" v-if="errors.length > 0">
              {{ errors }}
            </p>
          </div>
        </div>
        <!-- Button -->
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="px-3 mb-6 md:mb-0">
            <button
              class="flex-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              v-bind:disabled="$v.$invalid"
            >
              Save
            </button>
          </div>
          <div class="md:w-1/3 mb-6 md:mb-0">
            <router-link
              tag="button"
              v-bind:to="'wallet'"
              class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >Cancel</router-link
            >
          </div>
        </div>
      </form>
    </div>
    <div class="w-1/4 bg-gray-500 h-full"></div>
  </div>
</template>

<script>
import { required, decimal, maxValue, minValue } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      destWalletName: "",
      amount: 0,
      note: ""
    };
  },
  computed: {
    selectedWallet() {
      return this.$store.getters.getSelectedWalletName;
    },
    walletList() {
      let walletList = this.$store.getters.walletList;
      let selectedWallet = this.$store.getters.getSelectedWalletName;
      let filteredWalletList = [];
      walletList.forEach(element => {
        if (element.name !== selectedWallet) {
          filteredWalletList.push(element);
        }
      });
      return filteredWalletList;
    },
    errors() {
      return this.$store.getters.transferWalletErrors;
    }
  },
  validations: {
    destWalletName: {
      required
    },
    amount: {
      required,
      decimal,
      maxValue: maxValue(79228162514264337593543950335),
      minValue: minValue(-79228162514264337593543950335)
    },
    note: {
      required
    }
  },
  methods: {
    onSave: async function() {
      const formData = {
        sourceWalletName: this.selectedWallet,
        destWalletName: this.destWalletName,
        amount: this.amount,
        note: this.note
      };
      await this.$store.dispatch("transferWallet", {
        sourceWalletName: formData.sourceWalletName,
        destWalletName: formData.destWalletName,
        amount: formData.amount,
        note: formData.note
      });
      if (!this.errors.length > 0) {
        await this.$router.push({ name: "transaction" });
      }
    }
  },
  mounted() {
    this.$store.commit("setCurrentScreen", "transferTransaction");
  },
  beforeDestroy() {
    this.$store.commit("clearWalletErrors");
  }
};
</script>

<style></style>
