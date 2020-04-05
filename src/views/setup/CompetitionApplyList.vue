<template>
  <div>
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
            <c-table-search @search="searchData" />
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
      <template #item.comName="{ item }">
        <c-name-link :name="item.comName" :id="item.id" />
      </template>
      <template #item.comStatus="{ item }">
        <c-status-chip :status="item.comStatus" />
      </template>
      <template #item.action="{ item }">
        <v-btn
          v-if="item.comStatus === 1"
          small
          color="warning"
          text
          :to="itemTo('CompetitionEdit', item.id)"
          >编辑
        </v-btn>
        <v-btn
          v-if="item.comStatus === 3"
          small
          color="primary"
          text
          :to="itemTo('CompetitionRevise', item.id)"
          >修改
        </v-btn>
        <confirm-dialog
          v-if="item.comStatus === 1"
          title="确认撤销"
          btn-small
          btn-text
          btn-color="error"
          max-width="273px"
          hide-text
          @confirm="deleteItem(item)"
        >
          撤销
        </confirm-dialog>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          参赛对象：{{ item.comCondition }} <br />竞赛简介：{{
            item.description
          }}
          <br />
          竞赛流程：{{ item.flow }} <br />
          主办单位：{{ item.sponsor }}
        </td>
      </template>
    </v-data-table>
    <c-snackbar ref="snackbar" />
  </div>
</template>

<script>
import {
  getAllCompetition,
  deleteCompetitionApply
} from "@/api/competition/competition";
import ConfirmDialog from "@/components/ConfirmDialog";
import CNameLink from "@/views/components/CNameLink";
import CStatusChip from "@/views/components/CStatusChip";
import CTableSearch from "@/views/components/CTableSearch";
import CSnackbar from "@/views/components/CSnackbar";

export default {
  name: "CompetitionApplyList",
  components: {
    CTableSearch,
    ConfirmDialog,
    CNameLink,
    CStatusChip,
    CSnackbar
  },
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "id" },
      { text: "名称", value: "comName" },
      { text: "申报部门", value: "department" },
      { text: "申报日期", value: "comDate" },
      { text: "负责人", value: "principalName" },
      { text: "状态", value: "comStatus" },
      { text: "最后处理人", value: "lastHandlerName" },
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
  watch: {
    options: {
      deep: true,
      handler() {
        this.searchData();
      }
    }
  },
  methods: {
    /**
     * 撤销当前竞赛
     *  @param item int
     */
    deleteItem(item) {
      deleteCompetitionApply(item.id).then(({ code }) => {
        if (code === 200) {
          const index = this.desserts.indexOf(item);
          this.desserts.splice(index, 1);
          this.$refs.snackbar.show("success", "删除成功！");
        }
      });
    },
    searchData(
      searchFrom = {
        year: new Date().getFullYear(),
        department: null,
        comName: null,
        sponsor: null
      }
    ) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getAllCompetition(page, itemsPerPage, searchFrom)
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
    }
  }
};
</script>
