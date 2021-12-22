<template>
  <portal to="v2-rating">
    <div :class="['pop', { 'is-active': value }, { center }]">
      <div class="u-middle">
        <div class="popBox relative w-auto flex flex-col items-center justify-center">
          <div class="btn-close" @click="close">
            <n-icon icon="close" class="w-6 h-6"></n-icon>
          </div>
          <img :src="require(`~/assets/img/develop-${$store.get('userRole')}.png`)" class="my-4" alt="" />
          <div class="mb-2">
            <p class="font-medium text-black text-center">Đang phát triển</p>
            <p class="font-medium text-gray-3 text-center">Bạn nghĩ sao về sự hữu ích của tính năng này</p>
          </div>
          <star-rating
            :rating="rateStar"
            @rating-selected="onRating"
            :show-rating="false"
            :star-size="20"
            class="mt-2 mb-6 flex items-center justify-center"
            :padding="4"
            text-class="text-center"
            :clearable="true"
          />
          <button @click="onSubmit" class="py-2 px-6 bg-primary rounded-md mb-6 font-bold text-[16px] text-white">
            Đánh giá
          </button>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState } from 'vuex'
import StarRating from 'vue-star-rating'

export default {
  name: 'V2Rating',
  components: { StarRating },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    center: {
      type: Boolean,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rateStar: 0,
    }
  },
  computed: {
    ...mapState(['showPopup']),
  },
  watch: {
    value(val) {
      this.$store.commit('setShowPopup', val)
    },
    showPopup(val) {
      if (!val && this.value) {
        this.close()
      }
    },
  },
  methods: {
    close() {
      this.$emit('input', false)
      this.$emit('update:zIndex', null)
      this.rateStar = 0
    },
    onRating(rate) {
      this.rateStar = rate
    },
    async onSubmit() {
      try {
        await this.$fire.analytics.logEvent(`feature_${this.name}_star_${this.rateStar}`)
        await this.$fire.analytics.logEvent('feature_click_count', { name: this.name, value: this.rateStar })
        this.close()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.btn-close {
  @apply absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.popArea {
  max-height: 55vh;
}
.pop {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
.pop.is-active {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.pop .u-middle {
  z-index: 0;
}
.pop.is-active .u-middle {
  z-index: 25;
}

.pop .main-action {
  padding: 1em 1.43em;
}

.pop .header-bottom {
  padding-left: 1.43em;
  padding-right: 1.43em;
}
</style>
