<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full h-full ">
      <Navbar />

      <div class="flex" style="height: calc(100% - 83px)">
        <div class="w-1/5 h-full bg-white z-50">

          <!-- Menu Buttons -->
          <div v-for="item in menuItems" :key="item.id">
            <menuButton v-if="item.router === 'Yes'" :to="item.to">
              {{ item.item }}
            </menuButton>
            <menuButton v-else>
              {{ item.item }}
            </menuButton>
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
  import Navbar from './components/Navbar'
  import Divider from './components/global/Divider'
  import MenuButton from './components/global/MenuButton'

  export default {
    name: 'app',
    components: {
      Navbar,
      divider: Divider,
      menuButton: MenuButton
    },
    data() {
      return {
        menuItems: [
          { id: '1', item: 'Transaction', router: 'Yes', to: '/transaction' },
          { id: '2', item: 'Wallet', router: 'Yes', to: '/wallet' },
          { id: '3', item: 'Report', router: 'Yes', to: '/report' },
          { id: '4', item: 'Budget', router: 'Yes', to: '/budget' },
          { id: '5', item: 'Help', router: 'Yes', to: '/help' }
        ]
      }
    }
  }
</script>

<style src="./assets/tailwind.css"></style>