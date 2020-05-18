<template>
  <v-select
    :label="label"
    multiple
    v-model="selected"
    :items="items"
    :readonly="readonly"
  />
</template>

<script>
export default {
  name: "CollegeMultipleSelect",
  props: {
    condition: {
      type: String,
      default() {
        return null;
      }
    },
    label: {
      type: String
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    readonly: {
      type: Boolean
    }
  },
  computed: {
    selected: {
      get() {
        if (!this.condition || this.condition.length === 0) return [];
        return this.condition.split(",");
      },
      set(val) {
        this.$emit("update:condition", val.join(","));
      }
    }
  }
};
</script>
