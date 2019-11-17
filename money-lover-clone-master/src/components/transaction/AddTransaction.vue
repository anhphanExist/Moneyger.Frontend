<template>
  <div class="flex">
    <div class="w-1/4 bg-gray-500 h-full"></div>
    <div class="w-1/2 bg-gray-400 h-full p-3 mt-12">
      <form class="w-full max-w-lg m-auto" @submit.prevent="onSave">
        <label
          for
          class="block uppercase tracking-wide text-blue-700 text-xl font-bold m-auto"
          >Add Transaction</label
        >
        <div class="flex flex-wrap mt-2 -mx-3 mb-6">
          <!-- Wallet select -->
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
              >Wallet</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                v-model="selectedWallet"
              >
                <option v-for="option in walletNameList" :value="option">{{
                  option
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
          <!-- Category Type Select -->
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
              >Category Type</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                v-model="selectedCategoryType"
              >
                <option v-for="categoryType in categoryTypeList">{{
                  categoryType
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
          <!-- Category select -->
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
              >Category</label
            >
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                v-model="selectedCategory"
              >
                <option v-for="category in categoryNameList">{{
                  category
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
            
            <p
              class="text-red-500 text-xs italic"
              v-if="
                !$v.selectedWallet.required ||
                  !$v.selectedCategory.required ||
                  !$v.amount.required ||
                  !$v.note.required
              "
            >
              All the fields must not be left empty
            </p>
            <p class="text-red-500 text-xs italic" v-if="!$v.amount.decimal">
              Amount must be decimal type
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
              v-bind:to="{ name: 'transaction' }"
              class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </router-link>
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
      selectedWallet: "",
      selectedCategory: "",
      amount: 0,
      note: ""
    };
  },
  validations: {
    selectedWallet: {
      required
    },
    selectedCategory: {
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
  computed: {
    errors() {
      return this.$store.getters.createTransactionErrors;
    },
    selectedCategoryType: {
      get() {
        return this.$store.getters.selectedCategoryType;
      },
      set(value) {
        this.$store.commit("setSelectedCategoryType", value);
      }
    },
    categoryTypeList() {
      return ["Inflow", "Outflow"];
    },
    walletNameList() {
      let walletList = [...this.$store.getters.walletList];
      let walletListName = [];

      walletList.forEach(element => {
        walletListName.push(element.name);
      });

      return walletListName;
    },
    categoryNameList() {
      let categoryList = [...this.$store.getters.categoryList];
      let categoryListName = [];
      let selectedCategoryType = this.$store.getters.selectedCategoryType;
      categoryList.forEach(element => {
        if (element.type === selectedCategoryType) {
          categoryListName.push(element.name);
        }
      });
      return categoryListName;
    }
  },
  methods: {
    async onSave() {
      const formData = {
        walletName: this.selectedWallet,
        categoryName: this.selectedCategory,
        amount: this.amount,
        note: this.note,
        date: new Date()
      };
      await this.$store.dispatch("createTransaction", {
        walletName: formData.walletName,
        categoryName: formData.categoryName,
        amount: formData.amount,
        note: formData.note,
        date: formData.date
      });
      if (!this.errors.length > 0) {
        await this.$router.push({ name: "transaction" });
      }
    }
  },
  mounted() {
    this.$store.commit("setCurrentScreen", "addTransaction");
    this.selectedWallet = this.$store.getters.getActiveWalletInNavBar;
  },
  beforeDestroy() {
    this.$store.commit("clearTransactionErrors");
  }
};
</script>

<style></style>
