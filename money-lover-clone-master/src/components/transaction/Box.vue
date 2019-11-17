<template>
  <div class="w-100 flex flex-col">
    <div
      class="w-full bg-white flex flex-col"
      v-for="transactionDayGroup in transactionMonthGroup.transactionDayGroups"
    >
      <div class="w-full flex flex-col px-12 pt-12 pb-6">
        <div class="w-full flex justify-between text-lg font-semibold">
          <div class="time">
            <span>{{ transformDate(transactionDayGroup.date) }}</span>
          </div>
          <div class="cash">
            {{
              formatMoney(
                transactionDayGroup.inflow + transactionDayGroup.outflow
              )
            }}
          </div>
        </div>
        <div class="w-full border-t-2 my-10"></div>
        <div v-for="transaction in transactionDayGroup.transactions">
          <div class="w-full flex justify-between py-5 px-6 mb-5 border-2">
            <div>{{ transaction.categoryName }}</div>
            <div>{{ formatMoney(transaction.amount) }}</div>
          </div>
        </div>
      </div>
      <divider />
    </div>
  </div>
</template>

<script>
import DividerVue from "../app/Divider.vue";
export default {
  computed: {
    transactionMonthGroup() {
      return this.$store.getters.transactionMonthGroup;
    }
  },
  methods: {
    transformDate(jsonDate) {
      let date = new Date(jsonDate);
      let weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      let dayInWeek = weekday[date.getDay()];
      let stringResult =
        dayInWeek +
        ", " +
        date.getDate() +
        "/" +
        (date.getMonth() + 1).toString();
      return stringResult;
    },
    formatMoney(capital) {
      return new Intl.NumberFormat("en-US").format(capital);
    }
  },
  components: {
    divider: DividerVue
  }
};
</script>

<style lang="postcss" scoped></style>
