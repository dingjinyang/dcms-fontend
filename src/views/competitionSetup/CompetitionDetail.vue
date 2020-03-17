<template>
  <v-row>
    <v-col cols="12" sm="10" md="8" lg="6" xl="4">
      <v-form>
        <v-text-field
          readonly
          persistent-hint
          v-model="competitionForm.name"
          label="竞赛名称"
        /><v-text-field
          readonly
          persistent-hint
          v-model="competitionForm.principal"
          label="负责人"
        />
        <v-select
          readonly
          :items="collegeItems"
          persistent-hint
          v-model="competitionForm.college"
          label="所属学院"
        />
        <v-select
          readonly
          persistent-hint
          :items="statusItems"
          v-model="competitionForm.status"
          label="当前状态"
        />
        <v-textarea
          auto-grow
          clearable
          label="竞赛描述"
          v-model="competitionForm.description"
        />
        <v-btn
          color="success"
          v-if="!competitionForm.status"
          @click="checkCompetition"
          >审核
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { competitionStatus } from "../../common/constant";

export default {
  name: "CompetitionDetail",
  data: () => ({
    competitionForm: {
      id: 1,
      status: 1,
      name: "软件设计大赛",
      college: "软件学院",
      startTime: "第5周",
      endTime: "第16周",
      principal: "Teacher",
      description:
        "为了激发学生专业学习兴趣和学习主动性，拓展学生专业知识面，快速提高专业水平，促进学院学风建设，特举办2019年第15届软件知识大赛。"
    },
    collegeItems: ["软件学院", "计算机学院"]
  }),
  computed: {
    statusItems() {
      return competitionStatus;
    }
  },
  methods: {
    checkCompetition() {
      if (confirm("是否审核？")) this.competitionForm.status = 1;
    }
  }
};
</script>

<style scoped></style>
