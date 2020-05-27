<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    show-expand
    disable-sort
    no-data-text="无数据"
  >
    <template #top>
      <v-row no-gutters>
        <v-col cols="12">
          <c-table-search @search="searchData" />
        </v-col>
      </v-row>
    </template>
    <template #item.no="{ item }">
      {{ desserts.indexOf(item) + 1 }}
    </template>
    <template #item.comName="{ item }">
      <c-name-link :name="item.comName" :id="item.id" />
    </template>
    <template #item.comStatus="{ item }">
      <c-status-chip :status="item.comStatus" />
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        参赛对象：{{ item.comCondition }} <br />竞赛简介：{{ item.description }}
        <br />
        竞赛流程：{{ item.flow }} <br />
        主办单位：{{ item.sponsor }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import CTableSearch from "@/views/components/CTableSearch";
import CNameLink from "@/views/components/CNameLink";
import CStatusChip from "@/views/components/CStatusChip";
import { selectCompetitionHistoryList } from "@/api/competition/competition";

export default {
  name: "CompetitionHistoryList",
  components: {
    CTableSearch,
    CNameLink,
    CStatusChip
  },
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "申报部门", value: "department" },
      { text: "申报日期", value: "comDate" },
      { text: "负责人", value: "principalName" },
      { text: "状态", value: "comStatus" },
      { text: "最后处理人", value: "lastHandlerName" },
      { text: "", value: "data-table-expand" }
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
  computed: {
    isCollege() {
      return (
        this.$store.getters["user/info"].roles.length > 0 &&
        this.$store.getters["user/info"].roles[0] === "college"
      );
    }
  },
  methods: {
    searchData(
      searchFrom = {
        year: new Date().getFullYear(),
        department: this.isCollege
          ? this.$store.getters["user/info"].department
          : null,
        comName: null,
        sponsor: null
      }
    ) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      selectCompetitionHistoryList(page, itemsPerPage, searchFrom)
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

<style scoped></style>
