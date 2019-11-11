import axios from "axios"

const state = {
    loginErrors: []
}

const getters = {

}

const mutations = {
    storeLoginErrors(state, errors) {
        state.loginErrors = errors;
    }
}

const actions = {
    signup({commit, dispatch}, authData) {
        axios.post("/signup", {
            username: authData.username,
            password: authData.password,
            confirmPassword: authData.confirmPassword
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    },


    login({commit, dispatch}, authData) {
        axios.post("/login", {
            username: authData.username,
            password: authData.password
        })
            .then(res => {
                if (res.data.errors != null) {
                    commit("storeLoginErrors", [...res.data.errors]);
                }
                else {
                    localStorage.setItem("user", window.btoa(authData.username + ":" + authData.password));
                }
            })
            .catch(error => {
                console.log(error);
            })
    },

    tryAutoLogin ({commit}) {

    },

    logout ({commit}) {

    },

    setLogoutTimer ({commit}, expirationTime) {

    },


    fetchUser ({commit, state}) {

    },



}

export default {
    state,
    getters,
    mutations,
    actions
}
