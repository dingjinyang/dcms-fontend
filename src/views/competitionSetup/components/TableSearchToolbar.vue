<template>
  <v-expansion-panels focusable hover v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="12" xl="2" lg="2" md="12" sm="12">数据检索</v-col>
          <v-col
            cols="12"
            xl="10"
            lg="10"
            md="12"
            sm="12"
            class="text--secondary"
          >
            <v-fade-transition hide-on-leave>
              <span v-if="open">选择检索条件，点击检索按钮</span>
              <v-row v-else no-gutters style="width: 100%">
                <v-col cols="12" xl="4" lg="4" md="4" sm="12">
                  日期： {{ competition.date || "全部" }}
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12">
                  申报部门： {{ competition.department || "全部" }}
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12">
                  竞赛名称： {{ competition.name || "全部" }}
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="12" lg="3" md="3" sm="12">
            <v-menu
              ref="tableDateSearchMenu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="competition.date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="competition.date"
                  label="选择日期"
                  prepend-icon="mdi-event"
                  readonly
                  clearable
                  @click:clear="clear"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="competition.date"
                type="month"
                scrollable
                locale="cn"
              >
                <v-spacer></v-spacer>
                <v-btn text color="warning" @click="menu = false">取消</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.tableDateSearchMenu.save(competition.date)"
                  >确定
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="competition.department"
              label="申报部门"
              prepend-icon="mdi-event"
              clearable
              @click:clear="clear"
          /></v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="competition.name"
              label="竞赛名称"
              prepend-icon="mdi-event"
              clearable
              @click:clear="clear"
          /></v-col>
          <v-col cols="12" lg="1" md="1" sm="12">
            <v-btn class="mt-3" color="primary" @click="search">检索</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "TableSearchToolbar",
  data: () => ({
    menu: false,
    competition: {
      date: new Date().toISOString().substr(0, 7),
      department: null,
      name: null
    },
    panel: []
  }),
  methods: {
    clear() {},
    save() {
      this.$refs.menu.save(this.date);
    },
    search() {
      this.panel = [];
      this.$emit("search", this.competition);
    }
  }
};
</script>

<style scoped></style>
