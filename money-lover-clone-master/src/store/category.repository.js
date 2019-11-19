import axios from "axios";
const state = {
  categoryList: [],
  selectedCategoryType: "Outflow"
};

const getters = {
  categoryList(state) {
    return state.categoryList;
  },
  selectedCategoryType(state) {
    return state.selectedCategoryType;
  }
};

const mutations = {
  listCategory(state, categoryList) {
    state.categoryList = categoryList;
  },
  setSelectedCategoryType(state, categoryType) {
    state.selectedCategoryType = categoryType;
  }
};

const actions = {
  async listCategory({ commit }) {
    try {
      const response = await axios.post("/category/list");
      commit("listCategory", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
