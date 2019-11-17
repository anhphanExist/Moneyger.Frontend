import axios from "axios";

const state = {
  walletList: [],
  capital: 0,
  createWalletErrors: [],
  updateWalletErrors: [],
  deleteWalletErrors: [],
  transferWalletErrors: [],
  selectedWalletName: "",
  selectedWalletBalance: 0
};

const getters = {
  walletList(state) {
    return state.walletList;
  },
  capital(state) {
    return state.capital;
  },
  createWalletErrors(state) {
    return state.createWalletErrors;
  },
  updateWalletErrors(state) {
    return state.updateWalletErrors;
  },
  deleteWalletErrors(state) {
    return state.deleteWalletErrors;
  },
  transferWalletErrors(state) {
    return state.transferWalletErrors;
  },
  getSelectedWalletName(state) {
    state.selectedWalletName = localStorage.getItem("selectedWalletName");
    return state.selectedWalletName;
  },
  getSelectedWalletBalance(state) {
    state.selectedWalletBalance = localStorage.getItem("selectedWalletBalance");
    return state.selectedWalletBalance;
  }
};

const mutations = {
  listWallet(state, walletList) {
    state.walletList = walletList;
  },
  setCapital(state, capital) {
    state.capital = capital;
  },
  createWallet(state, createWalletErrors) {
    state.createWalletErrors = createWalletErrors;
  },
  updateWallet(state, updateWalletErrors) {
    state.updateWalletErrors = updateWalletErrors;
  },
  deleteWallet(state, deleteWalletErrors) {
    state.deleteWalletErrors = deleteWalletErrors;
  },
  transferWallet(state, transferWalletErrors) {
    state.transferWalletErrors = transferWalletErrors;
  },
  selectWalletName(state, walletName) {
    localStorage.setItem("selectedWalletName", walletName);
    state.selectedWalletName = walletName;
  },
  selectWalletBalance(state, walletBalance) {
    localStorage.setItem("selectedWalletBalance", walletBalance);
    state.selectedWalletBalance = walletBalance;
  },
  clearWalletErrors(state) {
    state.createWalletErrors = [];
    state.updateWalletErrors = [];
    state.deleteWalletErrors = [];
    state.transferWalletErrors = [];
  }
};

const actions = {
  listWallet({ commit }) {
    return axios
      .post("/wallet/list", {})
      .then(res => {
        commit("listWallet", [...res.data]);
        let capital = 0;
        if (res.data.length > 0) {
          res.data.forEach(element => {
            capital += element.balance;
          });
        }
        commit("setCapital", capital);
      })
      .then(err => console.log(err));
  },
  async createWallet({ commit }, newWallet) {
    let response = await axios.post("/wallet/create", {
      name: newWallet.name,
      balance: newWallet.balance
    });
    if (response.data.errors != null) {
      await commit("createWallet", [...response.data.errors]);
    } else {
      await commit("createWallet", []);
    }
  },
  async updateWallet({ commit }, walletUpdateRequestDTO) {
    let response = await axios.post("wallet/update", {
      name: walletUpdateRequestDTO.name,
      newName: walletUpdateRequestDTO.newName,
      balance: walletUpdateRequestDTO.balance
    });
    if (response.data.errors != null) {
      await commit("updateWallet", [...response.data.errors]);
    } else {
      await commit("updateWallet", []);
    }
  },
  async deleteWallet({ commit }, walletDeleteRequestDTO) {
    let response = await axios.post("wallet/delete", {
      name: walletDeleteRequestDTO.name
    });
    if (response.data.errors != null) {
      commit("deleteWallet", [...response.data.errors]);
    } else {
      await commit("deleteWallet", []);
    }
  },
  async transferWallet({ commit }, walletTransferRequestDTO) {
    let response = await axios.post("wallet/transfer", {
      sourceWalletName: walletTransferRequestDTO.sourceWalletName,
      destWalletName: walletTransferRequestDTO.destWalletName,
      amount: walletTransferRequestDTO.amount,
      note: walletTransferRequestDTO.note
    });
    if (response.data.errors != null) {
      await commit("transferWallet", [...response.data.errors]);
    } else {
      await commit("transferWallet", []);
    }
  },
  selectWallet({ commit }, wallet) {
    return new Promise(resolve => {
      commit("selectWalletName", wallet.name);
      commit("selectWalletBalance", wallet.balance);
      resolve();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
