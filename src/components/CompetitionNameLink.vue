<template>
  <router-link
    :to="{
      name: 'CompetitionDetail',
      params: { competitionId: id }
    }"
    class="competition-name-link"
  >
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: "CompetitionNameLink",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.competition-name-link {
  color: #08c;
  text-decoration: none;
}
.competition-name-link:hover {
  color: #0408b7;
  text-decoration: underline;
}
</style>
