export default store => {
  store.subscribe((mutation, state) => {
    console.log(state);
  });
};
