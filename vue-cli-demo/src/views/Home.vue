<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- 这里是组件内的作用域 -->
    <!-- <Test tt="123" inline-template>
      <div>{{ test }}</div>
    </Test> -->
    <!-- <tree-folder :folder="folder"></tree-folder> -->
    <!-- <HelloWorld v-model="message" :title.sync="title" propF="success" class="A" style="color:blue" aa v-on:change.native="change">
      <template v-slot:header="slotProps">
        {{ slotProps.user.firstName }}
      </template>
      <template v-slot:footer>
        footer-overide
      </template>
    </HelloWorld> -->
    <!-- <input v-model="message" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br />
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label> -->
    <!-- <div id="example-3">
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames" />
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
      <label for="mike">Mike</label>
      <input type="checkbox" id="aa" value="aa" v-model="checkedNames" />
      <label for="aa">aa</label>

      <br />
      <span>Checked names: {{ checkedNames }}</span>
    </div> -->
    <!-- <div id="example-6">
      <select v-model="selected" multiple style="width: 50px;">
        <option value="1">A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <br />
      <span>Selected: {{ selected }}</span>
    </div> -->
    <div @click="handler">{{ checkedNames }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
// import LoadingComponent from '@/components/LoadingComponent.vue';
// import ErrorComponent from '@/components/ErrorComponent.vue';
// import TreeFolder from '@/components/tree-folder.vue';
// import Test from '@/components/Test.vue';

export default {
  name: 'Home',
  provide() {
    return {
      checkedNames: this.checkedNames,
    };
  },
  components: {
    // HelloWorld: () => import('@/components/HelloWorld.vue'),
    // HelloWorld(resolve) {
    //   setTimeout(() => {
    //     resolve(HelloWorld);
    //   }, 2000);
    // },
    // HelloWorld() {
    //   return {
    //     // 需要加载的组件 (应该是一个 `Promise` 对象)
    //     component: import('@/components/HelloWorld.vue'),
    //     // 异步组件加载时使用的组件
    //     loading: LoadingComponent,
    //     // 加载失败时使用的组件
    //     error: ErrorComponent,
    //     // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //     delay: 200,
    //     // 如果提供了超时时间且组件加载也超时了，
    //     // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //     timeout: 3000,
    //   };
    // },
    // TreeFolder,
    // Test,
  },
  data() {
    return {
      message: '123',
      title: '123',
      checked: false,
      checkedNames: [1, 3, 4],
      selected: [],
      folder: {
        name: 'a',
        children: [
          {
            name: 'a1',
            children: [
              {
                name: 'a2',
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    change() {
      console.log('change');
    },
    changeTitle(val) {
      this.title = val;
    },
    handler() {
      this.checkedNames[this.checkedNames.length] = 1;
      this.$forceUpdate();
    },
  },
};
</script>
