<template>
  <div>
    <div class="w-100 h-24">
      <div class="w-100 bg-white p-5">
        <p class="text-red-500 text-xl italic" v-if="!walletList.length > 0">
          You are currently having no wallet, you must create a wallet to
          continue experiencing this fantastic service
        </p>
        <form class="w-full py-5 px-6 mt-5 border-2" @submit.prevent="onSave">
          <div class="w-full text-center font-bold text-3xl mt-3 mb-8">
            Add Wallet
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id-walletname" class="flex w-1/6 items-center mr-6"
              >Wallet Name</label
            >
            <input
              id="add-wallet-id-walletname"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="walletName"
            />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id-balance" class="flex w-1/6 items-center mr-6"
              >Initial Balance</label
            >
            <input
              id="add-wallet-id-balance"
              class="flex-auto justify-between py-2 px-5 border-2"
              v-model="initialBalance"
            />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id-currency" class="flex w-1/6 items-center mr-6"
              >Currency</label
            >
            <div
              id="add-wallet-id-currency"
              class="flex-auto justify-between py-2 px-5 bg-gray-300 text-gray-600 border-2"
            >
              VND
            </div>
          </div>
          <p
            class="text-red-500 text-xs italic"
            v-show="!$v.walletName.required || !$v.initialBalance.required"
          >
            All the fields must not be left empty
          </p>
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.initialBalance.decimal"
          >
            Balance must be decimal types
          </p>
          <p
            class="text-red-500 text-xs italic"
            v-if="!$v.initialBalance.maxValue || !$v.initialBalance.minValue"
          >
            You don't have that much money, cheater !!
          </p>
          <p class="text-red-500 text-xs italic" v-if="errors.length > 0">
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
import {
  required,
  decimal,
  maxValue,
  minValue
} from "vuelidate/lib/validators";
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
    },
    walletList() {
      return this.$store.getters.walletList;
    }
  },
  validations: {
    walletName: {
      required
    },
    initialBalance: {
      required,
      decimal,
      maxValue: maxValue(79228162514264337593543950335),
      minValue: minValue(-79228162514264337593543950335)
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
