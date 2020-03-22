<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      show-expand
    >
      <template #top>
        <v-row no-gutters>
          <v-col cols="12" xl="11" lg="10" md="12" sm="12">
            <table-search-toolbar @search="tableSearch" />
          </v-col>
          <v-col cols="12" xl="1" lg="2" md="12" sm="12">
            <v-toolbar dense flat color="white">
              <v-spacer />
              <v-btn color="primary" dark :to="{ name: 'CompetitionApply' }">
                新的申请
              </v-btn>
            </v-toolbar>
          </v-col>
        </v-row>
      </template>
      <template #item.name="{ item }">
        <router-link
          :to="{
            name: 'CompetitionDetail',
            params: { competitionId: item.id }
          }"
          class="competition-name-link"
        >
          {{ item.name }}
        </router-link>
      </template>
      <template #item.status="{ item }">
        <v-chip :color="item.status | competitionStatusColorFilter" small dark>
          {{ item.status | competitionStatusTextFilter }}
        </v-chip>
      </template>
      <template #item.action="{ item }">
        <v-btn
          v-if="item.status === 0"
          small
          color="warning"
          text
          :to="itemTo('CompetitionEdit', item.id)"
          >编辑
        </v-btn>
        <v-btn
          v-if="item.status === 2"
          small
          color="primary"
          text
          :to="itemTo('CompetitionRevise', item.id)"
          >修改
        </v-btn>
        <v-btn
          v-if="item.status === 0"
          small
          color="error"
          text
          @click="deleteItem(item.id)"
          >撤销
        </v-btn>
        <v-btn
          v-if="item.status === 4"
          small
          color="success"
          text
          @click="copyItem(item)"
        >
          复制
        </v-btn>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          参赛对象：{{ item.scope }} <br />竞赛简介：{{ item.description }}
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAllCompetition } from "../../../api/competition";
import TableSearchToolbar from "../components/TableSearchToolbar";

export default {
  name: "CompetitionList",
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "id" },
      { text: "名称", value: "name" },
      { text: "年份", value: "year" },
      { text: "部门", value: "department" },
      { text: "时间", value: "time" },
      { text: "负责人", value: "principal" },
      { text: "状态", value: "status" },
      { text: "最后处理人", value: "lastHandler" },
      { text: "操作", value: "action" },
      { text: "", value: "data-table-expand" }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0,
    editedIndex: -1,
    editedItem: {
      name: "",
      department: ""
    },
    defaultItem: {
      name: "",
      department: ""
    }
  }),
  methods: {
    // TODO 后端请求 本院系本年度立项申请
    getDate() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getAllCompetition(page, itemsPerPage)
        .then(({ code, data: { list, total } }) => {
          if (code !== 200) return;
          this.desserts = list;
          this.total = total;
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 表格操作跳转至竞赛详情页 - 编辑/删除
     * @param name 路由名称
     * @param competitionId number
     */
    itemTo(name, competitionId) {
      return {
        name,
        params: { competitionId }
      };
    },
    /**
     * 撤销当前竞赛
     *  @param item object
     */
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      //TODO 请求后端，删除当前竞赛
      confirm("撤销的申请将不再保留记录，是否确定撤销？") &&
        this.desserts.splice(index, 1);
    },
    copyItem(item) {
      prompt("重新命名：", item.name);
    },
    /**
     * 表单检索
     * @param searchFrom
     */
    // eslint-disable-next-line no-unused-vars
    tableSearch(searchFrom) {
      // TODO 调用后端接口检索
    }
  },
  watch: {
    options: {
      handler() {
        this.getDate();
      },
      deep: true
    }
  },
  activated() {
    this.getDate();
  },
  components: { TableSearchToolbar }
};
</script>

<style scoped>
.competition-name-link {
  color: #08c;
  text-decoration: none;
}
.competition-name-link:hover {
  color: #0408b7;
  text-decoration: underline;
}
</style>
