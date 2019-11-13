import Vue from "vue";
import Vuelidate from "vuelidate";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:5000/api/Moneyger";
axios.defaults.headers.get["Accepts"] = "application/json";

axios.interceptors.request.use(config => {
  if (localStorage.getItem("user")) {
    config.headers.authorization = "Basic " + localStorage.getItem("user");
  }
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
