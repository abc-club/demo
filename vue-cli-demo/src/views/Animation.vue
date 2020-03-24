<template>
  <div>
    {{ 10 | sum(1, 2) }}
    <div @click="toggle">{{ 'toggle' | capitalize }}</div>
    <!-- <transition name="fade" mode="out-in">
      <div v-if="show" key="a">{{ show }}</div>
      <div v-else key="b">aaa</div>
    </transition> -->
    <!-- <transition name="bounce">
      <p v-if="show">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant
        morbi tristique senectus et netus.
      </p>
    </transition> -->
    <!-- <transition name="xxx" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
      <p ref="hello" v-if="show">hello</p>
    </transition>
    <div ref="ppp" class="transition" :class="[show ? '' : 'hide']">
      {{ show }}
    </div> -->
    <!-- <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
      <p v-if="show">
        Demo
      </p>
    </transition> -->
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list" tag="p">
      <span v-for="item in items" v-bind:key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';

export default {
  data() {
    return {
      show: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
    };
  },
  mounted() {
    // console.log(this.$refs);
    // this.$refs.ppp.addEventListener('transitionend', () => {
    //   console.log('transitionend');
    // });
  },
  components: {},
  methods: {
    toggle() {
      this.show = !this.show;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transformOrigin = 'left';
    },
    enter(el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 });
      Velocity(el, { fontSize: '1em' }, { complete: done });
    },
    leave(el, done) {
      Velocity(el, { rotateZ: '50deg' }, { complete: done });
      // Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 });
      // Velocity(el, { rotateZ: '100deg' }, { loop: 2, complete: done });
      // Velocity(
      //   el,
      //   {
      //     rotateZ: '45deg',
      //     translateY: '30px',
      //     translateX: '30px',
      //     opacity: 0,
      //   },
      //   { complete: done },
      // );
    },
    randomIndex() {
      return Math.floor(Math.random() * this.items.length);
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum + 1);
    },
    remove() {
      this.items.splice(this.randomIndex(), 1);
    },
  },
};
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.bounce-enter-active,
.bounce-leave-active {
  animation: bounce 1s ease;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
  transition: all 1s;
}
.list-enter-active,
.list-leave-active {
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

@keyframes bounce {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-100px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0px);
  }
}

.transition {
  transition: opacity 10s;
}
.hide {
  opacity: 0;
}
</style>
