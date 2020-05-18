<template>
  <v-form ref="refCompetitionForm">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model.trim="competitionForm.comName"
          label="名称"
          :rules="[v => !!v || '名称不能为空']"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-select
          v-model="competitionForm.comLevel"
          label="级别"
          :items="competitionLevels"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model.number="competitionForm.principalId"
          label="负责人工号"
          readonly
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model.lazy.number="competitionForm.principalPhone"
          :clearable="!readonly"
          label="联系方式"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model.number="competitionForm.teams"
          label="参赛队数"
          type="number"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model.number="competitionForm.participants"
          label="参赛人数"
          type="number"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12">
        <competition-stage
          ref="refCompetitionStage"
          :readonly="readonly"
          :stages.sync="competitionForm.competitionStages"
        />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <v-textarea
          auto-grow
          :clearable="!readonly"
          label="简介"
          v-model="competitionForm.description"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-textarea
          auto-grow
          :clearable="!readonly"
          label="拟设奖项及数目"
          v-model="competitionForm.awards"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-textarea
          auto-grow
          :clearable="!readonly"
          label="竞赛流程"
          v-model="competitionForm.flow"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <!--        <v-select-->
        <!--          multiple-->
        <!--          v-model="competitionForm.comCondition"-->
        <!--          :items="colleges"-->
        <!--          label="竞赛条件"-->
        <!--        />-->
        <college-multiple-select
          label="竞赛条件"
          :items="colleges"
          :condition.sync="competitionForm.comCondition"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          :clearable="!readonly"
          v-model="competitionForm.sponsor"
          label="主办单位"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          auto-grow
          label="经费预算详情"
          v-model="competitionForm.budget"
          :clearable="!readonly"
          :readonly="readonly"
        />
      </v-col>
      <v-col cols="12" v-if="isRevise">
        <v-textarea
          v-if="competitionForm.comStatus === 3"
          label="学院修改意见"
          readonly
          auto-grow
          outlined
          color="red"
          background-color="orange lighten-4"
          :value="competitionForm.collegeModifySuggest"
        />
        <v-textarea
          v-if="competitionForm.comStatus === 6"
          label="实践管理科修改意见"
          readonly
          auto-grow
          outlined
          color="red"
          background-color="orange lighten-4"
          :value="competitionForm.practiceModifySuggest"
        />
      </v-col>
      <v-col cols="12">
        <v-btn color="brown" dark class="mr-4" @click="$router.back()"
          >返回上一页
        </v-btn>
        <template v-if="isDetail">
          <v-btn color="primary" :to="{ name: 'CompetitionApply' }"
            >再次申请</v-btn
          >
        </template>
        <template v-else-if="isApproval">
          <confirm-dialog
            title="确认通过"
            btn-color="success"
            max-width="273px"
            hide-text
            @confirm="approval"
            >通过</confirm-dialog
          >
          <confirm-dialog
            title="修改意见"
            btn-class="ml-3"
            max-width="600px"
            @confirm="back"
          >
            返回修改
            <template #container>
              <v-textarea v-model="modifySuggest" required clearable />
            </template>
          </confirm-dialog>
          <confirm-dialog
            title="确认驳回"
            btn-class="ml-3"
            btn-color="error"
            max-width="273px"
            hide-text
            @confirm="reject"
            >驳回</confirm-dialog
          >
        </template>
        <template v-else>
          <v-btn color="warning" @click="reset">重置</v-btn>
          <v-btn
            v-if="!isRevise"
            color="success"
            class="ml-4"
            :loading="saveLoading"
            @click="save"
            >保存</v-btn
          >
          <confirm-dialog
            title="确认提交"
            btn-class="ml-3"
            btn-color="primary"
            max-width="473px"
            @confirm="commit"
          >
            提交
            <template #container>
              <v-alert dense text type="warning">
                申请提交后将不能修改，是否确定提交？
              </v-alert>
            </template>
          </confirm-dialog>
        </template>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import store from "@/store";
