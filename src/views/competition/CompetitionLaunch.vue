<template>
  <v-row>
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
      <v-form ref="competition_form">
        <v-text-field
          persistent-hint
          v-model="competitionForm.name"
          label="竞赛名称"
        />
        <v-select
          persistent-hint
          v-model="competitionForm.college"
          :items="collegeItems"
          label="所属学院"
        />
        <v-textarea
          auto-grow
          clearable
          label="竞赛描述"
          v-model="competitionForm.description"
        />
        <v-btn color="warning" @click="reset">重置</v-btn>
        <v-btn color="success" class="ml-4">保存</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CompetitionLaunch",
  data: () => ({
    competitionForm: {
      name: "",
      college: "",
      startTime: "",
      endTime: "",
      principal: "",
      description: ""
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
