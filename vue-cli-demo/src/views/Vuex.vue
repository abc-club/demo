<template>
  <div>
    <button @click="handler">click</button>
    {{ count }} {{ doubleCount }} {{ sum(10) }}
    <p>{{ obj }}</p>
    <p>{{ arr }}</p>
    <p>{{ a.count + 1 }}</p>
    <!-- 严格模式下会报错，因为a会被这里修改 -->
    <input type="text" v-model="obj.a" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.a);
  },
  computed: {
    ...mapState(['count', 'obj', 'arr', 'a']),
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
      // 会同时执行外层和module里的increment
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
