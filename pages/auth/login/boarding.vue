<template>
  <div>
    <n-header class="px-4 pt-4 relative bg-yellow-FFE344" leftDefault="" rightDefault="">
      <template slot="headerLeft">
        <n-icon v-show="currPage > 0" icon="back" class="p-2 rounded-full bg-[#f6d414] w-8 h-8" @click="back"></n-icon>
      </template>
      <span></span>
      <template slot="headerRight">
        <n-link :to="{ name: 'auth-login-select-role' }" tag="span" class="text-lg h-8">
          {{ $t('text_leave_out') }}
        </n-link>
      </template>
    </n-header>

    <Carousel
      :perPage="1"
      :paginationEnabled="true"
      v-model="currPage"
      @transitionEnd="handleTransitionEnd"
      ref="carousel"
    >
      <Slide v-for="(item, index) in dataInfo" :key="item.image">
        <div class="flex relative w-full h-[40vh] bg-yellow-FFE344">
          <Lottie
            v-show="pageCount >= index"
            class="absolute absolute bottom-0"
            :key="item.image"
            :options="item.lottieData"
            @animCreated="lottie => handleAnimCreated(lottie, item.lottieData.name)"
            width="100vw"
            height="40vh"
          />
          <div class="absolute bottom-0 right-0 left-0">
            <div class="circle"></div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <h1 class="max-w-[65%] text-lg ssm:text-4xl font-bold text-center mt-8">{{ item.title }}</h1>
          <p class="max-w-[60%] text-center mt-6">{{ item.content }}</p>
        </div>
      </Slide>
    </Carousel>
    <div class="flex justify-center items-center mt-4">
      <button
        @click="handleContinues"
        class="border-0 rounded-lg bg-yellow-FFE344 mt-4 py-2 px-8 shadow-lg ssm:text-lg"
      >
        {{ $t(dataInfo[currPage].button) }}
      </button>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import Lottie from '@/components/Lottie'

export default {
  name: 'Onboarding',
  layout: 'auth',
  middleware: 'boarding',
  components: {
    Carousel,
    Slide,
    Lottie,
  },
  data() {
    return {
      lottie: {},
      currPage: 0,
      pageCount: 0,
      dataInfo: [
        {
          info: this.$t('Kết nối để hiếu sự vất vả của các con'),
          button: this.$t('Tiếp tục'),
          title: this.$t('Thông tin nhanh chóng'),
          content: this.$t('Nắm bắt thông tin, thông báo của nhà trường tức thời'),
          lottieData: {
            name: 'student',
            animationData: require('assets/lotties/1.json'),
          },
        },
        {
          info: this.$t('Kết nối để liên lạc gia đình với nhà trường'),
          button: this.$t('Tiếp tục'),
          title: this.$t('Cầu nối liên lạc'),
          content: this.$t('Kết nối gia đình và nhà trường thông qua sổ liên lạc điện tử'),
          lottieData: {
            name: 'parent',
            animationData: require('assets/lotties/2.json'),
          },
        },
        {
          info: this.$t('Giúp con bạn thực hiện ước mơ học tập thành tài'),
          button: this.$t('Bắt đầu'),
          title: this.$t('Quản lý thông minh'),
          content: this.$t('Hệ thống thời khoá biểu và theo dõi điểm danh hỗ trợ quản lý'),
          lottieData: {
            name: 'teacher',
            animationData: require('assets/lotties/3.json'),
          },
        },
      ],
    }
  },
  computed: {
    deviceInfo() {
      return this.$store.state.device.deviceInfo
    },
    lotties() {
      return this.dataInfo.map(e => e.lottieData.name)
    },
    currLottieName() {
      return this.lotties[this.currPage]
    },
  },
  mounted() {
    const firstLottieName = this.lotties[0]
    this.lottie[firstLottieName].goToAndPlay()
  },
  methods: {
    handleTransitionEnd() {
      if (this.pageCount < this.currPage) this.pageCount = this.currPage
      this.lottie[this.currLottieName].goToAndPlay()
    },
    handleAnimCreated(lottie, name) {
      this.lottie[name] = lottie
    },
    async handleContinues() {
      if (this.currPage === 2)
        await this.$router.push({
          name: 'auth-login-select-role',
        })

      this.$refs.carousel.advancePage('forward')
    },
    back() {
      if (this.currPage === 0) return

      this.currPage--
      this.$refs.carousel.goToPage(this.currPage)
    },
  },
}
</script>

<style>
.VueCarousel-dot-container {
  margin-top: 0 !important;
}

.VueCarousel-dot {
  margin-top: 0 !important;
  border-radius: 9999px !important;
  transition: all 0.3s;
  outline: none !important;
  background-color: #bdbdbd !important;
}

.VueCarousel-dot--active {
  width: 30px !important;
  background-color: #333333 !important;
}

.VueCarousel-pagination {
  margin-top: 20px;
}

.circle {
  z-index: 100;
  width: 100vw;
  height: 100vw;
  overflow: hidden;
  position: relative;
}

.circle::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;

  background: transparent;
  bottom: 0;
  left: 0;
  box-shadow: 0px calc(100vw / 1.8) 0 calc(100vw / 4) #fff;
}
</style>
