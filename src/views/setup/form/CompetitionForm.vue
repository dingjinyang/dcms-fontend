<template>
  <v-form ref="competition_form">
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
        <v-text-field
          v-model="competitionForm.comCondition"
          label="竞赛条件"
          readonly
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
      <!--      <v-col cols="12" v-if="isApproval">-->
      <!--        <v-btn text color="primary">历年经费使用情况</v-btn>-->
      <!--        <v-btn text color="primary">历年参赛情况</v-btn>-->
      <!--      </v-col>-->
      <v-col cols="12" sm="12" md="6" lg="6" xl="6" v-if="isPracticeApproval">
        <v-text-field label="批复预算金额" v-model="competitionForm.budget" />
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
          <v-btn color="success" class="ml-4" @click="save">保存</v-btn>
          <confirm-dialog
            title="确认提交"
            btn-class="ml-3"
            btn-color="primary"
            max-width="473px"
            @confirm="commit"
          >
            提交
            <template #container>
              <v-alert dense type="warning" elevation="2"
                >申请提交后将不能修改，是否确定提交？</v-alert
              >
            </template>
          </confirm-dialog>
        </template>
      </v-col>
    </v-row>
    <c-snackbar ref="snackbar" />
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
  getCompetitionDetail,
  saveApply,
  commitApply,
  approvalApply,
  returnApply,
  rejectApply
} from "@/api/competition/competition.js";
import ConfirmDialog from "@/components/ConfirmDialog";
import CSnackbar from "@/views/components/CSnackbar";
export default {
  name: "CompetitionApply",
  components: {
    CompetitionStage,
    CSnackbar,
    ConfirmDialog
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
      comCondition: "中原工学院全体学生", //参赛条件
      comStatus: 1, //立项申请状态
      comDate: new Date().toISOString().substring(0, 10), //立项时间
      sponsor: "", //主办单位
      budget: 0,
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
    stagesRules: []
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
    readonly() {
      return this.isDetail || this.isCollegeApproval || this.isPracticeApproval;
    }
  },
  mounted() {
    this.$route.name !== "CompetitionApply" &&
      getCompetitionDetail(this.$route.params.competitionId).then(res => {
        if (res.code === 200) this.competitionForm = res.data;
      });
  },
  methods: {
    /**
     * 审核通过
     */
    approval() {
      approvalApply(this.$route.params.competitionId).then(({ code }) => {
        code === 200 && this.$refs.snackbar.success("审核成功！");
      });
    },
    /**
     * 返回修改
     */
    back() {
      returnApply(this.$route.params.competitionId, this.modifySuggest).then(
        ({ code }) => {
          code === 200 && this.$refs.snackbar.success();
        }
      );
    },
    commit() {
      commitApply({ ...this.competitionForm, comStatus: 2 }).then(
        ({ code, msg, data }) => {
          if (code !== 200) return;
          this.$refs.snackbar.success(msg);
          if (data !== null) this.competitionForm.id = data;
        }
      );
    },
    reject() {
      rejectApply(this.$route.params.competitionId).then(({ code }) => {
        code === 200 && this.$refs.snackbar.success();
      });
    },
    reset() {
      this.$refs.competition_form.resetValidation();
      this.competitionForm = Object.assign(
        {},
        {
          ...competitionForm,
          principalId: store.getters["user/info"].id,
          department: store.getters["user/info"].department
        }
      );
    },
    save() {
      saveApply({ ...this.competitionForm, comStatus: 1 }).then(
        ({ code, msg, data }) => {
          if (code !== 200) return;
          this.$refs.snackbar.success(msg);
          if (data !== null) this.competitionForm.id = data;
        }
      );
    }
  }
};
</script>

<style scoped></style>
