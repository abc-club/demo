var compiler = require('vue-template-compiler');
var res = compiler.compile(`
<div id="app">
      <!-- <transition name="fade">
        <p v-if="msg">hello</p>
      </transition>
      <button @click="onclick">click</button> -->
      <!-- <input type="text" v-model="msg" /> -->
      <!-- <async-example /> -->
      <!-- <slot-comp>
        <template v-slot:head="slotScope">{{slotScope.a}} {{msg}}</template>
      </slot-comp> -->
      <keep-alive>
        <a-comp v-if="msg">a</a-comp>
        <b-comp v-else>b</b-comp>
      </keep-alive>
      <button @click="onclick">click</button>
    </div>
`);
// console.log(res.ast.children[0]);
console.log(res);
