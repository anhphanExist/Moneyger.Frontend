import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Authenticated from "./views/Authenticated.vue";
import Transaction from "./components/transaction/Transaction.vue";
import Wallet from "./components/wallet/Wallet.vue";

export const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/authenticated",
    component: Authenticated,
    children: [
        {
            path: "/transaction",
            name: "transaction",
            component: Transaction
        },
        {
            path: "/wallet",
            component: Wallet
        },
        {
            path: "",
            redirect: "/transaction"
        },
    ]
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "*",
    redirect: "/"
  }
];
