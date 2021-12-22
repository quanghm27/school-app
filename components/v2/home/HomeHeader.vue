<template>
  <fragment>
    <v2-header>
      <div slot="left" class="flex items-center pb-4">
        <img :src="require(`~/assets/img/avatar-${$store.get('userRole')}.png`)" alt="avatar" class="w-16 h-16 mr-4" />
        <div>
          <div class="leading-6 text-[16px]">{{ $t(`text_${$store.get('userRole')}`) }}</div>
          <div class="leading-6 text-[16px] font-bold line-clamp-1">{{ userInfo.FULL_NAME }}</div>
          <div class="leading-6 text-[16px]" v-if="$store.get('userRole') !== $const.ROLE.STUDENT">
            {{
              this.$utils.validate.isPhone(userInfo.PHONE)
                ? $utils.common.formatPhoneNumber(userInfo.PHONE)
                : this.$utils.validate.isPhone(userInfo.LOGIN_ID)
                ? $utils.common.formatPhoneNumber(userInfo.LOGIN_ID)
                : null
            }}
          </div>
          <div class="leading-6 text-[16px]" v-else>Lớp {{ userInfo.CLASS_NAME }}</div>
        </div>
      </div>
      <div slot="right" class="relative">
        <n-link :to="{ name: 'v2-announcement' }">
          <n-icon icon="alarm" class="w-6 h-7"></n-icon>
          <p
            v-if="alarmCount"
            class="text-primary border border-solid text-[10px] h-full flex items-center justify-center w-3.5 h-3.5 bg-white top-0 -right-1.5 rounded-full absolute"
          >
            {{ alarmCount }}
          </p>
        </n-link>
      </div>
    </v2-header>
  </fragment>
</template>

<script>
import V2Header from '../../common/V2Header'
export default {
  name: 'HomeHeader',
  components: { V2Header },
  data() {
    return {
      alarmCount: 0,
    }
  },
  computed: {
    userInfo() {
      return this.$store.get('userInfo')
    },
  },

  async fetch() {
    const { DATA } = await this.$api.alarm.GET_ALARM_UNREAD_TOTAL()
    this.alarmCount = DATA
  },
}
</script>

<style scoped></style>
