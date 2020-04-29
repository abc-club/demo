<template>
  <div>
    main
  </div>
</template>

<script>
export default {
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    consloe.log(
      isDev,
      route,
      store,
      env,
      params,
      query,
      req,
      res,
      redirect,
      error
    )
  },
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped></style>
