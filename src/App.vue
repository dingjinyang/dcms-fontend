<template>
  <div id="app">
    <!--  消息条  -->
    <v-snackbar v-model="snackbar" :color="msg.color" :timeout="3000" top>
      {{ msg.text }}
      <v-btn dark text fab x-small @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    msg: { color: "", text: "" },
    color: {
      success: "#4caf50",
      error: "#ff5252",
      primary: "#1976d2",
      warning: "#fb8c00"
    },
    snackbar: false
  }),
  mounted() {
    const _this = this;
    _this.$message.$on("message", ({ color = "success", text }) => {
      _this.msg = { color: _this.color[color], text };
      _this.snackbar = true;
    });
  }
};
</script>
