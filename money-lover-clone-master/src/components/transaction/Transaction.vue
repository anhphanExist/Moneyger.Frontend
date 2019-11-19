<template>
  <div>
    <div
      class="h-24 w-full bg-white px-4 py-5 text-xl text-gray-500 font-medium flex justify-start items-center cursor-pointer"
    >
      <div class="flex ml-12">
        <div class="w-1/4 mr-2">
          <label for="month-selector" class="text-gray-900">Month</label>
        </div>
        <div class="w-1/4 mr-6">
          <select
            name="month"
            v-model="monthSelect"
            id="month-selector"
            class="bg-gray-200 focus:outline-none"
          >
            <option v-for="month in 12" :value="month">{{ month }}</option>
          </select>
        </div>

        <!-- Year select -->

        <div class="w-1/4">
          <label for="year-selector" class="text-gray-900">Year</label>
        </div>
        <div class="w-1/4">
          <select
            name="year"
            v-model="yearSelect"
            id="year-selector"
            class="bg-gray-200 focus:outline-none"
          >
            <option v-for="year in 50" :value="year + 1969">
              {{ year + 1969 }}
            </option>
          </select>
        </div>
      </div>
      <p class="text-base pl-10">Select Month and Year to show Transaction during that period of time</p>
    </div>
    <divider />
    <form class="w-100 h-10 bg-gray-400 shadow-inner"></form>
    <divider />

    <!-- Cash Flow -->
    <div class="flex">
      <div class="w-full bg-white flex flex-col p-12">
        <div class="w-full flex justify-between text-2xl font-semibold p-5">
          <span class="w-1/2 text-gray-800">Inflow</span>
          <span class="w-1/2 flex">
            <span class="w-1/6 text-gray-800">
              <p>+</p>
            </span>
            <span class="w-5/6 text-right text-gray-600"
              >{{ formatMoney(transactionMonthGroup.inflow) }} VND</span
            >
          </span>
        </div>

        <div class="w-full flex justify-between text-2xl font-semibold p-5">
          <span class="w-1/2 text-gray-800">Outflow</span>
          <span class="w-1/2 flex">
            <span class="w-1/6 text-gray-800">
              <p>-</p>
            </span>
            <span class="w-5/6 text-right text-gray-600"
              >{{ formatMoney(transactionMonthGroup.outflow) }} VND</span
            >
          </span>
        </div>

        <div class="w-full flex">
          <span class="w-1/2"></span>
          <span class="w-1/2 border-t-2"></span>
        </div>

        <div class="w-full flex justify-between text-2xl font-semibold p-5">
          <span class="w-1/2 text-gray-800">Total</span>
          <span class="w-1/2 flex">
            <span class="w-1/6 text-gray-800"></span>
          </span>
          <span class="w-5/6 text-right text-gray-600"
            >{{ formatMoney(transactionMonthGroup.inOutRate) }} VND</span
          >
        </div>
      </div>
    </div>

    <div class="w-100 flex">
      <div
        class="w-full bg-gray-400 h-10 text-gray-700 font-semibold flex justify-center items-center"
      ></div>
    </div>

    <divider />

    <transaction-day-groups
      v-if="transactionMonthGroup.transactionDayGroups.length > 0"
    ></transaction-day-groups>
  </div>
</template>

<script>
import Divider from "../app/Divider.vue";
import Box from "./Box.vue";

export default {
  name: "transaction",
  components: {
    divider: Divider,
    transactionDayGroups: Box
  },
  computed: {
    transactionMonthGroup() {
      return this.$store.getters.transactionMonthGroup;
    },
    monthSelect: {
      get() {
        return this.$store.getters.getSelectedMonth;
      },
      set(value) {
        const formData = {
          month: value,
          year: this.yearSelect,
          walletName: this.$store.getters.getActiveWalletInNavBar
        };
        this.$store.dispatch("getTransactionMonthGroup", {
          month: formData.month,
          year: formData.year,
          walletName: formData.walletName
        });
      }
    },
    yearSelect: {
      get() {
        return this.$store.getters.getSelectedYear;
      },
      set(value) {
        const formData = {
          month: this.monthSelect,
          year: value,
          walletName: this.$store.getters.getActiveWalletInNavBar
        };
        this.$store.dispatch("getTransactionMonthGroup", {
          month: formData.month,
          year: formData.year,
          walletName: formData.walletName
        });
      }
    }
  },
  methods: {
    formatMoney(capital) {
      return new Intl.NumberFormat("en-US").format(capital);
    }
  },
  async mounted() {
    await this.$store.dispatch("listWallet");
    let currentMonth = this.$store.getters.getSelectedMonth;
    let currentYear = this.$store.getters.getSelectedYear;
    let walletList = [...this.$store.getters.walletList];
    let firstWalletName = walletList.length > 0 ? walletList[0].name : null;
    await this.$store.dispatch("getTransactionMonthGroup", {
      walletName: firstWalletName,
      month: currentMonth,
      year: currentYear
    });
    this.$store.commit("setCurrentScreen", "transaction");
  }
};
</script>

<style scoped></style>
