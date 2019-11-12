import axios from "axios";
import router from "../router";

const state = {
  loginErrors: [],
  signupErrors: [],
  username: null
};

const getters = {
  loginErrors(state) {
    return state.loginErrors;
  },
  signupErrors(state) {
    return state.signupErrors;
  },
  getUsername(state) {
    return state.username;
  }
};

const mutations = {
  authUser(state, username) {
    state.username = username;
  },
  storeLoginErrors(state, errors) {
    state.loginErrors = errors;
  },
  storeSignupErrors(state, errors) {
    state.signupErrors = errors;
  }
};

const actions = {
  signup({ commit, dispatch }, authData) {
    axios
      .post("/signup", {
        username: authData.username,
        password: authData.password
      })
      .then(res => {
        if (res.data.errors != null) {
          commit("storeSignupErrors", [...res.data.errors]);
        } else {
          commit("authUser", authData.username);
          localStorage.setItem(
            "user",
            window.btoa(authData.username + ":" + authData.password)
          );
          router.push({ name: "transaction" });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  login({ commit, dispatch }, authData) {
    axios
      .post("/login", {
        username: authData.username,
        password: authData.password
      })
      .then(res => {
        if (res.data.errors != null) {
          commit("storeLoginErrors", [...res.data.errors]);
        } else {
          commit("authUser", authData.username);
          localStorage.setItem(
            "user",
            window.btoa(authData.username + ":" + authData.password)
          );
          router.push({ name: "transaction" });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  logout({ commit }) {
    localStorage.clear();
    router.push({ name: "login" });
  },
  fetchUser({ commit, state }) {}
};

export default {
  state,
  getters,
  mutations,
  actions
};
