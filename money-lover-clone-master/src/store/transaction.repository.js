import axios from "axios";

const state = {
  transactionMonthGroup: null,
  createTransactionErrors: [],
  activeWalletInNavBar: null
};

const getters = {
  transactionMonthGroup(state) {
    return state.transactionMonthGroup;
  },
  createTransactionErrors(state) {
    return state.createTransactionErrors;
  },
  getActiveWalletInNavBar(state) {
    return state.activeWalletInNavBar;
  }
};

const mutations = {
  getTransactionMonthGroup(state, transactionMonthGroupResponseDTO) {
    state.transactionMonthGroup = transactionMonthGroupResponseDTO;
  },
  createTransaction(state, createTransactionErrors) {
    state.createTransactionErrors = createTransactionErrors;
  },
  setActiveWalletInNavBar(state, walletName) {
    state.activeWalletInNavBar = walletName;
  }
};

const actions = {
  getTransactionMonthGroup({ commit }, transactionMonthGroupRequestDTO) {
    axios
      .post("/transaction/get-transaction-month-group", {
        month: transactionMonthGroupRequestDTO.month,
        year: transactionMonthGroupRequestDTO.year,
        walletName: transactionMonthGroupRequestDTO.walletName
      })
      .then(res => {
        commit("getTransactionMonthGroup", { ...res.data });
        commit(
          "setActiveWalletInNavBar",
          transactionMonthGroupRequestDTO.walletName
        );
      })
      .catch(error => console.log(error));
  },
  createTransaction({ commit }, transactionRequestDTO) {
    axios
      .post("/transaction/create", {
        walletName: transactionRequestDTO.walletName,
        categoryName: transactionRequestDTO.categoryName,
        amount: transactionRequestDTO.amount,
        note: transactionRequestDTO.note,
        date: transactionRequestDTO.date
      })
      .then(res => {
        commit("createTransaction", [...res.date.errors]);
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
