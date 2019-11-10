import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Authenticated from "./views/Authenticated.vue";

export const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/signup",
    component: SignUp
  },
  {
    path: "/authenticated",
    component: Authenticated
  },
  {
    path: "/",
    redirect: Login
  },
  {
    path: "*",
    redirect: "/"
  }
];
