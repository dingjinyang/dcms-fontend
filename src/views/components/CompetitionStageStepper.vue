<template>
  <!--  TODO 响应式-->
  <v-stepper alt-labels :value="currentStage">
    <v-stepper-header>
      <template v-for="(item, index) in stages">
        <v-stepper-step
          :step="item.level"
          :key="`${item.level}-step`"
          :complete="currentStage >= item.level"
          :editable="currentStage >= item.level"
          :edit-icon="currentStage === item.level ? '$complete' : '$edit'"
          @click="currentStage >= item.level ? $emit('change', item.level) : ''"
        >
          {{ item.name }}
        </v-stepper-step>
        <v-divider v-if="index !== stages.length - 1" :key="index"></v-divider>
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  name: "CompetitionStageStepper",
  props: {
    stages: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    currentStage: {
      type: Number
    }
  }
};
</script>

<style scoped></style>
