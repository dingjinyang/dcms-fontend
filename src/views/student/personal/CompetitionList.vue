<template>
  <v-data-iterator
    :items="competitionList"
    :loading="loading"
    loading-text="数据加载中"
    hide-default-footer
    no-data-text="暂无数据"
  >
    <template v-slot:header class="mb-3">
      <v-progress-linear
        v-if="loading"
        color="primary"
        rounded
        indeterminate
      ></v-progress-linear>
    </template>

    <template v-slot:default="props">
      <competition-list-item
        v-show="!loading"
        v-for="item in props.items"
        :key="item.id"
        :item="item"
      />
    </template>
  </v-data-iterator>
</template>

<script>
import { getStudentCompetitionList } from "../../../api/student";
import CompetitionListItem from "./CompetitionListItem";
export default {
  name: "CompetitionList",
  data: () => ({ competitionList: [], loading: false }),
  components: { CompetitionListItem },
  methods: {
    getData() {
      this.loading = true;
      getStudentCompetitionList("2016")
        .then(({ code, data }) => {
          if (code === 200) this.competitionList = data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped></style>
