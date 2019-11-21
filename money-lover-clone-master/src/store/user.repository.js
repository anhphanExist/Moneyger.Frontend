import axios from "axios";
import router from "../router";

const state = {
  loginErrors: [],
  signupErrors: [],
  changePasswordErrors: []
};

const getters = {
  loginErrors(state) {
    return state.loginErrors;
  },
  signupErrors(state) {
    return state.signupErrors;
  },
  changePasswordErrors(state) {
    return state.changePasswordErrors;
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
  },
  storeChangePasswordErrors(state, errors) {
    state.changePasswordErrors = errors;
  },
  clearErrors(state) {
    state.loginErrors = [];
    state.signupErrors = [];
    state.changePasswordErrors = [];
  }
};

const actions = {
  signup({ commit }, authData) {
    axios
      .post("/signup", {
        username: authData.username,
        password: authData.password
      })
      .then(res => {
        if (res.data.errors.length > 0) {
          commit("storeSignupErrors", [...res.data.errors]);
        } else {
          commit("authUser", authData.username);
          localStorage.setItem(
            "user",
            window.btoa(authData.username + ":" + authData.password)
          );
          localStorage.setItem("username", authData.username);
          router.push({ name: "transaction" });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  login({ commit }, authData) {
    axios
      .post("/login", {
        username: authData.username,
        password: authData.password
      })
      .then(res => {
        if (res.data.errors.length > 0) {
          commit("storeLoginErrors", [...res.data.errors]);
        } else {
          commit("authUser", authData.username);
          localStorage.setItem(
            "user",
            window.btoa(authData.username + ":" + authData.password)
          );
          localStorage.setItem("username", authData.username);
          router.push({ name: "transaction" });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  logout() {
    localStorage.clear();
    router.push({ name: "login" });
  },
  async changePassword({ commit }, changePasswordRequestDTO) {
    let response = await axios.post("/change-password", {
      username: changePasswordRequestDTO.username,
      password: changePasswordRequestDTO.password,
      newPassword: changePasswordRequestDTO.newPassword
    });

    if (response.data.success) {
      commit("storeChangePasswordErrors", []);
      localStorage.setItem(
        "user",
        window.btoa(
          changePasswordRequestDTO.username +
            ":" +
            changePasswordRequestDTO.newPassword
        )
      );
    } else {
      commit("storeChangePasswordErrors", [response.data.errors]);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
