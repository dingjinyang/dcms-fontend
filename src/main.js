import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./router/permissionConfig";
import api from "./api";
import perm from "./directives/perm";
import "./common/filter";
import "./mock";
import "@/plugins/message";
import VeHistogram from "v-charts/lib/histogram.common.min";

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(perm);
Vue.component(VeHistogram.name, VeHistogram);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
