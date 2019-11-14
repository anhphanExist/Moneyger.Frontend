import Vue from "vue";
import Vuex from "vuex";
import userRepository from "./user.repository";
import transactionRepository from "./transaction.repository";
import walletRepository from "./wallet.repository";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userRepository,
    transactionRepository,
    walletRepository
  }
});
