<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="budget" label="经费预算详情" readonly />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="actualExpenses"
          label="实际经费详情"
          :readonly="isApproval"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-if="isApproval"
          v-model.number="money"
          label="实际批复金额"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea v-if="isApproval" v-model="remark" label="备注" />
      </v-col>
    </v-row>

    <v-btn
      v-if="isApproval"
      :loading="loading"
      color="success"
      @click="approval"
    >
      审批
    </v-btn>
    <v-btn v-else :loading="loading" color="success" @click="submit">
      提交
    </v-btn>
  </v-form>
</template>

<script>
import {
  fundInfo,
  submitFundReimburse,
  approvalFundReimburse
} from "@/api/competition/process";
import { selectCompetition } from "@/api/competition/competition";

export default {
  name: "FundReimburseFrom",
  data() {
    return {
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
      ({ code, data: { budget } }) => {
        if (code === 200) this.budget = budget;
      }
    );
    fundInfo(this.$route.params.competitionId).then(({ code, data }) => {
      if (code === 200) this.actualExpenses = data;
    });
  },
  methods: {
    submit() {
      this.loading = true;
      const data = {
        competitionId: this.$route.params.competitionId,
        trueMoney: this.actualExpenses
      };
      submitFundReimburse(data)
        .then(({ code, msg }) => {
          code === 200 && this.$message.$emit("message", { text: msg });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    approval() {
      this.loading = true;
      const data = {
        competitionId: this.$route.params.competitionId,
        totalMoney: this.money,
        remarks: this.remark
      };
      approvalFundReimburse(data)
        .then(({ code, msg }) => {
          code === 200 && this.$message.$emit("message", { text: msg });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
