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
    <template #item.action>
      <v-btn text small color="primary">查看详情 </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import CompetitionNameLink from "@/views/components/CNameLink";

export default {
  name: "FundReimburseList",
  components: { CompetitionNameLink },
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "阶段", value: "stageName" },
      { text: "报销金额", value: "money" },
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
    searchData() {
      this.desserts = [
        { id: 1, comName: "2019蓝桥杯", stageName: "校赛", money: "1000" },
        { id: 2, comName: "2019蓝桥杯", stageName: "省赛", money: "2000" },
        { id: 3, comName: "2019蓝桥杯", stageName: "国赛", money: "3000" }
      ];
      this.total = 3;
    }
  }
};
</script>

<style scoped></style>
