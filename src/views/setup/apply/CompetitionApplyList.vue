<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    show-expand
    disable-pagination
  >
    <template #top>
      <v-row no-gutters>
        <v-col cols="12" xl="11" lg="10" md="12" sm="12">
          <apply-table-search @search="tableSearch" />
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
      <confirm-dialog
        v-if="item.status === 0"
        title="确认撤销"
        btn-small
        btn-text
        btn-color="error"
        max-width="373px"
        hide-text
        @confirm="deleteItem(item.id)"
      >
        撤销
      </confirm-dialog>
      <confirm-dialog
        v-if="item.status === 4"
        title="重新命名"
        btn-small
        btn-text
        btn-color="success"
        max-width="373px"
        @confirm="copyItem(item)"
      >
        复制
        <template #container>
          <v-text-field v-model="copyName" label="竞赛名称" />
        </template>
      </confirm-dialog>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        参赛对象：{{ item.scope }} <br />竞赛简介：{{ item.description }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { getAllCompetition } from "../../../api/competition/competition";
import ApplyTableSearch from "./ApplyTableSearch";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default {
  name: "CompetitionApplyList",
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
    },
    copyName: ""
  }),
  components: { ApplyTableSearch, ConfirmDialog },
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
     *  @param id int
     */
    deleteItem(id) {
      console.log(id);
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
      console.log(searchFrom);
      // TODO 调用后端接口检索
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.getDate();
      }
    }
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
