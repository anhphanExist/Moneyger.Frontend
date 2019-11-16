import axios from "axios";

const state = {
  walletList: [],
  capital: 0,
  createWalletErrors: [],
  updateWalletErrors: [],
  deleteWalletErrors: [],
  transferWalletErrors: [],
  selectedWallet: null
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
  getSelectedWallet(state) {
    return state.selectedWallet;
  }
};

const mutations = {
  listWallet(state, walletList) {
    state.walletList = walletList;
  },
  setCapital(state, capital) {
    state.capital =  capital;
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
  selectWallet(state, walletName) {
    state.selectedWallet = walletName;
  },
  clearWalletErrors(state) {
    state.createWalletErrors = [];
    state.updateWalletErrors = [];
    state.deleteWalletErrors = [];
    state.transferWalletErrors = [];
  },
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
  updateWallet({ commit }, walletUpdateRequestDTO) {
    axios
      .post("wallet/update", {
        name: walletUpdateRequestDTO.name,
        newName: walletUpdateRequestDTO.newName,
        balance: walletUpdateRequestDTO.balance
      })
      .then(res => {
        commit("updateWallet", [...res.data.errors]);
      })
      .then(err => console.log(err));
  },
  deleteWallet({ commit }, walletDeleteRequestDTO) {
    axios
      .post("wallet/delete", {
        name: walletDeleteRequestDTO.name
      })
      .then(res => {
        commit("deleteWallet", [...res.data.errors]);
      })
      .then(err => console.log(err));
  },
  transferWallet({ commit }, walletTransferRequestDTO) {
    axios
      .post("wallet/transfer", {
        sourceWalletName: walletTransferRequestDTO.sourceWalletName,
        destWalletName: walletTransferRequestDTO.destWalletName,
        amount: walletTransferRequestDTO.amount,
        note: walletTransferRequestDTO.note
      })
      .then(res => {
        commit("transferWallet", [...res.data.errors]);
      })
      .then(err => console.log(err));
  },
  selectWallet({ commit }, walletName) {
    return new Promise(resolve => {
      const res = commit("selectWallet", walletName);
      resolve(res);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
