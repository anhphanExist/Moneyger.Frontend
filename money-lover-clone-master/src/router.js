import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Authenticated from "./views/Authenticated.vue";
import Transaction from "./components/transaction/Transaction.vue";
import Wallet from "./components/wallet/Wallet.vue";
import AddTransaction from "./components/transaction/AddTransaction.vue";
import TransferTransaction from "./components/transaction/TransferTransaction.vue";
import EditProfile from "./components/user/EditProfile.vue";
import AddWallet from "./components/wallet/AddWallet.vue";
import EditWallet from "./components/wallet/AddWallet.vue";

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
        path: "add-wallet",
        name: "addWallet",
        component: AddWallet
      },
      {
        path: "edit-wallet",
        name: "editWallet",
        component: EditWallet
      },
      {
        path: "transfer-transaction",
        name: "transferTransaction",
        component: TransferTransaction
      },
      {
        path: "edit-profile",
        name: "editProfile",
        component: EditProfile
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
  mode: "history",
  routes
});
