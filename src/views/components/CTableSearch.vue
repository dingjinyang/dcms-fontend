<template>
  <table-search-toolbar :panel="panel">
    <template #header>
      <v-row no-gutters style="width: 100%">
        <v-col cols="12" xl="3" lg="3" md="2" sm="12">
          年份： {{ searchForm.year || "全部" }}
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" :style="textMarginTop">
          竞赛名称： {{ searchForm.comName || "全部" }}
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" :style="textMarginTop">
          申报部门： {{ searchForm.department || "全部" }}
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" :style="textMarginTop">
          主办单位： {{ searchForm.sponsor || "全部" }}
        </v-col>
      </v-row>
    </template>
    <template #content>
      <v-row
        no-gutters
        align="center"
        justify="space-between"
        style="width: 100%"
      >
        <v-col cols="12" lg="2" md="2" sm="6">
          <v-text-field
            :rules="[v => /^20\d{2}$/.test(v) || '年份有误']"
            v-model.number="searchForm.year"
            counter
            label="年份"
            prepend-icon="mdi-time"
          />
        </v-col>
        <v-col cols="12" lg="3" md="3" sm="6">
          <v-text-field
            v-model="searchForm.comName"
            label="竞赛名称"
            prepend-icon="mdi-event"
            clearable
        /></v-col>
        <v-col cols="12" lg="3" md="3" sm="6">
          <v-text-field
            v-model="searchForm.department"
            label="申报部门"
            prepend-icon="mdi-event"
            :clearable="!isCollege"
            :readonly="isCollege"
        /></v-col>
        <v-col cols="12" lg="3" md="3" sm="6">
          <v-text-field
            v-model="searchForm.sponsor"
            label="主办单位"
            prepend-icon="mdi-event"
            clearable
        /></v-col>
        <v-col cols="12" lg="1" md="1" sm="12">
          <v-btn :class="searchBtnClass" color="primary" @click="searchClick"
            >检索</v-btn
          >
        </v-col>
      </v-row>
    </template>
  </table-search-toolbar>
</template>

<script>
import TableSearchToolbar from "@/components/TableSearchToolbar";

export default {
  name: "CTableSearch",
  components: { TableSearchToolbar },
  data() {
    return {
      menu: false,
      searchForm: {
        year: new Date().getFullYear(),
        department:
          this.$store.getters["user/info"].roles[0] === "college"
            ? this.$store.getters["user/info"].department
            : null,
        comName: null,
        sponsor: null
      },
      panel: []
    };
  },
  computed: {
    searchBtnClass() {
      return this.$vuetify.breakpoint.smAndDown ? "ml-8" : "ml-2";
    },
    textMarginTop() {
      return {
        "margin-top": this.$vuetify.breakpoint.smAndDown ? "5px" : ""
      };
    },
    isCollege() {
      return (
        this.$store.getters["user/info"].roles.length > 0 &&
        this.$store.getters["user/info"].roles[0] === "college"
      );
    }
  },
  methods: {
    searchClick() {
      this.panel = [];
      this.$emit("search", this.searchForm);
    }
  }
};
</script>

<style scoped></style>
