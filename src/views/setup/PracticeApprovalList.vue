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
        <c-table-search @search="searchData" />
        <v-expand-transition>
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
        </v-expand-transition>
      </template>
      <template #item.no="{item}">
        {{ desserts.indexOf(item) + 1 }}
      </template>
      <template #item.comName="{ item }">
        <c-name-link :id="item.id" :name="item.comName" />
      </template>
      <template #item.comStatus="{ item }">
        <c-status-chip :status="item.comStatus" />
      </template>
      <template #item.action="{ item }">
        <v-btn
          v-if="item.comStatus === 5"
          small
          color="warning"
          text
          :to="itemTo(`PracticeApproval`, item.id)"
          >审批
        </v-btn>
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
  </v-card>
</template>

<script>
import {
  batchPracticeApproval,
  getPracticeApprovalList
} from "@/api/competition/competition";
import ConfirmDialog from "@/components/ConfirmDialog";
import CNameLink from "@/views/components/CNameLink";
import CTableSearch from "@/views/components/CTableSearch";
import CStatusChip from "@/views/components/CStatusChip";

import { competitionSearchForm } from "@/common/constant";

export default {
  name: "PracticeApprovalList",
  components: { CTableSearch, ConfirmDialog, CNameLink, CStatusChip },
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "申报部门", value: "department" },
      { text: "申报日期", value: "comDate" },
      { text: "负责人", value: "principalId" },
      { text: "状态", value: "comStatus" },
      { text: "最后处理人", value: "lastHandler" },
      { text: "申报部门", value: "department" },
      { text: "预算金额(元)", value: "budget" },
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
  computed: {
    selectedApproval() {
      return this.selected.filter(item => {
        return item.status === 1;
      });
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.searchData();
      }
    }
  },
  methods: {
    batchApproval() {
      batchPracticeApproval(this.selectedApproval.map(item => item.id)).then(
        res => {
          if (res.code === 200) this.dialog = false;
        }
      );
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
    searchData(searchForm = competitionSearchForm) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getPracticeApprovalList(page, itemsPerPage, searchForm)
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
    }
  }
};
</script>
