import axios from "axios";

const state = {
  transactionMonthGroup: {
    month: 0,
    year: 0,
    inflow: 0,
    outflow: 0,
    inOutRate: 0,
    transactionDayGroups: []
  },
  createTransactionErrors: [],
  activeWalletInNavBar: "",
  month: new Date().getMonth(),
  year: new Date().getFullYear()
};

const getters = {
  transactionMonthGroup(state) {
    return state.transactionMonthGroup;
  },
  createTransactionErrors(state) {
    return state.createTransactionErrors;
  },
  getActiveWalletInNavBar(state) {
    state.activeWalletInNavBar = localStorage.getItem("activeWalletInNavBar");
    return state.activeWalletInNavBar;
  },
  getSelectedMonth(state) {
    return state.month + 1;
  },
  getSelectedYear(state) {
    return state.year;
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
    localStorage.setItem("activeWalletInNavBar", walletName);
    state.activeWalletInNavBar = walletName;
  },
  clearTransactionErrors(state) {
    state.createTransactionErrors = [];
  },
  setSelectedMonth(state, month) {
    state.month = month - 1;
  },
  setSelectedYear(state, year) {
    state.year = year;
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
        commit("setSelectedMonth", transactionMonthGroupRequestDTO.month);
        commit("setSelectedYear", transactionMonthGroupRequestDTO.year);
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

    if (response.data.errors.length > 0) {
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
