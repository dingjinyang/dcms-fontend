<template>
  <v-chip :color="status | competitionStatusColorFilter" small dark>
    {{ status | competitionStatusTextFilter }}
  </v-chip>
</template>

<script>
export default {
  name: "CStatusChip",
  props: { status: Number }
};
</script>
