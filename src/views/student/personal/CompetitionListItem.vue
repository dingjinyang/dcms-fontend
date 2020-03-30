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
        <v-btn text color="primary" @click="show = !show">
          比赛详情
        </v-btn>
        <confirm-dialog
          :title="item.credential ? '' : '上传证书'"
          btn-text
          btn-color="success"
          max-width="1024px"
          no-persistent
          :hide-actions="item.credential !== ''"
          >{{ item.credential ? "查看证书" : "上传证书" }}
          <template #container>
            <v-img
              v-if="item.credential"
              lazy-src="../../../../public/credential.jpg"
            />
            <v-file-input
              v-else
              show-size
              :rules="[
                value =>
                  !value || value.size < 2000000 || '照片大小必须小于 2 MB!'
              ]"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="选择一张图片"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </template>
        </confirm-dialog>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >比赛等级：{{ competition.level }}</v-list-item-title
              >
              <v-list-item-title
                >参赛范围：{{ competition.scope }}</v-list-item-title
              >
              <v-list-item-title>
                比赛阶段：
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
    </v-card>
  </v-expand-transition>
</template>

<script>
import ConfirmDialog from "../../../components/ConfirmDialog";

export default {
  name: "PersonalCompetitionItem",
  props: {
    item: Object
  },
  data() {
    return {
      show: false,
      competition: this.item.competition
    };
  },
  components: { ConfirmDialog },
  filters: {
    TeamMemberTextFilter(value) {
      return value.map(e => e.name).join(",");
    }
  },
  methods: {}
};
</script>

<style scoped></style>
