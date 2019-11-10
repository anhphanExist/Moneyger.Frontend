<template>
  <component
    class="cursor-pointer w-100 h-24 bg-white hover:bg-blue-400 text-gray-800 hover:text-white flex items-center justify-center"
    :is="type"
    :to="to"
  >
    <span class="font-semibold">
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  computed: {
    type() {
      if (this.to) {
        return "router-link";
      }

      return "div";
    }
  },

  props: {
    to: {
      required: false
    },
    value: {
      type: String
    }
  }
};
</script>

<style lang="postcss" scoped></style>
