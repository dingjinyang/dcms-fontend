<template>
  <v-expansion-panels hover v-model="expansionPanels">
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="12" xl="2" lg="2" md="12" sm="12">数据检索</v-col>
          <v-col
            cols="12"
            xl="10"
            lg="10"
            md="12"
            sm="12"
            class="text--secondary"
          >
            <v-fade-transition hide-on-leave>
              <span v-if="open">选择检索条件，点击检索按钮</span>
              <div v-else>
                <slot name="header"> </slot>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot name="content"></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "TableSearchToolbar",
  props: {
    panel: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    /**
     * 置为空数组，实现 expansion-panels 收起
     */
    expansionPanels: []
  }),
  computed: {
    textMarginTop() {
      return {
        "margin-top": this.$vuetify.breakpoint.mdAndDown ? "5px" : ""
      };
    }
  },
  watch: {
    panel: {
      immediate: true,
      handler(val) {
        this.expansionPanels = val;
      }
    }
  }
};
</script>

<style scoped></style>
