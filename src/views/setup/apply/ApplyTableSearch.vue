<template>
  <table-search-toolbar :panel="panel">
    <template #header>
      <v-row no-gutters style="width: 100%">
        <v-col cols="12" xl="4" lg="4" md="4" sm="12" :style="textMarginTop">
          日期： {{ searchForm.date || "全部" }}
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12" :style="textMarginTop">
          申报部门： {{ searchForm.department || "全部" }}
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12" :style="textMarginTop">
          竞赛名称： {{ searchForm.name || "全部" }}
        </v-col>
      </v-row>
    </template>
    <template #content>
      <v-row style="width: 100%">
        <v-col cols="12" lg="3" md="3" sm="12">
          <v-menu
            ref="tableDateSearchMenu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="searchForm.date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="searchForm.date"
                label="选择日期"
                prepend-icon="mdi-event"
                readonly
                clearable
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="searchForm.date"
              type="month"
              scrollable
              locale="cn"
            >
              <v-spacer></v-spacer>
              <v-btn text color="warning" @click="menu = false">取消</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.tableDateSearchMenu.save(searchForm.date)"
                >确定
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="12">
          <v-text-field
            v-model="searchForm.department"
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
import TableSearchToolbar from "../../../components/TableSearchToolbar";

export default {
  name: "ApplyTableSearch",
  data: () => ({
    menu: false,
    searchForm: {
      date: new Date().toISOString().substr(0, 7),
      department: null,
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
