<template>
  <div>
    <v-card
      class="mx-auto my-3"
      v-for="(item, index) in competitionList"
      :key="index"
    >
      <v-card-title>
        <span class="title font-weight-light">{{ item.name }}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        {{ item.description }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>
              <span>{{ item.startTime }} —— {{ item.endTime }}</span>
            </v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-btn text color="success" @click="checkDetail(item.id)">
              查看详情
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    competitionList: [
      {
        id: 1,
        name: "软件设计大赛",
        college: "软件学院",
        startTime: "第5周",
        endTime: "第16周",
        principal: "Teacher",
        description:
          "为了激发学生专业学习兴趣和学习主动性，拓展学生专业知识面，快速提高专业水平，促进学院学风建设，特举办2019年第15届软件知识大赛。"
      },
      {
        id: 2,
        name: "软件知识大赛",
        college: "软件学院",
        startTime: "第5周",
        endTime: "第16周",
        principal: "Teacher",
        description:
          "为了激发学生专业学习兴趣和学习主动性，拓展学生专业知识面，快速提高专业水平，促进学院学风建设，特举办2019年第15届软件知识大赛。"
      },
      {
        id: 3,
        name: "软件创意大赛",
        college: "软件学院",
        startTime: "第5周",
        endTime: "第16周",
        principal: "Teacher",
        description:
          "为了激发学生专业学习兴趣和学习主动性，拓展学生专业知识面，快速提高专业水平，促进学院学风建设，特举办2019年第15届软件知识大赛。"
      }
    ]
  }),
  methods: {
    checkDetail(competitionId) {
      this.$router.push({
        name: "CompetitionDetail",
        params: { competitionId }
      });
    }
  }
};
</script>

<style scoped></style>
