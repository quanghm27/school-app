<template>
  <div class="showDaySwipe">
    <div class="daySwipe">
      <div class="u-swipe" id="daySwipe">
        <div class="u-swipeArea" ref="swipeArea">
          <div
            class="u-swipe-item"
            v-for="(date, index) in dates"
            ref="date-item"
            :key="index"
            :class="{ 'is-active': index === value, 'is-new': date.marked, 'is-disable': date.disabled }"
          >
            <a class="u-swipe-link" @click="selectDate($event, date, index)">
              <span>{{ date.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    dates: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$refs.swipeArea.scrollLeft += this.$refs['date-item'][this.value].offsetLeft
  },
  methods: {
    selectDate(event, date, index) {
      if (this.value === index) return

      let elem = event.target
      while (!elem.className.includes('u-swipe-item')) {
        elem = elem.offsetParent
      }
      this.$refs.swipeArea.scrollTo({
        top: 0,
        left: elem.offsetLeft,
        behavior: 'smooth',
      })
      if (!date.disabled) {
        this.$emit('input', index)
      }
    },
  },
}
</script>
