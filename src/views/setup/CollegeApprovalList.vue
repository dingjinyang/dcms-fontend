<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    disable-sort
    no-data-text="无数据"
  >
    <template #top>
      <c-table-search @search="searchData" />
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
</template>

<script>
import { selectCollegeApprovalList } from "@/api/competition/competition";
import CNameLink from "@/views/components/CNameLink";
import CStatusChip from "@/views/components/CStatusChip";
import CTableSearch from "@/views/components/CTableSearch";
import { competitionSearchForm } from "@/common/constant";

export default {
  name: "CollegeApprovalList",
  components: { CNameLink, CStatusChip, CTableSearch },
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "级别", value: "comLevel" },
      { text: "申报部门", value: "department" },
      { text: "主办单位", value: "sponsor" },
      { text: "申报时间", value: "comDate" },
      { text: "负责人", value: "principalName" },
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
  watch: {
    options: {
      deep: true,
      handler() {
        this.searchData();
      }
    }
  },
  methods: {
    // TODO 后端请求 本院系本年度立项申请
    searchData(searchForm = competitionSearchForm) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      selectCollegeApprovalList(page, itemsPerPage, searchForm)
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
