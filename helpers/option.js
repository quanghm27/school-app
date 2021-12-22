export default ({ store }) => ({
  get(key, value) {
    return store.getters.getOptionByKey(key, value)
  },
})
