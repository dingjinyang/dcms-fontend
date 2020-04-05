<template>
  <v-snackbar v-model="snackbar" :color="color" :timeout="3000" top>
    {{ text }}
    <v-btn dark text @click="snackbar = false">
      关闭
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "CSnackbar",
  data: () => ({
    snackbar: false,
    color: null,
    text: null
  }),
  methods: {
    show(color = "success", text = "操作成功！") {
      this.snackbar = true;
      this.color = color;
      this.text = text;
    },
    success(text = "操作成功！") {
      this.snackbar = true;
      this.color = "success";
      this.text = text;
      return true;
    },
    error(text = "操作失败！") {
      this.snackbar = true;
      this.color = "error";
      this.text = text;
      return true;
    }
  }
};
</script>

<style scoped></style>
