<template>
  <div>
    <div
      class="w-100 h-24 bg-white hover:bg-gray-100 py-5 px-12 text-2xl text-gray-500 font-medium flex justify-start items-center cursor-pointer"
    >Select Month and Year here</div>
    <divider />
    <div class="w-100 h-24 bg-gray-400 shadow-inner"></div>
    <divider />

    <!-- Cash Flow -->
    <div class="flex">
      <div class="w-full bg-white flex flex-col p-12">
        <div class="w-full flex justify-between text-2xl font-semibold p-5">
          <span class="w-2/3 text-gray-800">Inflow</span>
          <span class="w-1/3 flex">
            <span class="w-2/3 text-gray-800">
              <p>+</p>
            </span>
            <span class="w-1/3 text-right text-gray-600">${{ transactionMonthGroup.inflow }}</span>
          </span>
        </div>

        <div class="w-full flex justify-between text-2xl font-semibold p-5">
          <span class="w-2/3 text-gray-800">Outflow</span>
          <span class="w-1/3 flex">
            <span class="w-2/3 text-gray-800">
              <p>-</p>
            </span>
            <span class="w-1/3 text-right text-gray-600">${{ transactionMonthGroup.outflow }}</span>
          </span>
        </div>

        <div class="w-full flex">
          <span class="w-2/3"></span>
          <span class="w-1/3 border-t-2"></span>
        </div>

        <div class="w-full flex justify-between text-2xl font-semibold p-5">
          <span class="w-2/3 text-gray-800">Total</span>
          <span class="w-1/3 flex">
            <span class="w-2/3 text-gray-800"></span>
          </span>
          <span class="w-1/3 text-right text-gray-600">${{ transactionMonthGroup.inOutRate }}</span>
        </div>
      </div>
    </div>

    <div class="w-100 flex">
      <div
        class="w-full bg-gray-400 hover:bg-gray-600 h-10 text-gray-700 hover:text-gray-200 cursor-pointer font-semibold flex justify-center items-center"
      >View report for this month</div>
    </div>

    <divider />

    <transaction-day-groups v-if="transactionMonthGroup.transactionDayGroups.length > 0"></transaction-day-groups>
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
    }
  }
};
</script>

<style scoped>
</style>
