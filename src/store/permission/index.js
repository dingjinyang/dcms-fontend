import actions from "./actions";
import constRouteMap, { NotFound, UserProfile } from "../../router/common";

export default {
  namespaced: true,
  state: {
    routes: constRouteMap,
    asyncRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      routes.push(NotFound);
      routes.push(UserProfile);
      state.asyncRoutes = routes;
      state.routes = constRouteMap.concat(routes);
    }
  },
  actions,
  getters: {
    routes: state => state.routes,
    asyncRoutes: state => state.asyncRoutes
  }
};
