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
import { getPersonalCompetitionList } from "@/api/student";
import CompetitionListItem from "./CompetitionListItem";
import { competitionSearchForm } from "@/common/constant";

export default {
  name: "CompetitionList",
  data: () => ({
    competitionList: [],
    loading: false,
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: null
  }),
  components: { CompetitionListItem },
  methods: {
    searchData(searchForm = competitionSearchForm) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getPersonalCompetitionList(page, itemsPerPage, searchForm)
        .then(({ code, data: { total, list } }) => {
          if (code === 200) {
            this.competitionList = list;
            this.total = total;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.searchData();
  }
};
</script>

<style scoped></style>
