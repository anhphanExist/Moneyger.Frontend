import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Authenticated from "./views/Authenticated.vue";
import Transaction from "./components/transaction/Transaction.vue";
import Wallet from "./components/wallet/Wallet.vue";
import AddTransaction from "./components/transaction/AddTransaction.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem("user") != null) {
        next();
      } else {
        next("/authenticated");
      }
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem("user") != null) {
        next();
      } else {
        next("/authenticated");
      }
    }
  },
  {
    path: "/authenticated",
    name: "authenticated",
    component: Authenticated,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("user") != null) {
        next();
      } else {
        next("/login");
      }
    },
    children: [
        {
            path: "transaction",
            name: "transaction",
            component: Transaction
        },
        {
            path: "add-transaction",
            name: "addTransaction",
            component: AddTransaction
        },
        {
            path: "wallet",
            name: "wallet",
            component: Wallet
        },
        {
            path: "",
            redirect: "transaction"
        },
        {
          path: "*",
          redirect: "transaction"
        }
    ]
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "*",
    redirect: "/login"
  }
];

export default new VueRouter({
  mode: 'history', 
  routes
});
