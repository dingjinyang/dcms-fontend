import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./router/permissionConfig";
import api from "./api";
import perm from "./directives/perm";
import "./mock";

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(perm);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
