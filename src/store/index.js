import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import permission from "./permission";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * 侧边栏默认状态 false-收起 true-展开
     */
    navigationDrawer: process.env.NODE_ENV === "production"
  },
  mutations: {
    REVERSE_DRAWER(state) {
      state.navigationDrawer = !state.navigationDrawer;
    }
  },
  actions: {},
  modules: { user, permission }
});
