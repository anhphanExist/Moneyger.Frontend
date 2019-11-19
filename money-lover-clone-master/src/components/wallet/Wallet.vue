<template>
  <div>
    <div class="w-100 h-24">
      <p class="text-red-500 text-xl italic" v-if="deleteErrors.length > 0">
        Failed to delete wallet. Errors: {{ deleteErrors }}
      </p>
      <p class="text-red-500 text-xl italic" v-if="!walletList.length > 0">
        You are currently having no wallet, you must create a wallet to
        continue experiencing this fantastic service
      </p>
      <div
        class="w-100 flex flex-col bg-white p-5"
        v-for="(wallet, index) in walletList"
        v-bind:key="index"
      >
        <div class="w-full flex justify-between py-5 px-6 mb-5 border-2">
          <div>{{ wallet.name }}</div>
          <div class="flex text-right">
            <div class="mr-12">{{ formatMoney(wallet.balance) }}</div>
            <button
              class="mr-12 hover:text-blue-400 cursor-pointer"
              @click.prevent="routeToTransferTransaction(wallet)"
            >
              Transfer
            </button>
            <button
              class="mr-12 hover:text-blue-400 cursor-pointer"
              @click.prevent="routeToEditWallet(wallet)"
            >
              Edit
            </button>
            <button
              class="hover:text-blue-400 cursor-pointer"
              @click.prevent="onDelete(wallet)"
            >
              Delete
            </button>
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
    },
    deleteErrors() {
      return this.$store.getters.deleteWalletErrors;
    }
  },
  methods: {
    async routeToTransferTransaction(wallet) {
      await this.$store.dispatch("selectWallet", wallet);
      await this.$router.push({ name: "transferTransaction" });
    },
    async routeToEditWallet(wallet) {
      await this.$store.dispatch("selectWallet", wallet);
      await this.$router.push({ name: "editWallet" });
    },
    async onDelete(wallet) {
      await this.$store.dispatch("deleteWallet", wallet);
      if (!this.deleteErrors.length > 0) {
        await this.$router.go();
      }
    },
    formatMoney(capital) {
      return new Intl.NumberFormat("en-US").format(capital);
    }
  },
  async mounted() {
    await this.$store.dispatch("listWallet");
    this.$store.commit("setCurrentScreen", "wallet");
  }
};
</script>

<style lang="postcss" scoped></style>
