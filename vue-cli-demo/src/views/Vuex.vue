<template>
  <div>
    <button @click="handler">click</button>
    {{ count }} {{ doubleCount }} {{ sum(10) }}
    <p>{{ obj }}</p>
    <p>{{ arr }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['count', 'obj', 'arr']),
    ...mapGetters(['doubleCount', 'sum']),
    // doubleCount() {
    //   return this.$store.getters.doubleCount;
    // },
    // sum() {
    //   return this.$store.getters.sum;
    // },
  },
  components: {},
  methods: {
    ...mapMutations(['increment', 'addProps', 'ADDARR']),
    ...mapActions(['incrementAsync', 'actionA', 'actionB']),
    handler() {
      this.increment({
        amount: 3,
      });
      this.addProps();
      this.ADDARR();
      this.callAsync();
    },
    async callAsync() {
      let res = await this.actionA();
      console.log(res);
      await this.actionB();
    },
  },
};
</script>

<style scoped></style>
