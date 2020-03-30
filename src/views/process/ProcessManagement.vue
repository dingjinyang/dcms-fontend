<template>
  <competition-stage-stepper
    :stages="competition.stages"
    :current-stage="competition.currentStage"
  />
</template>

<script>
import CompetitionStageStepper from "@/views/components/CompetitionStageStepper";
import { getCompetitionDetail } from "@/api/competition/competition";
export default {
  name: "ProcessManagement",
  components: { CompetitionStageStepper },
  data: () => ({
    competition: {
      stages: [],
      currentStage: 1
    }
  }),
  methods: {
    async getData() {
      const id = this.$route.params.id;
      await getCompetitionDetail(id).then(({ code, data }) => {
        if (code === 200) this.competition = data;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped></style>
