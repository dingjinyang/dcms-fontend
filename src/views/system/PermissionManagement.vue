<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Permission</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.perCode"
                        label="Code"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon @click="editItem(item)" v-perm="`permission:update`">
          mdi-table-edit
        </v-icon>
        <v-icon @click="deleteItem(item)" v-perm="`permission:delete`">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAllPermission } from "../../api/system";

export default {
  name: "PermissionManagement",
  data: () => ({
    search: "",
    loading: false,
    dialog: false,
    headers: [
      {
        text: "Id",
        align: "left",
        value: "id"
      },
      { text: "Name", sortable: false, value: "name" },
      { text: "Code", value: "perCode" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0,
    editedIndex: -1,
    editedItem: {
      name: "",
      perCode: ""
    },
    defaultItem: {
      name: "",
      perCode: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  methods: {
    getDate() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getAllPermission(page, itemsPerPage)
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
  watch: {
    options: {
      handler() {
        this.getDate();
      },
      deep: true
    },
    dialog(val) {
      val || this.close();
    }
  },
  activated() {
    this.getDate();
  }
};
</script>

<style scoped></style>
