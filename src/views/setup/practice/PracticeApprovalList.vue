<template>
  <v-card>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      show-select
      show-expand
      disable-sort
    >
      <template #top>
        <practice-table-search @search="tableSearch" />
        <v-toolbar v-show="selectedApproval.length" dense flat>
          <confirm-dialog
            btn-color="success"
            title="确认批量审批"
            max-width="373px"
            @confirm="batchApproval"
          >
            批量审批
            <template #container>
              <v-list disabled>
                <v-list-item v-for="item in selectedApproval" :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </confirm-dialog>
        </v-toolbar>
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
      <template #item.action="{ item }">
        <v-btn
          v-if="item.status === 1"
          small
          color="warning"
          text
          :to="itemTo(`PracticeApproval`, item.id)"
          >审批
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
import {
  batchApprovalCompetition,
  getAllCompetition
} from "../../../api/competition";
import PracticeTableSearch from "./PracticeTableSearch";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default {
  name: "PracticeApprovalList",
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "申报部门", value: "department" },
      { text: "竞赛名称", value: "name" },
      { text: "时间", value: "time" },
      { text: "预算金额(元)", value: "budget" },
      { text: "上年度经费使用", value: "lastYearUseOfFunds" },
      { text: "上年度获奖", value: "lastYearAwards" },
      { text: "是否纳入评估", value: "isAssessment" },
      { text: "操作", value: "action" },
      { text: "", value: "data-table-expand" }
    ],
    desserts: [],
    selected: [],
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
  components: { PracticeTableSearch, ConfirmDialog },
  computed: {
    selectedApproval() {
      return this.selected.filter(item => {
        return item.status === 1;
      });
    }
  },
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
      // TODO 调用后端接口检索
      console.log(searchFrom);
    },
    batchApproval() {
      batchApprovalCompetition(this.selectedApproval.map(item => item.id)).then(
        res => {
          if (res.code === 200) this.dialog = false;
        }
      );
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
