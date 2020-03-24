<template>
  <ul>
    <li v-for="child in children" :key="child.name">
      <tree-folder v-if="child.children" :folder="child" />
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>

<script>
import TreeFolder from './tree-folder.vue';

export default {
  name: 'tree-folder-contents',
  props: {
    children: Array,
  },
  data() {
    return {};
  },
  created() {
    this.$options.components.TreeFolder = TreeFolder;
  },
  // components: {
  //   TreeFolder,
  // },
};
</script>

<style scoped></style>
