<template>
    <div class="w-full h-full ">
        <Navbar />

        <div class="flex" style="height: calc(100% - 83px)">
            <div class="w-1/5 h-full bg-white z-50">
                <div v-for="item in menuItems" :key="item.id">
                    <menuButton>
                        {{ item.item }}
                    </menuButton>
                    <divider/>
                </div>
            </div>
            <div class="w-4/5 h-auto border-l-2">
                <div class="w-100 h-24 bg-white">
                    
                </div>
                <divider/>
                <div class="w-100 h-24 bg-gray-400 shadow-inner">

                </div>
                <divider/>
                <div class="flex" style="height: calc(18rem + 2px)">
                    <div class="w-1/3 bg-white"></div>
                    <div class="w-2/3 bg-white"></div>
                </div>
                <divider/>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar'
    import Divider from './global/Divider'
    import MenuButton from './global/MenuButton'

    export default {
        components: {
            Navbar,
            divider: Divider,
            menuButton: MenuButton
        },
        data() {
            return {
                menuItems: [
                    { id: '1', item: 'Transaction' },
                    { id: '2', item: 'Wallet' },
                    { id: '3', item: 'Report' },
                    { id: '4', item: 'Budget' },
                    { id: '5', item: 'Help' }
                ]
            }
        },
    }
</script>

<style lang="postcss" scoped>

</style>