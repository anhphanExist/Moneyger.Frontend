import axios from "axios";

const state = {
  walletList: [],
  createWalletErrors: [],
  updateWalletErrors: [],
  deleteWalletErrors: [],
  transferWalletErrors: []
};

const getters = {
  walletList(state) {
    return state.walletList;
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
  }
};

const mutations = {
  listWallet(state, walletList) {
    state.walletList = walletList;
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
  }
};

const actions = {
  listWallet({ commit }) {
    axios
      .post("/wallet/list", {})
      .then(res => {
        commit("listWallet", [...res.data]);
      })
      .then(err => console.log(err));
  },
  create({ commit }, newWallet) {
    axios
      .post("/wallet/create", {
        name: newWallet.name,
        balance: newWallet.balance
      })
      .then(res => {
        commit("createWallet", [...res.data.errors]);
      })
      .then(err => console.log(err));
  },
  update({ commit }, walletUpdateRequestDTO) {
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
  delete({ commit }, walletDeleteRequestDTO) {
    axios
      .post("wallet/delete", {
        name: walletDeleteRequestDTO.name
      })
      .then(res => {
        commit("deleteWallet", [...res.data.errors]);
      })
      .then(err => console.log(err));
  },
  transfer({ commit }, walletTransferRequestDTO) {
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
