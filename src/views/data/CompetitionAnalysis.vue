<template>
  <ve-histogram :data="chartData"></ve-histogram>
</template>

<script>
import { competition } from "@/mock/data/analysis";
export default {
  name: "CompetitionAnalysis",
  data: () => ({
    chartData: competition
  })
};
</script>

<style scoped></style>
