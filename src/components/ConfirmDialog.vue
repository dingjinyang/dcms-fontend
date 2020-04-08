<template>
  <v-dialog
    v-model="dialog"
    :persistent="!noPersistent"
    :max-width="$attrs['max-width']"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        :loading="loading"
        :color="btnColor"
        :class="$attrs['btn-class']"
        :text="$attrs['btn-text']"
        :small="$attrs['btn-small']"
        :x-small="$attrs['btn-x-small']"
        v-on="on"
      >
        <slot />
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text v-if="!hideText">
        <slot name="container"></slot>
      </v-card-text>
      <v-card-actions v-if="!hideActions">
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
    loading: {
      type: Boolean,
      default: false
    },
    btnColor: {
      type: String,
      default: "warning"
    },
    /**
     * Dialog 标题
     */
    title: {
      type: String,
      required: true
    },
    onlyTitle: {
      type: Boolean,
      default: false
    },
    noPersistent: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    /**
     * 隐藏Dialog 内容
     */
    hideText: {
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
