<template>
  <v-form ref="enroll_form">
    <span class="title">{{ name }}</span>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-text-field v-model="enrollForm.entry" label="参赛作品名称" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-text-field v-model="enrollForm.adviser" label="指导老师" />
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
          hide-default-footer
          disable-sort
          disable-pagination
          disable-filtering
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>参赛人员</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <enroll-form-add-item @add="addItem" />
            </v-toolbar>
          </template>
          <template #item.order="{ item }">
            <span>{{ desserts.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <confirm-dialog
          btn-color="success"
          hide-text
          max-width="373px"
          title="确认提交"
          @confirm="save"
          >提交
        </confirm-dialog>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { selectCompetition } from "../../../api/competition/competition";
import EnrollFormAddItem from "./EnrollFormAddItem";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default {
  name: "EnrollForm",
  data: () => ({
    name: "",
    enrollForm: {
      entry: "",
      adviser: ""
    },
    headers: [
      {
        text: "#",
        align: "start",
        value: "order"
      },
      { text: "学号", value: "sno" },
      { text: "姓名", value: "name" },
      { text: "班级", value: "class" },
      { text: "年级", value: "grade" },
      { text: "院系", value: "college" },
      { text: "操作", value: "actions" }
    ],
    desserts: [
      {
        sno: "201619150118",
        name: "张三",
        class: "RB软工卓越161",
        grade: "2016",
        college: "软件学院"
      }
    ]
  }),
  components: { EnrollFormAddItem, ConfirmDialog },
  methods: {
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },
    addItem(item) {
      !this.desserts.find(e => item.sno === e.sno) && this.desserts.push(item);
    },
    save() {
      console.log({
        ...this.enrollForm,
        teamMembers: this.desserts
      });
    }
  },
  activated() {
    selectCompetition(this.$route.params.id).then(({ code, data }) => {
      if (code !== 200) return;
      this.name = data.name;
    });
  }
};
</script>

<style scoped></style>
