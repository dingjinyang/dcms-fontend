<template>
  <v-form ref="competition_form">
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          persistent-hint
          v-model="competitionForm.name"
          label="名称"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-select
          persistent-hint
          v-model="competitionForm.level"
          label="竞赛最高级别"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          persistent-hint
          v-model="competitionForm.principal"
          label="负责人"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          persistent-hint
          v-model="competitionForm.phone"
          label="联系方式"
          type="phone"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          persistent-hint
          v-model="competitionForm.teams"
          label="参赛队数"
          type="number"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="4">
        <v-text-field
          persistent-hint
          v-model="competitionForm.people"
          label="参赛人数"
          type="number"
      /></v-col>
      <!--  TODO 竞赛阶段    -->
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <v-btn color="warning" @click="reset">重置</v-btn>
        <v-btn color="success" class="ml-4">保存</v-btn></v-col
      >
    </v-row>
  </v-form>
</template>

<script>
import store from "../../store";
export default {
  name: "CompetitionApply",
  data: () => ({
    competitionForm: {
      name: "",
      level: "",
      phone: "",
      teams: 0,
      people: 1,
      startTime: "",
      endTime: "",
      principal: store.getters["user/info"].name
    },
    /** 部门选项 */
    collegeItems: ["软件学院", "计算机学院"]
  }),
  methods: {
    reset() {
      this.$refs.competition_form.reset();
    }
  }
};
</script>

<style scoped></style>
