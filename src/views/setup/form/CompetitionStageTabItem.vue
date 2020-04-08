<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field
        :rules="[v => !!v || '名称不能为空']"
        v-model.trim.lazy="stageItem.stageName"
        :readonly="$attrs.readonly"
        label="阶段名称"
      />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <date-range-picker
        :start.sync="stageItem.startTime"
        :end.sync="stageItem.endTime"
        :readonly="$attrs.readonly"
      />
    </v-col>
  </v-row>
</template>

<script>
import DateRangePicker from "@/components/DateRangePicker";
export default {
  name: "CompetitionStageTabItem",
  components: { DateRangePicker },
  props: {
    stage: Object
  },
  data() {
    return {
      stageItem: {
        startTime: "",
        endTime: ""
      }
    };
  },
  watch: {
    stage: {
      immediate: true,
      handler(val) {
        this.stageItem = { ...val };
      }
    }
  }
};
</script>
