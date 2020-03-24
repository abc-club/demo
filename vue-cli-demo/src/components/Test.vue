<template>
  <div>
    {{ tt }}
  </div>
</template>

<script>
export default {
  props: ['tt'],
  data() {
    return {
      test: 'test',
    };
  },
  components: {},
};
</script>

<style scoped></style>
