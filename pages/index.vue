<template>
  <ms-template page-type="home" default-header-left="drawer" :show-decor="true" status-bar-style="light-content">
    <template slot="content">
      <parent-status v-if="isParent" />
      <common-status v-else />
      <section class="ybm">
        <alarm-list :data="alarmList" :loading="$fetchState.pending" img-size="thumb" />
      </section>
      <section class="news">
        <div class="homeTop">
          <h2 class="home-title">{{ $t('text_recent_news') }}</h2>
          <nuxt-link :to="{ name: 'alarm' }" class="home-more" v-if="alarmList.length">
            {{ $t('btn_view_all') }}
            <i class="icoApp-more"></i>
          </nuxt-link>
        </div>
        <alarm-list :data="alarmList" :loading="$fetchState.pending" img-size="thumb" />
      </section>
      <section>
        <ms-services-list :is-drawer="false" />
      </section>
      <section class="contact">
        <div class="homeTop">
          <h2 class="home-title">{{ $t('text_contact_details') }}</h2>
          <nuxt-link :to="{ name: 'contact' }" class="home-more" v-if="contactList.length">
            {{ $t('btn_view_all') }}
            <i class="icoApp-more"></i>
          </nuxt-link>
        </div>
        <div class="contactSwipe" v-if="contactList.length">
          <div class="u-swipe" id="contactSwipe">
            <div class="u-swipeArea">
              <ms-spinner v-if="$fetchState.pending" />
              <template v-else>
                <div class="u-swipe-item" v-for="(contact, index) in contactList" :key="index">
                  <a href="#" class="u-swipe-link">
                    <p class="u-pic" :style="getImage(contact)"></p>
                    <p class="person-name">{{ contact.USER_NAME }}</p>
                  </a>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="nodata" v-else>
          <div class="nodataArea">
            <i class="icoApp-alert"></i>
            <p>{{ $t('text_contact_no') }}</p>
          </div>
        </div>
      </section>
    </template>
    <ms-banner v-if="isStudent" v-model="showGame" cClass="banner-container" :showClose="false">
      <Carousel :perPage="1" :paginationEnabled="false">
        <Slide>
          <a href="#" class="icoApp-popClose" @click.prevent="showGame = false"></a>
          <div class="slide-container">
            <ms-spinner v-if="loading" class="banner-loading" />
            <template v-if="isStudent">
              <img class="img-banner" @click="joinGame" src="~/assets/img/minigame/banner-stop.jpeg" alt="banner.png" />
            </template>
          </div>
        </Slide>
      </Carousel>
    </ms-banner>
  </ms-template>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'
import { JWT_TOKEN_MINIGAME, ROLE, USER_TYPE } from '@/constants'
import CommonStatus from '@/components/home/CommonStatus'
import ParentStatus from '@/components/home/ParentStatus'
import AlarmList from '@/components/alarm/AlarmList'
import MsServicesList from '~/components/common/MsServicesList'

const ROLE_NAME = {
  [USER_TYPE.TEACHER]: ROLE.TEACHER,
  [USER_TYPE.PARENT]: ROLE.PARENT,
  [USER_TYPE.STUDENT]: ROLE.STUDENT,
}

export default {
  data() {
    return {
      USER_TYPE,
      contactList: [],
      alarmList: [],
      showGame: false,
      loading: false,
      isStopEvent: true, // stop event
    }
  },
  asyncData({ redirect }) {
    redirect('/v2/home')
  },
  components: { ParentStatus, CommonStatus, AlarmList, Carousel, Slide, MsServicesList },
  computed: {
    ...mapState(['userRole']),
    isTeacher() {
      return this.userRole === ROLE.TEACHER
    },
    isParent() {
      return this.userRole === ROLE.PARENT
    },
    isStudent() {
      return this.userRole === ROLE.STUDENT
    },
  },
  methods: {
    async getTimeTableConfig() {
      const { DATA, RESULT } = await this.$api.timetable.GET_TIME_TABLE_CONFIG()

      if (RESULT === 'SUCCESS') {
        this.$store.commit('setLessonStartTimes', this.$utils.common.getLessonStartTimes(DATA))
        this.$store.commit('setLessonAfternoonStartTimes', this.$utils.common.getAfternoonStartTimes(DATA))
        this.$store.commit('setLessonFormat', this.$utils.common.getLessonFormat(DATA))
      }
    },
    getImage(contact) {
      if (contact.IMG_URL) {
        return `background-image: url(${contact.IMG_URL})`
      }

      return `background-image: url('/img/default_${ROLE_NAME[contact.USER_TYPE]}.jpg')`
    },
    async joinGame() {
      if (this.isTeacher || this.isStopEvent) {
        this.showGame = false
        return
      }

      this.loading = true

      const { RESULT, DATA } = await this.$api.auth.GET_EVENT_TOKEN()

      if (RESULT !== 'SUCCESS' || !DATA || !DATA.JWT) {
        console.error('GET_EVENT_TOKEN fail')
        return
      }

      sessionStorage.setItem(JWT_TOKEN_MINIGAME, DATA.JWT)

      const data = await this.$api.miniGame.JOIN_EVENT()

      if (data) {
        this.$router.push({ name: 'minigame-game' })

        this.loading = false
        return
      }

      console.error('JOIN_EVENT fail!')
    },
  },
  async fetch() {
    if (!this.isParent) this.getTimeTableConfig()

    const [alarmResponse, contactResponse] = await Promise.all([
      this.$api.alarm.GET_ALARM_LIST({
        SEARCH_UNIT: 3,
        SEARCH_PAGE: 0,
      }),
      this.$api.contact.GET_FAVORITE_LIST(),
    ])

    this.alarmList = alarmResponse.DATA.ITEMS
    this.contactList = contactResponse.DATA
  },
}
</script>

<style scoped>
.slide-container {
  position: relative;
}

.img-banner {
  object-fit: contain;
  height: 100vh;
  width: 100vw;
}

.img-banner--header {
  position: absolute;
  top: 0;
  right: 0;
}

.img-banner--footer {
  position: absolute;
  bottom: 0;
  left: 0;
}

.btn-game {
  position: absolute;
  bottom: 20%;
  left: 20%;
  width: 60%;
}

.icoApp-popClose {
  top: 2.14em;
  font-size: 18px;
}

.home-game {
  margin-bottom: 0.36em;
}

.home-game--img {
  border-radius: 0.21em;
}

.banner-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
