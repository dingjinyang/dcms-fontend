<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field
        v-model.trim="stageItem.name"
        :readonly="$attrs.readonly"
        label="阶段名称"/></v-col
    ><v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field
        v-model.number="stageItem.level"
        :readonly="$attrs.readonly"
        label="级别"
        type="number"
    /></v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <date-range-picker
        :start.sync="stageItem.startTime"
        :end.sync="stageItem.endTime"
        :readonly="$attrs.readonly"
      />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field
        v-model="stageItem.sponsor"
        :readonly="$attrs.readonly"
        label="主办方"
    /></v-col>
  </v-row>
</template>

<script>
import DateRangePicker from "../../../components/DateRangePicker";
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
  components: { DateRangePicker }
};
</script>

<style scoped></style>
