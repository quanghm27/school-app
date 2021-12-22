<template>
  <div class="daySwipe">
    <div class="u-swipe" id="daySwipe">
      <div class="u-swipeArea" ref="swipeArea">
        <div
          ref="date-item"
          v-for="(day, index) in dayOfWeeks"
          :key="index"
          :class="['u-swipe-item', { 'is-active': index + 1 === currentDay, 'is-new': index + 1 === nowISODay }]"
        >
          <a href="#" class="u-swipe-link" @click.prevent="changeDay($event, index + 1)">
            <span>{{ day }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentDay: {
      type: Number,
      default: 1,
    },
    dayOfWeeks: {
      type: Array,
      default() {
        return [
          this.$t('text_weekday_mon'),
          this.$t('text_weekday_tue'),
          this.$t('text_weekday_wed'),
          this.$t('text_weekday_thu'),
          this.$t('text_weekday_fri'),
          this.$t('text_weekday_sat'),
          this.$t('text_weekday_sun'),
        ]
      },
    },
  },
  data() {
    return {
      nowISODay: this.$moment().isoWeekday(),
    }
  },

  mounted() {
    this.$refs.swipeArea.scrollLeft = this.$refs['date-item'][this.currentDay - 1].offsetLeft
  },

  methods: {
    changeDay(event, newDay) {
      let elem = event.target
      while (!elem.className.includes('u-swipe-item')) {
        elem = elem.offsetParent
      }
      this.$refs.swipeArea.scrollTo({
        top: 0,
        left: elem.offsetLeft,
        behavior: 'smooth',
      })
      this.$emit('update:currentDay', newDay)
    },
  },
}
</script>
