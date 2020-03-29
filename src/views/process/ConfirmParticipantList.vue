<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    show-expand
    disable-sort
    disable-filtering
  >
    <template #item.teamMembers="{ item }">{{
      item.teamMembers | TeamMemberTextFilter
    }}</template>
    <template #item.action="{ item }">
      <confirm-dialog
        title="取消资格"
        btn-text
        btn-small
        btn-color="error"
        max-width="373px"
        hide-text
        @confirm="deleteItem(item)"
        >取消资格</confirm-dialog
      >
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <span v-for="(e, i) in item.teamMembers" :key="e.sno">
          {{ i + 1 }} . 学号：{{ e.sno }} ， 姓名：{{ e.name }} ， 班级：{{
            e.class
          }}
          ， 学院：{{ e.college }}
          <br />
        </span>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { getParticipateEntryList } from "@/api/competition/process";
import ConfirmDialog from "@/components/ConfirmDialog";

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
  components: { ConfirmDialog },
  methods: {
    getData() {
      const sno = this.$route.params.id;
      getParticipateEntryList(sno).then(({ code, data }) => {
        if (code !== 200) return;
        this.total = data.total;
        this.desserts = data.list;
      });
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
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
