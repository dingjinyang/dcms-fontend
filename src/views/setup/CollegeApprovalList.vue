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
      item-key="id"
    >
      <template #top>
        <c-table-search @search="searchData" />
        <v-toolbar dense flat color="white">
          <v-row>
            <v-slide-x-transition>
              <v-col
                cols="6"
                xl="1"
                lg="2"
                md="2"
                sm="3"
                v-show="selectedApproval.length"
              >
                <confirm-dialog
                  btn-color="success"
                  title="确认批量审批"
                  max-width="373px"
                  @confirm="batchApproval"
                >
                  批量审批
                  <template #container>
                    <v-list disabled dense>
                      <v-list-item
                        v-for="item in selectedApproval"
                        :key="item.id"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            >{{ item.comName }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </template>
                </confirm-dialog>
              </v-col>
            </v-slide-x-transition>
            <!-- TODO 生成汇总表-->
            <!--            <v-col translate cols="6" xl="1" lg="2" md="2" sm="3">-->
            <!--              <v-btn color="primary" dark>-->
            <!--                生成汇总表-->
            <!--              </v-btn>-->
            <!--            </v-col>-->
          </v-row>
        </v-toolbar>
      </template>
      <template #item.no="{ item }">
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
          v-if="item.comStatus === 2"
          small
          color="warning"
          text
          :to="itemTo(`CollegeApproval`, item.id)"
          >审批
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {
  getCollegeApprovalList,
  batchCollegeApproval
} from "@/api/competition/competition";
import ConfirmDialog from "../../components/ConfirmDialog";
import CNameLink from "@/views/components/CNameLink";
import CStatusChip from "@/views/components/CStatusChip";
import CTableSearch from "@/views/components/CTableSearch";
import { competitionSearchForm } from "@/common/constant";

export default {
  name: "CollegeApprovalList",
  components: { ConfirmDialog, CNameLink, CStatusChip, CTableSearch },
  data: () => ({
    loading: false,
    dialog: false,
    selected: [],
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "级别", value: "comLevel" },
      { text: "申报部门", value: "department" },
      { text: "主办单位", value: "sponsor" },
      { text: "申报时间", value: "comDate" },
      { text: "负责人", value: "principalId" },
      { text: "联系方式", value: "principalPhone" },
      { text: "状态", value: "comStatus" },
      { text: "操作", value: "action" }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0
  }),
  computed: {
    selectedApproval() {
      return this.selected.filter(item => {
        return item.comStatus === 2;
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
      batchCollegeApproval(this.selectedApproval.map(item => item.id)).then(
        res => {
          if (res.code === 200) this.dialog = false;
        }
      );
    },
    // TODO 后端请求 本院系本年度立项申请
    searchData(searchForm = competitionSearchForm) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getCollegeApprovalList(page, itemsPerPage, searchForm)
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
    itemTo(name, competitionId) {
      return {
        name,
        params: { competitionId }
      };
    }
  }
};
</script>
