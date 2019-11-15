<template>
  <div>
    <div class="w-100 h-24">
      <div class="w-100 bg-white p-5">
        <div class="w-full py-5 px-6 mt-5 border-2">
          <div class="w-full text-center font-bold text-3xl mt-3 mb-8">Edit Wallet</div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6">Wallet New Name</label>
            <input id="add-wallet-id" class="flex-auto justify-between py-2 px-5 border-2" />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6">Initial Balance</label>
            <input id="add-wallet-id" class="flex-auto justify-between py-2 px-5 border-2" />
          </div>

          <div class="w-full flex mb-5">
            <label for="add-wallet-id" class="flex w-1/6 items-center mr-6">Currency</label>
            <div
              id="add-wallet-id"
              class="flex-auto justify-between py-2 px-5 bg-gray-300 text-gray-600 border-2"
            >VND</div>
          </div>

          <div class="flex mt-4 mb-6 md:mb-0 justify-end">
            <router-link
              v-bind:to="'wallet'"
              class="flex-none mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
            >Save</router-link>
            <router-link
              v-bind:to="'wallet'"
              class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded"
            >Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setCurrentScreen", "editWallet");
  }
};
</script>

<style>
</style>