<template>
  <div>
    <v-data-iterator
      :items="competitionList"
      :items-per-page.sync="itemsPerPage"
      :page="page"
    >
      <template v-slot:header>
        <enroll-list-table-search @search="tableSearch" />
      </template>

      <template v-slot:default="props">
        <div v-for="item in props.items" :key="item.id">
          <enroll-list-item :item="item" />
        </div>
      </template>
    </v-data-iterator>
  </div>
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
    competitionList: []
  }),
  methods: {
    getData() {
      getAllCompetition().then(({ code, data }) => {
        if (code === 200) this.competitionList = data.list;
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
