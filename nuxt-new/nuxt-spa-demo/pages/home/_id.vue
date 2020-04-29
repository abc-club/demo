<template>
  <div>findme id:{{ id }}</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped></style>
