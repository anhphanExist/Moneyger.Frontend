import Vue from "vue";
import Vuelidate from "vuelidate";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";


Vue.use(Vuelidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:5000/api/Moneyger";
axios.defaults.headers.get['Accepts'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
