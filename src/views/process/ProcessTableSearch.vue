<template>
  <table-search-toolbar :panel="panel">
    <template #header>
      <v-row no-gutters style="width: 100%">
        <v-col cols="12" xl="4" lg="4" md="4" sm="12" :style="textMarginTop">
          竞赛级别： {{ searchForm.level || "院级" }}
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12" :style="textMarginTop">
          竞赛名称： {{ searchForm.name || "全部" }}
        </v-col>
      </v-row>
    </template>
    <template #content>
      <v-row style="width: 100%">
        <v-col cols="12" lg="4" md="4" sm="12">
          <v-text-field
            v-model="searchForm.level"
            label="申报部门"
            prepend-icon="mdi-event"
            clearable
        /></v-col>
        <v-col cols="12" lg="4" md="4" sm="12">
          <v-text-field
            v-model="searchForm.name"
            label="竞赛名称"
            prepend-icon="mdi-event"
            clearable
        /></v-col>
        <v-col cols="12" lg="1" md="1" sm="12">
          <v-btn class="mt-3" color="primary" @click="search">检索</v-btn>
        </v-col>
      </v-row>
    </template>
  </table-search-toolbar>
</template>

<script>
import TableSearchToolbar from "@/components/TableSearchToolbar";

export default {
  name: "ProcessTableSearch",
  data: () => ({
    menu: false,
    searchForm: {
      level: null,
      name: null
    },
    panel: []
  }),
  components: { TableSearchToolbar },
  computed: {
    textMarginTop() {
      return {
        "margin-top": this.$vuetify.breakpoint.mdAndDown ? "5px" : ""
      };
    }
  },
  methods: {
    save() {
      this.$refs.menu.save(this.date);
    },
    search() {
      this.panel = [];
      this.$emit("search", this.searchForm);
    }
  }
};
</script>

<style scoped></style>
