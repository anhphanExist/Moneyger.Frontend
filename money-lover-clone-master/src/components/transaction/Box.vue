<template>
  <div class="w-100 flex flex-col">
    <div class="w-full bg-white flex flex-col">
      <div class="w-full flex flex-col px-12 pt-12 pb-6">
        <div class="w-full flex justify-between text-lg font-semibold">
          <div class="time">
            <span class="day">8</span>/
            <span class="month">12</span>/
            <span class="year">2019</span>
          </div>
          <div class="cash">+$40,000,000</div>
        </div>
        <div class="w-full border-t-2 my-10"></div>
        <div class="w-full flex justify-between py-5 px-6 mb-5 border-2">
          <div>Landslide</div>
          <div>+$20,000,000</div>
        </div>
        <div class="w-full flex justify-between py-5 px-6 mb-5 border-2">
          <div>Ready to roll</div>
          <div>+$20,000,000</div>
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
    transactionDayGroups() {
      return this.$store.getters.transactionDayGroups;
    }
  },
  components: {
    divider: DividerVue
  }
};
</script>

<style lang="postcss" scoped></style>
