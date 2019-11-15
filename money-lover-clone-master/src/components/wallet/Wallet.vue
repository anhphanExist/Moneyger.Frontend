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
            <div class="mr-12">{{ wallet.balance }}</div>
            <router-link
              :to="'transfer-transaction'"
              tag="button"
              class="mr-12 hover:text-blue-400 cursor-pointer"
              >Transfer</router-link
            >
            <router-link
              :to="'edit-wallet'"
              tag="button"
              class="mr-12 hover:text-blue-400 cursor-pointer"
            >
              Edit
            </router-link>
            <button class="hover:text-blue-400 cursor-pointer">Delete</button>
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
