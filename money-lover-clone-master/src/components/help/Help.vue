<template>
  <div>HELP</div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setCurrentScreen", "help");
  }
};
</script>

<style>
</style>