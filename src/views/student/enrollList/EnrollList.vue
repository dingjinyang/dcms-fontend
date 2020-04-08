<template>
  <v-data-iterator
    :items="competitionList"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    loading-text="数据加载中"
  >
    <template v-slot:header class="mb-3">
      <c-table-search @search="selectData" />
      <v-progress-linear
        v-if="loading"
        color="primary"
        rounded
        indeterminate
      ></v-progress-linear>
    </template>

    <template v-slot:default="props">
      <enroll-list-item
        v-show="!loading"
        v-for="item in props.items"
        :key="item.id"
        :item="item"
      />
    </template>
  </v-data-iterator>
</template>

<script>
import CTableSearch from "@/views/components/CTableSearch";
import EnrollListItem from "./EnrollListItem";
import { signUpCompetitionList } from "@/api/student";
import { competitionSearchForm } from "@/common/constant";
export default {
  name: "EnrollList",
  components: { CTableSearch, EnrollListItem },
  data: () => ({
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: null,
    competitionList: [],
    loading: false
  }),
  created() {
    this.selectData();
  },
  methods: {
    selectData(searchForm = competitionSearchForm) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      signUpCompetitionList(page, itemsPerPage, searchForm)
        .then(({ code, data: { list, total } }) => {
          if (code !== 200) return;
          this.competitionList = list;
          this.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
