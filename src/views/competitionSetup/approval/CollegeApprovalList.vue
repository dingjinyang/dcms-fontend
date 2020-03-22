<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      show-select
    >
      <template #top>
        <v-row no-gutters align="baseline">
          <v-col cols="6" xl="1" lg="2" md="2" sm="3" align-self="baseline">
            <v-toolbar dense flat color="white">
              <v-spacer />
              <v-btn color="success" dark>
                批量审批
              </v-btn>
            </v-toolbar>
          </v-col>
          <v-col cols="6" xl="1" lg="1" md="2" sm="3">
            <v-toolbar dense flat color="white">
              <v-spacer />
              <v-btn color="primary" dark>
                生成汇总表
              </v-btn>
            </v-toolbar>
          </v-col>
          <v-spacer></v-spacer>
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
        <v-btn v-if="item.status === 1" small color="warning" text>审批 </v-btn>
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
import { getCompetitionApprovalList } from "../../../api/competition";

export default {
  name: "CollegeApprovalList",
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "id" },
      { text: "名称", value: "name", sortable: false },
      { text: "级别", value: "level", sortable: false },
      { text: "主办单位", value: "department", sortable: false },
      { text: "时间", sortable: false },
      { text: "负责人", value: "principal", sortable: false },
      { text: "联系方式", value: "phone", sortable: false },
      { text: "状态", value: "status", sortable: false },
      { text: "操作", value: "action", sortable: false }
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
      getCompetitionApprovalList(page, itemsPerPage)
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
  }
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
