const state = {
  transactionDayGroups: [
    {
      date: [
        {
          day: "1",
          month: "12",
          year: "2018",
          date: "Tuesday"
        }
      ],
      total: "$20,000,000",
      trans: [
        { type: "Outflow", name: "Movies", value: "$10,000,000" },
        { type: "Outflow", name: "Books", value: "$10,000,000" }
      ]
    },
    {
      date: [
        {
          day: "15",
          month: "11",
          year: "2018",
          date: "Friday"
        }
      ],
      total: "$40,000,000",
      trans: [
        { type: "Outflow", name: "Movies", value: "$20,000,000" },
        { type: "Outflow", name: "Books", value: "$20,000,000" }
      ]
    },
    {
      date: [
        {
          day: "5",
          month: "11",
          year: "2018",
          date: "Monday"
        }
      ],
      total: "$40,000,000",
      trans: [
        { type: "Outflow", name: "Movies", value: "$20,000,000" },
        { type: "Outflow", name: "Books", value: "$20,000,000" }
      ]
    }
  ]
};

const getters = {
  transactionDayGroups(state) {
    return state.transactionDayGroups;
  }
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
