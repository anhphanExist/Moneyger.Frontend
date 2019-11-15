<template>
  <div><h1>This resource is being developed</h1></div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setCurrentScreen", "error");
  }
};
</script>

<style></style>
