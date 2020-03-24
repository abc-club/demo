<template>
  <p>
    <span>{{ folder.name }}</span>
    <tree-folder-contents :children="folder.children" />
  </p>
</template>

<script>
import TreeFolderContents from './tree-folder-contents.vue';

export default {
  name: 'tree-folder',
  props: ['folder'],
  data() {
    return {};
  },
  created() {
    this.$options.components.TreeFolderContents = TreeFolderContents;
  },
  components: {},
};
</script>

<style scoped></style>
