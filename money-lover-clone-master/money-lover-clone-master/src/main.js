import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'

Vue.config.productionTip = false

// 1. Define route components.
import Login from './components/Login'
import SignUp from './components/SignUp'

import Transaction from './components/Transaction'
import Wallet from './components/Wallet'

// 2. Define some routes
const routes = [
  { path: '/', redirect: 'login'},
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  
  { path: '/transaction', component: Transaction },
  { path: '/wallet', component: Wallet },
]

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
