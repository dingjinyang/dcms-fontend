<template>
  <v-form ref="enroll_form">
    <span class="title">{{ name }}</span>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-text-field
          v-model="enrollForm.opusName"
          :readonly="!editable"
          label="参赛作品名称"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-text-field
          v-model="enrollForm.adviserName"
          :readonly="!editable"
          label="指导老师"
        />
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
          :loading="tableLoading"
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
              <enroll-form-add-item v-if="editable" @add="addItem" />
            </v-toolbar>
          </template>
          <template #item.order="{ item }">
            <span>{{ desserts.indexOf(item) + 1 }}</span>
          </template>
          <template v-if="editable" v-slot:item.actions="{ item }">
            <confirm-dialog
              v-if="item.id !== $store.getters['user/info'].id"
              title="确认删除"
              hide-text
              max-width="273px"
              btn-text
              btn-small
              btn-color="error"
              @confirm="deleteItem(item)"
            >
              删除
            </confirm-dialog>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12">
        <confirm-dialog
          v-if="editable"
          btn-color="success"
          hide-text
          max-width="273px"
          title="确认提交"
          :loading="submitLoading"
          @confirm="submit"
          >提交
        </confirm-dialog>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { signUpCompetition, searchSignUpInfo } from "@/api/student";
import EnrollFormAddItem from "./EnrollFormAddItem";
import ConfirmDialog from "@/components/ConfirmDialog";

export default {
  name: "EnrollForm",
  components: { EnrollFormAddItem, ConfirmDialog },
  data() {
    return {
      name: unescape(this.$route.query.name),
      competition: null,
      submitLoading: false,
      tableLoading: false,
      enrollForm: {
        competitionId: parseInt(this.$route.query.id),
        opusName: "",
        adviserName: ""
      },
      headers: [
        {
          text: "#",
          align: "start",
          value: "order"
        },
        { text: "学号", value: "id" },
        { text: "姓名", value: "stuName" },
        { text: "班级", value: "stuClass" },
        { text: "年级", value: "grade" },
        { text: "院系", value: "department" },
        { text: "操作", value: "actions" }
      ],
      desserts: [
        {
          id: this.$store.getters["user/info"].id,
          stuName: localStorage.getItem("name"),
          stuClass: "RB软工卓越161",
          grade: "2016",
          department: "软件学院"
        }
      ],
      editable: null
    };
  },
  mounted() {
    this.tableLoading = true;
    searchSignUpInfo(this.$route.query.id, this.$store.getters["user/info"].id)
      .then(({ code, data }) => {
        if (code === 200 && data) {
          this.enrollForm = data;
          this.desserts = data.students;
          this.editable =
            data.students[0].id === this.$store.getters["user/info"].id;
        } else this.editable = true;
      })
      .finally(() => {
        this.tableLoading = false;
      });
  },
  methods: {
    addItem(item) {
      !this.desserts.find(e => item.id === e.id) && this.desserts.push(item);
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
    },
    submit() {
      this.submitLoading = true;
      signUpCompetition({
        ...this.enrollForm,
        students: this.desserts
      })
        .then(({ code, msg, data }) => {
          code === 200 && this.$message.$emit("message", { text: msg });
          if (data !== null) this.enrollForm.id = data;
        })
        .finally(() => {
          this.submitLoading = false;
        });
    }
  }
};
</script>

<style scoped></style>
