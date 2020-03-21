<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field v-model.trim="stageItem.name" label="阶段名称"/></v-col
    ><v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field v-model.number="stageItem.level" label="级别" type="number"
    /></v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <date-range-picker
        :start.sync="stageItem.startTime"
        :end.sync="stageItem.endTime"
      />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field v-model="stageItem.sponsor" label="主办方"
    /></v-col>
  </v-row>
</template>

<script>
import DateRangePicker from "../components/DateRangePicker";
export default {
  name: "CompetitionStageTabItem",
  props: {
    stage: Object
  },
  data() {
    return {
      stageItem: null
    };
  },
  watch: {
    stage: {
      immediate: true,
      handler(val) {
        this.stageItem = val;
      }
    }
  },
  methods: {
    dateRange(val) {
      this.stageItem.startTime = val[0];
      this.stageItem.endTime = val[1];
    }
  },
  components: { DateRangePicker }
};
</script>

<style scoped></style>
