<template>
  <v-data-iterator
    :items="competitionList"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :loading="loading"
    loading-text="数据加载中"
  >
    <template v-slot:header class="mb-3">
      <enroll-list-table-search @search="tableSearch" />
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
import EnrollListTableSearch from "./EnrollListTableSearch";
import EnrollListItem from "./EnrollListItem";
import { getAllCompetition } from "../../api/competition/competition";
export default {
  name: "EnrollList",
  components: { EnrollListTableSearch, EnrollListItem },
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    searchForm: {
      department: null,
      name: null,
      sponsor: null
    },
    panel: [],
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    competitionList: [],
    loading: false
  }),
  methods: {
    getData() {
      this.loading = true;
      getAllCompetition()
        .then(({ code, data: { list } }) => {
          if (code === 200) {
            this.competitionList = list;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    search() {
      this.panel = [];
    },
    tableSearch(form) {
      console.log(form);
    }
  },
  computed: {
    textMarginTop() {
      return {
        "margin-top": this.$vuetify.breakpoint.mdAndDown ? "5px" : ""
      };
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped></style>
