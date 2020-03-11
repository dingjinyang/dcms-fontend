<template>
  <v-row>
    <v-col cols="6" sm="6" md="4">
      <v-form ref="competition_form">
        <v-text-field
          persistent-hint
          v-model="competitionForm.userRole"
          label="竞赛名称"
        />
        <v-select
          persistent-hint
          v-model="competitionForm.department"
          :items="departmentItems"
          label="所属学院"
        />
        <v-textarea auto-grow clearable label="竞赛描述" />
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
    competitionForm: {},
    /** 部门选项 */
    departmentItems: ["软件学院", "计算机学院"]
  }),
  methods: {
    reset() {
      this.$refs.competition_form.reset();
    }
  }
};
</script>

<style scoped></style>
