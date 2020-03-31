<template>
  <div>
    <competition-stage-stepper
      :stages="competition.stages"
      :current-stage="competition.currentStage"
    />
    <confirm-dialog
      title="进入下一阶段"
      btn-class="mt-3"
      btn-color="primary"
      max-width="450px"
      @confirm="nextStage"
    >
      进入下一阶段
      <template #container>
        <v-alert dense text type="warning">
          进入下一段将不能返回，确认进入下一阶段？
        </v-alert>
      </template>
    </confirm-dialog>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog";

import CompetitionStageStepper from "@/views/components/CompetitionStageStepper";
import { getCompetitionDetail } from "@/api/competition/competition";

export default {
  name: "ProcessManagement",
  components: { CompetitionStageStepper, ConfirmDialog },
  data() {
    return {
      competition: {
        currentStage: 1,
        stages: []
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const id = this.$route.params.id;
      await getCompetitionDetail(id).then(({ code, data }) => {
        if (code === 200) this.competition = data;
      });
    },
    nextStage() {
      this.competition.currentStage++;
    }
  }
};
</script>

<style scoped></style>
