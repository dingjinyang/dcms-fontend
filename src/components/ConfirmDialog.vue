<template>
  <v-dialog v-model="dialog" persistent :max-width="$attrs['max-width']">
    <template v-slot:activator="{ on }">
      <v-btn
        :color="btnColor"
        :class="$attrs['btn-class']"
        :text="$attrs['btn-text']"
        :small="$attrs['btn-small']"
        v-on="on"
        ><slot />
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text v-if="!onlyTitle">
        <slot name="container"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="dialog = false">取消</v-btn>
        <v-btn color="primary" text @click="confirm">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    btnColor: {
      type: String,
      default: "warning"
    },
    title: {
      type: String,
      required: true
    },
    onlyTitle: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    confirm() {
      this.dialog = false;
      this.$emit("confirm");
    }
  }
};
</script>
