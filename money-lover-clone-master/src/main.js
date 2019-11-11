import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import Vuelidate from "vuelidate";
import axios from "axios";

import App from "./App.vue";
import store from "./store/store";

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:5000/api/Moneyger";
axios.defaults.headers.get['Accepts'] = 'application/json'

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
