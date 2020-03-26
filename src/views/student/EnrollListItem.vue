<template>
  <v-expand-transition>
    <v-card class="mt-3" v-show="item">
      <v-card-title>
        <span class="font-weight-light">{{ item.name }}</span>
        <v-spacer />
        <span class="font-weight-light">{{ item.department }}</span>
      </v-card-title>

      <v-card-subtitle class="font-weight-bold">
        {{ item.description }}
      </v-card-subtitle>

      <v-card-actions>
        <span class="v-card__subtitle" style="padding:0 0 0 8px"
          >比赛时间：{{ item.startTime }} — {{ item.endTime }}</span
        >
        <v-spacer />
        <v-btn text color="primary" @click="show = !show">
          查看详情
        </v-btn>

        <v-btn
          text
          color="success"
          :to="{ name: 'EnrollForm', params: { id: item.id } }"
        >
          报名
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>比赛等级：{{ item.level }}</v-list-item-title>
              <v-list-item-title>参赛范围：{{ item.scope }}</v-list-item-title>
              <v-list-item-title
                >比赛阶段：
                <ul>
                  <li v-for="s in item.stages" :key="s.name">
                    <span>
                      {{ s.name }} : {{ s.startTime }} - {{ s.endTime }}</span
                    >
                  </li>
                </ul>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-expand-transition>
    </v-card>
  </v-expand-transition>
</template>

<script>
export default {
  name: "EnrollListItem",
  props: {
    item: Object
  },
  data: () => ({
    show: false
  })
};
</script>

<style scoped></style>