import {
  colleges,
  competitionLevels,
  competitionForm
} from "@/common/constant";
import CompetitionStage from "./CompetitionStage";
import {
  selectCompetition,
  saveApply,
  commitApply,
  approvalApply,
  returnApply,
  rejectApply
} from "@/api/competition/competition.js";
import ConfirmDialog from "@/components/ConfirmDialog";
import CollegeMultipleSelect from "@/views/setup/form/CollegeMultipleSelect";
export default {
  name: "CompetitionApply",
  components: {
    CompetitionStage,
    ConfirmDialog,
    CollegeMultipleSelect
  },
  data: () => ({
    competitionForm: {
      comName: "", //竞赛名称
      department: store.getters["user/info"].department, //申报部门
      comLevel: "院级", //比赛等级
      principalId: store.getters["user/info"].id, //负责人工号
      principalPhone: null, //负责人联写方式
      teams: 1, //参赛队伍数量
      participants: 1, //参赛人数
      awards: "", //拟设奖项及数目
      description: "", //竞赛描述
      flow: "", //赛事流程
      comCondition: "", //参赛条件
      comStatus: 1, //立项申请状态
      comDate: new Date().toISOString().substring(0, 10), //立项时间
      sponsor: "", //主办单位
      budget: "",
      lastHandler: 1,
      collegeModifySuggest: null,
      practiceModifySuggest: null,
      currentStage: 1,
      competitionStages: [
        {
          stage: 1, //阶段级别
          stageName: "", //阶段名称
          startTime: "",
          endTime: ""
        }
      ]
    },
    /** 部门选项 */
    colleges,
    competitionLevels,
    modifySuggest: "", //修改意见
    phoneRules: [v => /^1[3456789]\d{9}$/.test(v) || "手机号不合法"],
    saveLoading: false,
    commitLoading: false
  }),
  computed: {
    isApproval() {
      return this.isCollegeApproval || this.isPracticeApproval;
    },
    isCollegeApproval() {
      return this.$route.name === "CollegeApproval";
    },
    isDetail() {
      return this.$route.name === "CompetitionDetail";
    },
    isPracticeApproval() {
      return this.$route.name === "PracticeApproval";
    },
    // 返回修改
    isRevise() {
      return this.$route.name === "CompetitionRevise";
    },
    readonly() {
      return this.isDetail || this.isCollegeApproval || this.isPracticeApproval;
    }
  },
  mounted() {
    this.$route.name !== "CompetitionApply" &&
      selectCompetition(this.$route.params.competitionId).then(
        ({ code, data }) => {
          if (code === 200) this.competitionForm = data;
        }
      );
  },
  methods: {
    /**
     * 通过
     */
    approval() {
      approvalApply(this.competitionForm).then(({ code, msg }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
      });
    },
    /**
     * 返回修改
     */
    back() {
      const data = { ...this.competitionForm };
      if (data.comStatus === 2) data.collegeModifySuggest = this.modifySuggest;
      if (data.comStatus === 5) data.practiceModifySuggest = this.modifySuggest;
      returnApply(data).then(({ code, msg }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
      });
    },
    /**
     * 提交
     */
    commit() {
      commitApply({ ...this.competitionForm }).then(({ code, msg, data }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
        if (data !== null) this.competitionForm.id = data;
      });
    },
    /**
     * 驳回
     */
    reject() {
      rejectApply(this.competitionForm).then(({ code, msg }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
      });
    },
    reset() {
      this.$refs.refCompetitionForm.resetValidation();
      this.competitionForm = Object.assign(
        {},
        {
          ...competitionForm,
          principalId: store.getters["user/info"].id,
          department: store.getters["user/info"].department
        }
      );
    },
    /**
     * 保存
     */
    save() {
      this.saveLoading = true;
      console.log(this.competitionForm);
      saveApply({ ...this.competitionForm })
        .then(({ code, msg, data }) => {
          if (code !== 200) return;
          this.$message.$emit("message", { text: msg });
          if (data !== null) this.competitionForm.id = data;
        })
        .finally(() => {
          this.saveLoading = false;
        });
    }
  }
};
</script>

<style scoped></style>
