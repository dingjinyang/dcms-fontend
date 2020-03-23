<template>
  <v-form ref="competition_form">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model="competitionForm.name"
          label="名称"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-select
          v-model="competitionForm.level"
          label="最高级别"
          :items="competitionLevels"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model="competitionForm.principal"
          label="负责人"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model="competitionForm.phone"
          label="联系方式"
          type="phone"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model="competitionForm.teams"
          label="参赛队数"
          type="number"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          v-model="competitionForm.people"
          label="参赛人数"
          type="number"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12">
        <competition-stage
          :readonly="readonly"
          :stages.sync="competitionForm.stages"
        />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <v-textarea
          auto-grow
          :clearable="!readonly"
          label="简介"
          v-model="competitionForm.description"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-textarea
          auto-grow
          :clearable="!readonly"
          label="拟设奖项及数目"
          v-model="competitionForm.awards"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-textarea
          auto-grow
          :clearable="!readonly"
          label="竞赛流程"
          v-model="competitionForm.flow"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          :clearable="!readonly"
          v-model="competitionForm.condition"
          label="竞赛条件"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          :clearable="!readonly"
          v-model="competitionForm.achievement"
          label="预期成果"
          :readonly="readonly"
      /></v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" v-if="isCollegeApproval">
        <v-btn text color="primary">历年经费使用情况</v-btn>
        <v-btn text color="primary">历年参赛情况</v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <template v-if="isDetail">
          <v-btn color="primary" :to="{ name: 'CompetitionApply' }">
            再次申请
          </v-btn>
          <v-btn
            color="warning"
            class="ml-4"
            :to="{ name: 'CompetitionApplyList' }"
          >
            返回
          </v-btn>
        </template>
        <template v-else-if="isCollegeApproval">
          <confirm-dialog
            title="确认通过"
            btn-color="success"
            max-width="373px"
            only-title
            >通过
          </confirm-dialog>
          <confirm-dialog
            title="修改意见"
            btn-class="ml-3"
            max-width="600px"
            @confirm="returnForCorrection"
            >返回修改
            <template #container>
              <v-textarea v-model="correctSuggest" required clearable />
            </template>
          </confirm-dialog>
          <confirm-dialog
            title="确认驳回"
            btn-class="ml-3"
            btn-color="error"
            max-width="373px"
            only-title
            >驳回</confirm-dialog
          >
        </template>
        <template v-else
          ><v-btn color="warning" @click="reset">重置</v-btn>
          <v-btn color="success" class="ml-4" @click="save">保存</v-btn>
          <v-btn color="primary" class="ml-4" @click="commit">提交</v-btn>
        </template>
      </v-col>
    </v-row>
    <snack-bar :set="snackbarSet" />
  </v-form>
</template>

<script>
import store from "../../../store";
import { colleges, competitionLevels } from "../../../common/constant";
import CompetitionStage from "./CompetitionStage";
import SnackBar from "../../../components/SnackBar";
import {
  getCompetitionDetail,
  saveCompetitionApply,
  commitCompetitionApply
} from "../../../api/competition.js";
import ConfirmDialog from "../../../components/ConfirmDialog";
export default {
  name: "CompetitionApply",
  data: () => ({
    competitionForm: {
      name: "",
      level: 0,
      phone: "",
      teams: 1,
      people: 1,
      startTime: "",
      endTime: "",
      principal: store.getters["user/info"].username,
      awards: "",
      achievement: "",
      flow: "",
      condition: "",
      stages: [
        {
          name: "",
          level: "",
          startTime: "",
          endTime: "",
          sponsor: ""
        }
      ]
    },
    defaultCompetitionForm: {
      name: "",
      level: 0,
      phone: "",
      teams: 1,
      people: 1,
      startTime: "",
      endTime: "",
      principal: store.getters["user/info"].username,
      awards: "",
      achievement: "",
      process: "",
      stages: [
        {
          name: "",
          level: "",
          startTime: "",
          endTime: "",
          sponsor: ""
        }
      ]
    },
    /** 部门选项 */
    colleges,
    competitionLevels,
    snackbarSet: {},
    correctSuggest: ""
  }),
  components: {
    CompetitionStage,
    SnackBar,
    ConfirmDialog
  },
  computed: {
    readonly() {
      return this.isDetail || this.isCollegeApproval;
    },
    isDetail() {
      return this.$route.name === "CompetitionDetail";
    },
    isCollegeApproval() {
      return this.$route.name === "CollegeApproval";
    }
  },
  methods: {
    reset() {
      this.competitionForm = this.defaultCompetitionForm;
    },
    //TODO 保存数据，可修改
    save() {
      saveCompetitionApply(this.competitionForm).then(res => {
        if (res.code === 200)
          this.snackbarSet = {
            show: true,
            text: "保存成功",
            color: "success",
            y: "top",
            timeout: 3000
          };
      });
    },
    //TODO 提交，不可再修改,表单验证
    commit() {
      confirm("申请提交后将不能修改，是否确定提交？") &&
        commitCompetitionApply(this.competitionForm).then(res => {
          if (res.code === 200)
            this.snackbarSet = {
              show: true,
              text: "提交成功",
              color: "success",
              y: "top",
              timeout: 3000
            };
        });
    },
    returnForCorrection() {
      console.log(this.correctSuggest);
    }
  },
  created() {
    this.$route.name !== "CompetitionApply" &&
      getCompetitionDetail(this.$route.params.competitionId).then(res => {
        if (res.code === 200) this.competitionForm = res.data;
      });
  }
};
</script>

<style scoped></style>
