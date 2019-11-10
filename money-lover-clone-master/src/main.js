import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import Vuelidate from "vuelidate";

Vue.use(VueRouter);
Vue.use(Vuelidate);

import App from "./App.vue";

Vue.config.productionTip = false;

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
