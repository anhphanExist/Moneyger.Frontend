<template>
  <div>EDIT WALLET</div>
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