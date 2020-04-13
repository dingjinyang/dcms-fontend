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
    <template #item.no="{ item }">
      {{ desserts.indexOf(item) + 1 }}
    </template>
    <template #item.comName="{ item }">
      <competition-name-link :id="item.id" :name="item.comName" />
    </template>
    <template #item.action="{ item }">
      <v-btn
        text
        color="warning"
        small
        :to="itemTo('FundReimburseApproval', item.id)"
        >报销
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import CompetitionNameLink from "@/views/components/CNameLink";
import { fundApplyList } from "@/api/competition/process";

export default {
  name: "FundReimburseList",
  components: { CompetitionNameLink },
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "主办单位", value: "sponsor" },
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
    itemTo(name, competitionId) {
      return {
        name,
        params: { competitionId }
      };
    },
    searchData() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      fundApplyList(page, itemsPerPage)
        .then(({ code, data: { total, list } }) => {
          if (code !== 200) return;
          this.desserts = list;
          this.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
