<template>
  <v-expand-transition>
    <v-card class="mt-3" v-show="item">
      <v-card-title>
        <span class="font-weight-light">{{ competition.name }}</span>
        <v-spacer />
        <span class="font-weight-light">{{ competition.department }}</span>
      </v-card-title>

      <v-card-subtitle>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-if="item.name"
              >作品名称：{{ item.name }}</v-list-item-title
            >
            <v-list-item-title
              >指导老师：{{ item.guideTeacher }}</v-list-item-title
            >
            <v-list-item-title
              >参赛成员：{{
                item.teamMember | TeamMemberTextFilter
              }}</v-list-item-title
            >
            <v-list-item-title
              >获奖情况：{{ item.awards || "无" }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn text color="primary" @click="expandShow('comp')">
          比赛详情
        </v-btn>
        <v-btn text color="success" @click="expandShow('cred')">
          {{ item.credential ? "查看证书" : "上传证书" }}
        </v-btn>
      </v-card-actions>
      <v-expand-transition v-show="expand === 'comp'">
        <div v-show="show && expand === 'comp'">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >比赛等级：{{ competition.level }}</v-list-item-title
              >
              <v-list-item-title
                >参赛范围：{{ competition.scope }}</v-list-item-title
              >
              <v-list-item-title
                >比赛阶段：
                <ul>
                  <li v-for="s in competition.stages" :key="s.name">
                    <span>
                      {{ s.name }} : {{ s.startTime }} - {{ s.endTime }}</span
                    >
                  </li>
                </ul>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-expand-transition>
      <v-expand-transition v-show="expand === 'check'">
        <div v-show="show && expand === 'check'">
          <v-img :lazy-src="item.credential" />
        </div>
      </v-expand-transition>
    </v-card>
  </v-expand-transition>
</template>

<script>
export default {
  name: "PersonalCompetitionItem",
  props: {
    item: Object
  },
  data() {
    return {
      show: false,
      expand: "",
      competition: this.item.competition
    };
  },
  filters: {
    TeamMemberTextFilter(value) {
      return value.map(e => e.name).join(",");
    }
  },
  methods: {
    expandShow(val) {
      if (val === "comp") this.expand = "comp";
      else if (this.item.credential) this.expand = "check";
      else this.expand = "upload";
      this.show = !this.show;
    }
  }
};
</script>

<style scoped></style>
