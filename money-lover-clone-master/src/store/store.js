import Vue from "vue";
import Vuex from "vuex";
import userRepository from "./user.repository";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userRepository
    }
})