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
  },
  clearTransactionErrors(state) {
    state.createTransactionErrors = [];
  }
};

const actions = {
  getTransactionMonthGroup({ commit }, transactionMonthGroupRequestDTO) {
    return axios
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
  async createTransaction({ commit }, transactionRequestDTO) {
    let response = await axios.post("/transaction/create", {
      walletName: transactionRequestDTO.walletName,
      categoryName: transactionRequestDTO.categoryName,
      amount: transactionRequestDTO.amount,
      note: transactionRequestDTO.note,
      date: transactionRequestDTO.date
    });

    if (response.data.errors != null) {
      await commit("createTransaction", [...response.data.errors]);
    } else {
      await commit("createTransaction", []);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
