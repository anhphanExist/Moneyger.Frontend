<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div class="w-1/5">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <router-link
          tag="span"
          class="font-semibold text-2xl tracking-tight cursor-pointer"
          v-bind:to="'transaction'"
        >Moneyger</router-link>
      </div>
    </div>
    <div class="w-4/5">
      <div class="flex w-full">
        <div class="w-2/3">
          <div class="block lg:hidden">
            <button
              class="flex items-center px-3 py-2 border rounded text-blue-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div class="text-sm lg:flex-grow">
            <!-- Wallet region -->
            <div class="inline-block mr-4 text-white font-bold">Wallet</div>

            <div class="inline-block relative w-64">
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option v-for="wallet in walletList">{{ wallet.name }}</option>
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

            <div class="inline-block ml-5 text-white font-bold">Total Wealth: ${{ totalWealth }}</div>
          </div>
        </div>
        <div class="w-1/3 flex justify-end">
          <AccountDropDown />
          <router-link
            v-bind:to="'add-wallet'"
            class="text-sm mr-3 px-3 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >Add Wallet</router-link>

          <router-link
            v-bind:to="'add-transaction'"
            class="text-sm px-3 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >Add Transaction</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AccountDropDown from "./AccountDropDown";
export default {
  components: {
    AccountDropDown
  },
  computed: {
    totalWealth() {
      return 20000000;
    },
    walletList() {
      return this.$store.getters.walletList;
    },
    walletNameOptions() {
      let options = ["All Wallet"];
      let walletList = [...this.$store.getters.walletList];
      let walletListName = [];

      walletList.forEach(element => {
        walletListName.push(element.name);
      });
      options = options.concat(walletListName);

      return options;
    },
    activeWallet: {
      get() {
        return this.$store.getters.getActiveWalletInNavBar;
      },
      set(value) {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();
        this.$store.dispatch("getTransactionMonthGroup", {
          walletName: value,
          month: currentMonth,
          year: currentYear
        });
      }
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="postcss" scoped></style>
