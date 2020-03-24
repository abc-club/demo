<template>
  <div class="hello">
    <slot name="header" :user="user">
      {{ user.lastName }}
    </slot>
    <slot name="footer">
      footer
    </slot>
    <div class="bg" v-bind="$attrs"></div>
    <div class="bg1"></div>
    <div class="bg2" @click="test"></div>
    <h1>{{ propF }}{{ checkedNames }}</h1>
    <!-- <input type="text" :value="msg" @input="handler" /> -->
    <input v-bind="$attrs" v-bind:value="msg" v-on="inputListeners" />
    <button @click="changeTitle">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  inheritAttrs: false,
  model: {
    prop: 'msg',
    event: 'input',
  },
  inject: ['checkedNames'],
  props: {
    msg: String,
    title: String,
    propF: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      user: {
        firstName: '1',
        lastName: '2',
      },
    };
  },
  computed: {
    inputListeners() {
      const vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return {
        ...this.$listeners,
        ...{
          // 这里确保组件配合 `v-model` 的工作
          input(event) {
            console.log('input');

            vm.$emit('input', event.target.value);
          },
        },
      };
      // return Object.assign(
      //   {},
      //   // 我们从父级添加所有的监听器
      //   this.$listeners,
      //   // 然后我们添加自定义监听器，
      //   // 或覆写一些监听器的行为
      //   {
      //     // 这里确保组件配合 `v-model` 的工作
      //     input(event) {
      //       vm.$emit('input', event.target.value);
      //     },
      //   },
      // );
    },
  },
  methods: {
    handler(event) {
      this.$emit('input', event.target.value);
    },
    changeTitle() {
      this.$emit('update:title', 'abc');
    },
    test() {
      throw new Error();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bg {
  height: 100px;
  background: url('../assets/logo.png');
}
.bg1 {
  height: 100px;
  background: url('/img/icons/android-chrome-192x192.png');
}
.bg2 {
  height: 100px;
  background: $primary-color;
}
</style>
