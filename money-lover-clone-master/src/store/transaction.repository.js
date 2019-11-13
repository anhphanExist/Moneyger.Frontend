import axios from "axios";

const state = {
  transactionMonthGroup: {
    month: 11,
    year: 2019,
    inflow: 19.0,
    outflow: 0.0,
    inOutRate: 19.0,
    transactionDayGroups: [
      {
        date: "2019-11-11T00:00:00",
        inflow: 19.0,
        outflow: 0.0,
        transactions: [
          {
            walletName: "User0.Wallet0",
            categoryName: "Category0",
            amount: 9.0,
            date: "2019-11-11T00:00:00"
          },
          {
            walletName: "User0.Wallet0",
            categoryName: "Category0",
            amount: 10.0,
            date: "2019-11-11T00:00:00"
          }
        ]
      }
    ]
  }
};

const getters = {
  transactionMonthGroup(state) {
    return state.transactionMonthGroup;
  }
};

const mutations = {
  getTransactionMonthGroup(state, transactionMonthGroupResponseDTO) {
    state.transactionMonthGroup = transactionMonthGroupResponseDTO;
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
      })
      .catch(error => console.log(error));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
