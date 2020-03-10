import Vue from "vue";
import store from "../store";

export default Vue.directive("perm", {
  inserted: function(el, binding) {
    if (!store.getters["user/permissions"].includes(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});
