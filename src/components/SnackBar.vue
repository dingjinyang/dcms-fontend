<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="set.y === 'bottom'"
    :color="set.color"
    :left="set.x === 'left'"
    :multi-line="set.mode === 'multi-line'"
    :right="set.x === 'right'"
    :timeout="set.timeout"
    :top="set.y === 'top'"
  >
    {{ set.text }}
    <v-btn dark text @click="snackbarClose">
      关闭
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    set: {
      type: Object,
      default: () => ({
        x: null,
        y: "top",
        mode: "",
        timeout: 3000,
        color: "",
        show: false,
        text: ""
      })
    }
  },
  data: () => ({
    snackbar: false
  }),
  watch: {
    set: {
      immediate: true,
      deep: true,
      handler(val) {
        this.snackbar = val.show;
      }
    }
  },
  methods: {
    snackbarClose() {
      this.snackbar = false;
    }
  }
};
</script>

<style scoped></style>
