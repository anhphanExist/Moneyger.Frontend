import Vue from "vue";
import VueRouter from "vue-router";
// import NProgress from "vue-nprogress";

import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Authenticated from "./views/Authenticated.vue";
import Transaction from "./components/transaction/Transaction.vue";
import Wallet from "./components/wallet/Wallet.vue";
import AddTransaction from "./components/transaction/AddTransaction.vue";
import TransferTransaction from "./components/transaction/TransferTransaction.vue";
import EditProfile from "./components/user/EditProfile.vue";
import AddWallet from "./components/wallet/AddWallet.vue";
import EditWallet from "./components/wallet/EditWallet.vue";
import Help from "./components/help/Help.vue";
import Error from "./components/help/Error.vue";

Vue.use(VueRouter);
// Vue.use(NProgress);

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
        path: "help",
        name: "help",
        component: Help
      },
      {
        path: "error",
        name: "error",
        component: Error
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

const router = new VueRouter({
  mode: "history",
  routes
});

// Using NProgress to show progress bar on each router change
// router.beforeResolve((to, from, next) => {
//   if (to.path) {
//     NProgress.start();
//   }
//   next();
// });
// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
