<template>
  <v-container>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading">{{
                item.username
              }}</v-card-title>
              <v-divider />

              <v-list dense>
                <v-list-item v-for="(key, index) in keys" :key="index">
                  <v-list-item-content>{{ key.text }} :</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item[key.value]
                  }}</v-list-item-content>
                </v-list-item>
              </v-list>
              <!--              <v-card-actions>-->
              <!--                <v-spacer />-->
              <!--                <div>-->
              <!--                  <v-btn v-perm="'user:update'" text color="success">-->
              <!--                    编辑-->
              <!--                  </v-btn>-->
              <!--                  <v-btn v-perm="'user:delete'" text color="error">-->
              <!--                    删除-->
              <!--                  </v-btn>-->
              <!--                </div>-->
              <!--              </v-card-actions>-->
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row align="center">
          <span class="grey--text">每页</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                small
                color="primary"
                class="ml-2 pa-0"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <span class="grey--text">条</span>
          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            共 {{ total }} 条
          </span>

          <span
            class="mr-4
            grey--text"
          >
            第 {{ page }} / {{ pages }} 页
          </span>
          <v-btn
            fab
            small
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { getAllUser } from "@/api/system";

export default {
  name: "UserManagement",
  data() {
    return {
      search: "",
      itemsPerPageArray: [3, 6, 9],
      page: 1,
      pages: 1,
      itemsPerPage: 3,
      keys: [
        { text: "工号", value: "account" },
        { text: "角色", value: "role" }
      ],
      items: [],
      total: 0
    };
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.pages) {
        this.page += 1;
        this.getDate();
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
        this.getDate();
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
      this.getDate();
    },
    getDate(pageNum = this.page, pageSize = this.itemsPerPage) {
      getAllUser(pageNum, pageSize)
        .then(({ code, data: { list, total, pageNum, pageSize, pages } }) => {
          if (code !== 200) return;
          this.items = list;
          this.total = total;
          this.page = pageNum;
          this.itemsPerPage = pageSize;
          this.pages = pages;
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {});
    }
  },
  mounted() {
    this.getDate();
  }
};
</script>

<style scoped></style>
