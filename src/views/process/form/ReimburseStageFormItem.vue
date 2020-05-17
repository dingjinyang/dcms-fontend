<template>
  <v-card flat>
    <v-card-text>
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
          :disabled="whether === 1"
          color="success"
          @click="approval"
        >
          {{ whether === 0 ? "审批" : "已审批" }}
        </v-btn>
        <v-btn
          v-else
          :loading="loading"
          :disabled="whether === 1"
          color="success"
          @click="submit"
        >
          {{ whether === 0 ? "提交" : "已审批" }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card></template
>

<script>
import {
  submitFundReimburse,
  approvalFundReimburse
} from "@/api/competition/process";

export default {
  name: "ReimburseStageFormItem",
  props: {
    stage: {
      type: Object,
      default() {
        return {
          remarks: "备注",
          stage: 1,
          stageBudget: "预算02",
          stageName: "报名",
          trueMoney: "ACM程序设计大赛 实际经费",
          totalMoney: 13232,
          whether: 0
        };
      }
    }
  },
  data() {
    return {
      budget: this.stage.stageBudget,
      actualExpenses: this.stage.trueMoney,
      money: this.stage.totalMoney,
      remark: this.stage.remarks,
      whether: this.stage.whether,
      loading: false
    };
  },
  computed: {
    isApproval() {
      return this.$route.name === "FundReimburseApproval";
    }
  },
  methods: {
    /**
     * 提交报销申请
     */
    submit() {
      this.loading = true;
      const data = {
        competitionId: parseInt(this.$route.params.competitionId),
        stageId: this.stage.id,
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
        stageId: this.stage.id,
        totalMoney: this.money,
        remarks: this.remark
      };
      approvalFundReimburse(data)
        .then(({ code, msg }) => {
          if (code === 200) {
            this.$message.$emit("message", { text: msg });
            this.whether = 1;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
