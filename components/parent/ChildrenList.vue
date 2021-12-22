<template>
  <div class="personSwipe">
    <div class="u-swipe" id="personSwipe">
      <div class="u-swipeArea" ref="swipe">
        <div
          v-for="(child, index) in childs"
          :key="index"
          :class="['u-swipe-item', { 'is-active': child.CHILD_ID === currentChildId }]"
        >
          <a @click.prevent="changeChild($event, child.CHILD_ID)" class="u-swipe-link">
            <span class="person-name">{{ child.CHILD_NAME }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildrenList',
  props: {
    childs: {
      type: Array,
      default: null,
      required: true,
    },
    currentChildId: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  methods: {
    changeChild(event, id) {
      let elem = event.target
      while (!elem.className.includes('u-swipe-item')) {
        elem = elem.offsetParent
      }
      this.$refs.swipe.scrollTo({
        top: 0,
        left: elem.offsetLeft,
        behavior: 'smooth',
      })
      this.$emit('update:currentChildId', id)
    },
  },
}
</script>
