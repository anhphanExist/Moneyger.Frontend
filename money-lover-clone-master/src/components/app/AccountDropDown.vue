<template>
  <div class="inline-block px-4 relative">
    <button
      @click="isOpen = !isOpen"
      class="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-blue-200 focus:outline-none focus:border-white"
    >
      <img
        class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1627&q=80"
        alt
      />
    </button>
    <button v-if="isOpen" @click="isOpen=false" class="fixed top-0 right-0 bottom-0 right-0 left-0 h-full w-full cursor-default"></button>
    <div v-if="isOpen" class="bg-white rounded-lg py-2 absolute w-48 mt-2 shadow-xl">
      <a href class="block px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white">Edit Profile</a>
      <a href class="block px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white">Support</a>
      <a
        href
        class="block px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white"
        v-on:click="onLogout"
      >Logout</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // We need something return from backend
    return {
      isOpen: false
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>