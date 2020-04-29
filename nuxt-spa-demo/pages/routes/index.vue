<template>
  <div>
    /routes 基础路由
    <nuxt-link to="/routes/base">/routes/base</nuxt-link>
    <br />
    <nuxt-link to="/routes/base/one">/routes/base/one</nuxt-link>
    <br />

    动态路由
    <nuxt-link to="/routes/matching/1">/routes/matching/:id</nuxt-link><br />
    <nuxt-link to="/routes/matching/xiaoming">/routes/matching/:name</nuxt-link
    ><br />
    <nuxt-link to="/routes/matching/xiaoming/profile"
      >/routes/matching/:name/profile</nuxt-link
    ><br />

    嵌套路由
    <nuxt-link to="/routes/nest/home">/routes/nest/home</nuxt-link><br />
    <nuxt-link to="/routes/nest/home/profile"
      >/routes/nest/home/profile</nuxt-link
    ><br />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped></style>
