<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        竞赛阶段经费{{ isApproval ? "审批" : "报销" }} : {{ comName }}
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab v-for="item in stages" :key="item.stage">{{
        item.stageName
      }}</v-tab>
      <v-tab-item v-for="item in stages" :key="item.id">
        <reimburse-stage-form-item :stage="item" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { fundInfo } from "@/api/competition/process";
import ReimburseStageFormItem from "@/views/process/form/ReimburseStageFormItem";
import { selectCompetition } from "@/api/competition/competition";

export default {
  name: "FundReimburseFrom",
  components: { ReimburseStageFormItem },
  data() {
    return {
      loading: false,
      comName: "",
      stages: []
    };
  },
  computed: {
    isApproval() {
      return this.$route.name === "FundReimburseApproval";
    }
  },
  mounted() {
    selectCompetition(this.$route.params.competitionId).then(
      ({ code, data: { comName } }) => {
        if (code === 200) this.comName = comName;
      }
    );
    fundInfo(this.$route.params.competitionId).then(({ code, data }) => {
      if (code !== 200) return;
      if (this.isApproval)
        data.forEach(item => {
          if (item.trueMoney) this.stages.push(item);
        });
      else this.stages = data;
    });
  }
};
</script>
