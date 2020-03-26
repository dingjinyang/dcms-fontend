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
          sort-by="calories"
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
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"
                    >添加组员</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">新增组员</span>
                  </v-card-title>

                  <v-card-text>
                    <v-autocomplete
                      v-model="model"
                      :items="items"
                      :loading="isLoading"
                      :search-input.sync="search"
                      hide-no-data
                      hide-selected
                      item-text="Description"
                      item-value="API"
                      label="学号"
                      placeholder="Start typing to Search"
                      prepend-icon="mdi-database-search"
                      return-object
                    ></v-autocomplete>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-expand-transition>
                    <v-list v-if="model">
                      <v-list-item v-for="(field, i) in fields" :key="i">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="field.value"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-text="field.key"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expand-transition>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      取消
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.order="{ item }">
            <span>{{ desserts.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { getCompetitionDetail } from "../../api/competition/competition";

export default {
  name: "EnrollForm",
  data: () => ({
    name: "",
    enrollForm: {
      entry: "",
      adviser: ""
    },
    dialog: false,
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
    ],
    editedItem: {
      sno: "",
      name: "",
      class: "",
      grade: "",
      college: ""
    },
    defaultItem: {
      sno: "",
      name: "",
      class: "",
      grade: "",
      college: ""
    },
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),
  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    //TODO 学号数据检索
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
  activated() {
    getCompetitionDetail(this.$route.params.id).then(({ code, data }) => {
      if (code !== 200) return;
      this.name = data.name;
    });
  }
};
</script>

<style scoped></style>
