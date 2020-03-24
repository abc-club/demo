<template>
  <div>
    <input type="text" v-focus />
    <div id="hook-arguments-example" v-demo:foo.a.b="message" @click="handler"></div>
    <p v-tack:left="dynamicleft">I’ll now be offset from the left instead of the top</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '123',
      dynamicleft: 500,
    };
  },
  components: {},
  methods: {
    handler() {
      this.message = 'abc';
    },
  },
};
</script>

<style scoped></style>
