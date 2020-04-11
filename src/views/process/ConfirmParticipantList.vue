<template>
  <div>
    <competition-stage-stepper
      :stages="competition.competitionStages"
      :current-stage="competition.currentStage"
      @next="next"
    />
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      class="elevation-1 mt-5"
      no-data-text="无数据"
      loading-text="数据加载中"
      show-expand
      disable-sort
      disable-filtering
      :show-select="showSelect"
    >
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>阶段名单管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer />
          <v-toolbar-items>
            <v-btn-toggle
              v-model="searchStage"
              dense
              mandatory
              rounded
              color="primary"
              class="mt-3"
            >
              <v-btn
                v-for="e in competition.competitionStages"
                :key="e.stage"
                :value="e.stage"
                @click="searchData(e.stage)"
              >
                {{ e.stageName }}
              </v-btn>
              <v-btn
                :value="competition.competitionStages.length + 1"
                @click="searchAward"
              >
                获奖
              </v-btn>
            </v-btn-toggle>
          </v-toolbar-items>
        </v-toolbar>
      </template>
      <template #item.no="{ item }">
        {{ desserts.indexOf(item) + 1 }}
      </template>
      <template #item.students="{ item }">{{
        item.students | teamMemberTextFilter
      }}</template>
      <template #item.action="{ item }">
        <confirm-dialog
          v-if="searchAwardList && !competitionOver"
          title="取消资格"
          btn-text
          btn-small
          btn-color="error"
          max-width="273px"
          hide-text
          @confirm="deleteItem(item)"
          >取消资格
        </confirm-dialog>
        <confirm-dialog
          v-if="searchAwardList && competitionOver"
          title="填写获奖信息"
          btn-text
          btn-small
          btn-color="success"
          max-width="273px"
          >获奖
          <template #container>
            <v-text-field label="奖项" autofocus v-model="awardInfo" />
          </template>
        </confirm-dialog>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <span v-for="(e, i) in item.students" :key="e.sno">
            {{ i + 1 }} . 学号：{{ e.id }} ， 姓名：{{ e.stuName }} ， 班级：{{
              e.stuClass
            }}
            ， 学院：{{ e.department }}
            <br />
          </span>
        </td>
      </template>
      <template #footer>
        <confirm-dialog
          v-if="nextStageBtn"
          title="确认名单"
          btn-class="ma-1"
          btn-color="primary"
          max-width="450px"
          @confirm="teamNext"
          >进入下一阶段
          <template #container>
            <v-chip
              v-for="e in selected"
              :key="e.id"
              class="ma-2"
              dark
              color="warning"
            >
              {{ e.opusName }}
            </v-chip>
          </template>
        </confirm-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { selectCompetition } from "@/api/competition/competition";
import {
  getStageParticipants,
  competitionNextStage,
  teamNextStage,
  teamBackStage
} from "@/api/competition/process";
import ConfirmDialog from "@/components/ConfirmDialog";
import CompetitionStageStepper from "@/views/components/CompetitionStageStepper";

export default {
  name: "ConfirmParticipantList",
  components: { ConfirmDialog, CompetitionStageStepper },
  data() {
    return {
      loading: false,
      headers: [],
      headersNoAward: [
        { text: "#", value: "no" },
        { text: "参赛作品", value: "opusName" },
        { text: "指导老师", value: "adviserName" },
        { text: "参赛人员", value: "students" },
        { text: "操作", value: "action" }
      ],
      headersWithAward: [
        { text: "#", value: "no" },
        { text: "参赛作品", value: "opusName" },
        { text: "指导老师", value: "adviserName" },
        { text: "参赛人员", value: "students" },
        { text: "获奖情况", value: "award" }
      ],
      desserts: [],
      competition: {
        competitionStages: [],
        currentStage: 1
      },
      options: {
        page: 1,
        itemsPerPage: 5
      },
      total: 0,
      selected: [],
      searchStage: null,
      awardInfo: ""
    };
  },
  computed: {
    nextStageBtn() {
      return (
        this.selected.length > 0 &&
        this.competition.currentStage <=
          this.competition.competitionStages.length
      );
    },
    /**
     * 是否展示表格复选框
     * 比赛结束后不再展示，表格检索 决赛和获奖 时不再展示
     * @returns {boolean|boolean}
     */
    showSelect() {
      return (
        this.competition.currentStage <=
          this.competition.competitionStages.length &&
        this.searchStage < this.competition.competitionStages.length
      );
    },
    /**
     * 竞赛是否结束
     * @returns {boolean}
     */
    competitionOver() {
      return (
        this.competition.currentStage ===
        this.competition.competitionStages.length + 1
      );
    },
    searchAwardList() {
      return this.searchStage === this.competition.competitionStages.length;
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.searchData();
      }
    }
  },
  created() {
    this.headers = this.headersNoAward;
  },
  methods: {
    deleteItem(item) {
      teamBackStage(item.id).then(({ code, msg }) => {
        if (code !== 200) return;
        this.desserts.splice(this.desserts.indexOf(item), 1);
        this.$message.$emit("message", { text: msg });
      });
    },
    next() {
      competitionNextStage(this.competition.id).then(({ code, msg }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
        this.competition.currentStage++;
      });
    },
    searchAward() {
      this.headers = this.headersWithAward;
    },
    async searchData() {
      this.loading = true;
      this.headers = this.headersNoAward;
      const id = this.$route.params.competitionId;
      /* 获取竞赛信息 */
      await selectCompetition(id).then(({ code, data }) => {
        if (code !== 200) return;
        this.competition = data;
        if (this.searchStage === null)
          this.searchStage = this.competition.currentStage;
      });
      const { page, itemsPerPage } = this.options;
      /* 根据当前阶段获取 */
      await getStageParticipants(id, this.searchStage, page, itemsPerPage)
        .then(({ code, data: { total, list } }) => {
          if (code !== 200) return;
          this.total = total;
          this.desserts = list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    teamNext() {
      const ids = this.selected.map(v => v.id);
      this.selected = [];
      teamNextStage(ids).then(({ code, msg }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
        code === 400 &&
          this.$message.$emit("message", { color: "error", text: msg });
        this.searchData();
      });
    }
  }
};
</script>

<style scoped></style>
