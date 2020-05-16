<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        竞赛阶段经费{{ isApproval ? "审批" : "报销" }}
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab v-for="item in stages" :key="item.stage">{{
        item.stageName
      }}</v-tab>
      <v-tab-item v-for="item in stages" :key="item.stage">
        <reimburse-stage-form-item :stage="item.stage" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { fundInfo } from "@/api/competition/process";
import { selectCompetition } from "@/api/competition/competition";
import ReimburseStageFormItem from "@/views/process/form/ReimburseStageFormItem";

export default {
  name: "FundReimburseFrom",
  components: { ReimburseStageFormItem },
  data() {
    return {
      stages: [],
      budget: null,
      actualExpenses: null,
      money: null,
      loading: false,
      remark: null
    };
  },
  computed: {
    isApproval() {
      return this.$route.name === "FundReimburseApproval";
    }
  },
  mounted() {
    selectCompetition(this.$route.params.competitionId).then(
      ({ code, data: { budget, competitionStages } }) => {
        if (code === 200) {
          this.budget = budget;
          this.stages = competitionStages;
        }
      }
    );
    fundInfo(this.$route.params.competitionId).then(({ code, data }) => {
      if (code === 200) this.actualExpenses = data;
    });
  }
};
</script>
