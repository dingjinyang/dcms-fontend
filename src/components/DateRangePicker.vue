<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="dates"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="`${start} ~ ${end || ''}`"
        label="时间段"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="dates" :readonly="readonly" range scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="error" @click="menu = false">取消</v-btn>
      <v-btn text color="primary" @click="save">确认</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateRangePicker",
  props: {
    start: String,
    end: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dates: [],
    menu: false
  }),
  watch: {
    start: {
      immediate: true,
      handler(val) {
        this.dates[0] = val;
      }
    },
    end: {
      immediate: true,
      handler(val) {
        this.dates[1] = val;
      }
    }
  },
  methods: {
    save() {
      if (this.dates[1] === undefined) return;
      this.dates.sort();
      this.$refs.menu.save(this.dates);
      this.$emit("update:start", this.dates[0]);
      this.$emit("update:end", this.dates[1]);
    }
  }
};
</script>

<style scoped></style>
