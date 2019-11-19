<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full h-full">
      <Navbar />

      <div class="flex" style="height: calc(100% - 83px)">
        <div class="w-1/5 h-full bg-white z-50">
          <!-- Menu Buttons -->
          <div v-for="item in menuItems" :key="item.id">
            <menu-button v-if="item.router === 'Yes'" :to="item.to">{{
              item.item
            }}</menu-button>
            <menu-button v-else>{{ item.item }}</menu-button>
            <divider />
          </div>
        </div>

        <!-- -->
        <div class="w-4/5 h-auto border-l-2 overflow-x-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar.vue";
import Divider from "../components/app/Divider.vue";
import MenuButton from "../components/app/MenuButton.vue";
export default {
  components: {
    Navbar,
    divider: Divider,
    menuButton: MenuButton
  },
  data() {
    return {
      menuItems: [
        {
          id: "1",
          item: "Transaction",
          router: "Yes",
          to: "/authenticated/transaction"
        },
        {
          id: "2",
          item: "Wallet",
          router: "Yes",
          to: "/authenticated/wallet"
        },
        {
          id: "3",
          item: "Report",
          router: "Yes",
          to: "/authenticated/report"
        },
        {
          id: "4",
          item: "Budget",
          router: "Yes",
          to: "/authenticated/budget"
        },
        {
          id: "5",
          item: "Help",
          router: "Yes",
          to: "/authenticated/help"
        }
      ]
    };
  },
  async mounted() {
    await this.$store.dispatch("listCategory");
    await this.$store.dispatch("listWallet");
    let walletList = this.$store.getters.walletList;
    if (!walletList.length > 0) {
      await this.$router.push({ name: "addWallet" });
    }
  }
};
</script>

<style></style>
