<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    disable-sort
  >
    <template #item.teamMembers="{ item }">
      {{ item.teamMembers | TeamMemberTextFilter }}
    </template>
    <template #item.action>
      <v-btn small color="error" text>取消资格 </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { getParticipateEntryList } from "@/api/competition/process";

export default {
  name: "ConfirmParticipantList",
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "id" },
      { text: "参赛作品", value: "name" },
      { text: "参赛人员", value: "teamMembers" },
      { text: "操作", value: "action" }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0
  }),
  methods: {
    getData() {
      const sno = this.$route.params.id;
      console.log(this.$route);
      getParticipateEntryList(sno).then(({ code, data }) => {
        if (code !== 200) return;
        this.total = data.total;
        this.desserts = data.list;
      });
    }
  },
  filters: {
    TeamMemberTextFilter(value) {
      console.log(value);
      return value.map(e => e.name).join(",");
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped></style>
