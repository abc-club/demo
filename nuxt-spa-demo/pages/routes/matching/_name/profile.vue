<template>
  <div>匹配/routes/matching/:name/profile name: {{ name }}</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  computed: {
    name() {
      return this.$route.params.name
    }
  }
}
</script>

<style scoped></style>
