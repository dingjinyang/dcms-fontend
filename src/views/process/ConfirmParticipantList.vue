<template>
  <div>
    <competition-stage-stepper
      :stages="competition.competitionStages"
      :current-stage="competition.currentStage"
      @change="searchData"
      @next="next"
    />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      class="elevation-1 mt-5"
      show-expand
      disable-sort
      disable-filtering
      show-select
      v-model="selected"
    >
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>阶段名单管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer />
          <v-toolbar-items>
            <v-btn-toggle
              v-model="searchStage"
              tile
              color="deep-purple accent-3"
              group
            >
              <v-btn
                v-for="e in competition.competitionStages"
                :key="e.stage"
                :value="e.stage"
              >
                {{ e.stageName }}
              </v-btn>
            </v-btn-toggle>
          </v-toolbar-items>
        </v-toolbar>
      </template>
      <template #item.students="{ item }">{{
        item.students | teamMemberTextFilter
      }}</template>
      <template #item.action="{ item }">
        <confirm-dialog
          title="取消资格"
          btn-text
          btn-small
          btn-color="error"
          max-width="373px"
          hide-text
          @confirm="deleteItem(item)"
          >取消资格</confirm-dialog
        >
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
          btn-class="ml-3 mb-3"
          btn-color="primary"
          max-width="450px"
        >
          {{ stageBtnText }}
          <template #container>
            <v-alert dense text type="warning">
              进入下一段将不能返回，确认进入下一阶段？
            </v-alert>
          </template>
        </confirm-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { selectCompetition } from "@/api/competition/competition";
import { getStageParticipants, intoNextStage } from "@/api/competition/process";
import ConfirmDialog from "@/components/ConfirmDialog";
import CompetitionStageStepper from "@/views/components/CompetitionStageStepper";

export default {
  name: "ConfirmParticipantList",
  components: { ConfirmDialog, CompetitionStageStepper },
  data() {
    return {
      loading: false,
      headers: [
        { text: "#", value: "id" },
        { text: "参赛作品", value: "opusName" },
        { text: "指导老师", value: "adviserName" },
        { text: "参赛人员", value: "students" },
        { text: "操作", value: "action" }
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
      searchStage: 1
    };
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.searchData(this.competition.currentStage);
      }
    }
  },
  computed: {
    nextStageBtn() {
      return (
        this.selected.length > 0 &&
        this.competition.currentStage <=
          this.competition.competitionStages.length
      );
    }
  },
  methods: {
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
    },
    async searchData(stage) {
      this.loading = true;
      const id = this.$route.params.competitionId;
      await selectCompetition(id).then(({ code, data }) => {
        if (code === 200) this.competition = data;
      });
      const { page, itemsPerPage } = this.options;
      await getStageParticipants(id, stage, page, itemsPerPage)
        .then(({ code, data: { total, list } }) => {
          if (code !== 200) return;
          this.total = total;
          this.desserts = list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    next() {
      intoNextStage(this.competition.id).then(({ code, msg }) => {
        code === 200 && this.$message.$emit("message", { text: msg });
        this.competition.currentStage++;
      });
    }
  }
};
</script>

<style scoped></style>
