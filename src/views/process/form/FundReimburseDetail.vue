<template>
  <div>
    <h3>{{ comName }} - {{ stage.stageName }}</h3>
    <v-row>
      <v-col cols="12">
        <v-textarea readonly v-model="stage.stageBudget" label="经费预算详情" />
      </v-col>
      <v-col cols="12">
        <v-textarea readonly v-model="stage.trueMoney" label="实际经费详情" />
      </v-col>
      <v-col cols="6">
        <v-text-field
          readonly
          v-model="stage.totalMoney"
          label="实际批复金额"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea readonly v-model="stage.remarks" label="备注" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { selectReimburseDetail } from "@/api/competition/process";
import { selectCompetition } from "@/api/competition/competition";
export default {
  name: "FundReimburseDetail",
  data() {
    return {
      comName: "",
      stage: { stageName: "" }
    };
  },
  mounted() {
    selectCompetition(this.$route.params.competitionId).then(
      ({ code, data: { comName } }) => {
        if (code === 200) this.comName = comName;
      }
    );
    selectReimburseDetail(this.$route.params.stageId)
      .then(({ code, data }) => {
        if (code === 200) this.stage = data;
      })
      .finally(() => {});
  }
};
</script>

<style scoped></style>
