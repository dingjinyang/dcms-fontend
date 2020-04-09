import Vue from "vue";

const MessageBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $message: {
    get: function() {
      return MessageBus;
    }
  }
});
