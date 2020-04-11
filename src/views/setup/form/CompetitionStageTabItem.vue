<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <v-text-field
        :rules="[v => !!v || '名称不能为空']"
        v-model.trim.lazy="stageName"
        :readonly="$attrs.readonly"
        label="阶段名称"
      />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="3">
      <date-range-picker
        :start.sync="startTime"
        :end.sync="endTime"
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
    name: String,
    end: String,
    start: String
  },
  computed: {
    stageName: {
      get() {
        return this.name;
      },
      set(val) {
        this.$emit("update:name", val);
      }
    },
    startTime: {
      get() {
        return this.start;
      },
      set(val) {
        this.$emit("update:start", val);
      }
    },
    endTime: {
      get() {
        return this.end;
      },
      set(val) {
        this.$emit("update:end", val);
      }
    }
  }
};
</script>
