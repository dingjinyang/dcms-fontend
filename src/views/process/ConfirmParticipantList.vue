<template>
  <div>
    <competition-stage-stepper
      :stages="competition.stages"
      :current-stage="competition.currentStage"
      @change="getData"
    />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      show-expand
      disable-sort
      disable-filtering
    >
      <template #item.teamMembers="{ item }">{{
        item.teamMembers | teamMemberTextFilter
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
          <span v-for="(e, i) in item.teamMembers" :key="e.sno">
            {{ i + 1 }} . 学号：{{ e.sno }} ， 姓名：{{ e.name }} ， 班级：{{
              e.class
            }}
            ， 学院：{{ e.college }}
            <br />
          </span>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getCompetitionDetail } from "@/api/competition/competition";
import { getStageParticipants } from "@/api/competition/process";
import ConfirmDialog from "@/components/ConfirmDialog";
import CompetitionStageStepper from "@/views/components/CompetitionStageStepper";

export default {
  name: "ConfirmParticipantList",
  components: { ConfirmDialog, CompetitionStageStepper },
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "id" },
      { text: "参赛作品", value: "name" },
      { text: "参赛人员", value: "teamMembers" },
      { text: "操作", value: "action" }
    ],
    desserts: [],
    competition: {
      stages: [],
      currentStage: 1
    },
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0
  }),
  created() {
    this.getData();
  },
  methods: {
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
    },
    async getData(stage) {
      const id = this.$route.params.id;
      await getCompetitionDetail(id).then(({ code, data }) => {
        if (code === 200) this.competition = data;
      });
      await getStageParticipants(
        id,
        stage || this.competition.currentStage
      ).then(({ code, data }) => {
        if (code !== 200) return;
        this.total = data.total;
        this.desserts = data.list;
      });
    }
  }
};
</script>

<style scoped></style>
