<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6 pl-0">
    <div class="w-1/5 pl-3">
      <div class="flex justify-center flex-shrink-0 text-yellow-400">
        <router-link
          tag="span"
          class="font-bold text-3xl tracking-tight cursor-pointer text-center"
          v-bind:to="'authenticated'"
          >Moneyger
        </router-link
        >
      </div>
    </div>
    <div class="w-4/5 pl-5">
      <div class="flex w-full">
        <div class="w-2/3">
          <div class="text-sm lg:flex-grow">
            <!-- Wallet region -->
            <!-- <div class="inline-block mr-4 text-white text-lg">Wallet</div> -->

            <div class="inline-block relative w-64 ml-12">
              <el-select v-model="activeWallet">
                <el-option
                  v-for="option in walletNameOptions"
                  v-bind:key="option.value"
                  v-bind:label="option.label"
                  v-bind:value="option.value"
                ></el-option>
              </el-select>
            </div>

            <div class="inline-block ml-5 text-white">
              <p class="inline-block text-lg ">Total Wealth: </p>
              <p class="inline-block text-2xl text-yellow-400 pl-10 font-bold">{{ totalWealth }}</p>
              <p class="inline-block text-lg pl-4">VND</p>
            </div>
          </div>
        </div>
        <div class="w-1/3 flex justify-end">
          <router-link
            v-bind:to="{ name: 'addWallet' }"
            class="text-sm mr-3 px-3 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            v-if="currentScreen == 'wallet'"
            >Add Wallet</router-link
          >

          <router-link
            v-bind:to="{ name: 'addTransaction' }"
            class="text-sm px-3 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            v-if="currentScreen == 'transaction'"
            >Add Transaction</router-link
          >
          <p class="inline-block text-lg text-white ml-4 mt-2">{{ currentUser }}</p>
          <AccountDropDown class="ml-3" />
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
      let capital = this.$store.getters.capital;
      return new Intl.NumberFormat("en-US").format(capital);
    },
    walletList() {
      return this.$store.getters.walletList;
    },
    walletNameOptions() {
      let options = [
        {
          value: null,
          label: "All Wallet"
        }
      ];
      let walletList = [...this.$store.getters.walletList];
      let walletListName = [];

      walletList.forEach(element => {
        walletListName.push({
          value: element.name,
          label: element.name
        });
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
    },
    currentScreen() {
      return this.$store.getters.getCurrentScreen;
    },
      currentUser() {
        return localStorage.getItem("username");
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
