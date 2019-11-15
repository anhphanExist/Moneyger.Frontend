<template>
  <div>
    <div class="w-100 h-24">
      <div
        class="w-100 flex flex-col bg-white p-5"
        v-for="(wallet, index) in walletList"
        v-bind:key="index"
      >
        <div class="w-full flex justify-between py-5 px-6 mb-5 border-2">
          <div>{{ wallet.name }}</div>
          <div class="flex text-right">
            <div class="mr-12 font-semibold text-xl">{{ wallet.balance }}</div>
            <router-link v-bind:to="'transfer-transaction'" class="mr-12 font-semibold text-xl hover:text-blue-400 cursor-pointer">Transfer</router-link>
            <router-link v-bind:to="'edit-wallet'" class="mr-12 font-semibold text-xl hover:text-blue-400 cursor-pointer">Edit</router-link>
            <div class="font-semibold text-xl hover:text-red-500 cursor-pointer">Delete</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    walletList() {
      return this.$store.getters.walletList;
    }
  },
  mounted() {
    this.$store.commit("setCurrentScreen", "wallet");
  }
};
</script>

<style lang="postcss" scoped></style>
