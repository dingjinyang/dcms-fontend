<template>
  <table-search-toolbar :panel="panel">
    <template #header>
      <v-row no-gutters style="width: 100%">
        <v-col cols="12" xl="4" lg="4" md="4" sm="12">
          申报部门： {{ searchForm.department || "全部" }}
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12">
          竞赛名称： {{ searchForm.name || "全部" }}
        </v-col>
      </v-row>
    </template>
    <template #content>
      <v-row style="width: 100%">
        <v-col cols="12" lg="3" md="3" sm="12">
          <v-select
            :items="colleges"
            v-model="searchForm.department"
            label="申报部门"
            clearable
        /></v-col>
        <v-col cols="12" lg="5" md="5" sm="12">
          <v-text-field v-model="searchForm.name" label="竞赛名称" clearable
        /></v-col>
        <v-col cols="12" lg="1" md="1" sm="12">
          <v-btn class="mt-3" color="primary" @click="search">检索</v-btn>
        </v-col>
      </v-row>
    </template>
  </table-search-toolbar>
</template>

<script>
import { colleges } from "../../../common/constant";

import TableSearchToolbar from "../../../components/TableSearchToolbar";

export default {
  name: "EnrollListTableSearch",
  components: { TableSearchToolbar },
  data: () => ({
    menu: false,
    searchForm: {
      department: null,
      name: null
    },
    panel: [],
    colleges
  }),
  methods: {
    search() {
      this.panel = [];
      this.$emit("search", this.searchForm);
    }
  }
};
</script>

<style scoped></style>
