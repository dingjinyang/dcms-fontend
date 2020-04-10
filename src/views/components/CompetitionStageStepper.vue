<template>
  <v-card flat>
    <v-card-text class="title black--text">
      竞赛阶段管理
    </v-card-text>
    <v-card-text>
      <v-stepper alt-labels :value="currentStage">
        <v-stepper-header>
          <template v-for="(item, index) in stages">
            <v-stepper-step
              class="align-center"
              :step="item.stage"
              :key="`${item.stage}-step`"
              :complete="currentStage >= item.stage"
              :editable="currentStage >= item.stage"
              :edit-icon="currentStage === item.stage ? '$complete' : '$edit'"
              @click="
                currentStage >= item.stage ? $emit('change', item.stage) : ''
              "
            >
              {{ item.stageName }}
              <small>
                <span class="mt-2">开始： {{ item.startTime }}</span>
                <br />
                <span class="mt-2">结束： {{ item.endTime }}</span>
              </small>
            </v-stepper-step>
            <v-divider
              v-if="index !== stages.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <confirm-dialog
        :title="nextBtnText"
        :btn-color="nextBtnColor"
        max-width="450px"
        @confirm="next"
      >
        {{ nextBtnText }}
        <template #container>
          <v-alert dense text type="warning">
            进入下一段将不能返回，确认进入下一阶段？
          </v-alert>
        </template>
      </confirm-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  name: "CompetitionStageStepper",
  components: { ConfirmDialog },
  props: {
    stages: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    currentStage: {
      type: Number
    }
  },
  computed: {
    nextBtnText() {
      return this.currentStage < this.stages.length
        ? "开始下一阶段"
        : "结束竞赛";
    },
    nextBtnColor() {
      return this.currentStage < this.stages.length ? "primary" : "warning";
    }
  },
  methods: {
    next() {
      this.$emit("next");
    }
  }
};
</script>

<style scoped></style>
