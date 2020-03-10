import mutations from "./mutations";
import actions from "./actions";
import { getToken } from "../../util/cookie";

export default {
  namespaced: true,
  state: {
    token: getToken(),
    info: {
      name: "",
      avatar: "",
      roles: [],
      permissions: []
    }
  },
  mutations,
  actions,
  getters: {
    roles: state => state.info.roles,
    avatar: state => state.info.avatar,
    permissions: state => state.info.permissions
  }
};
