<template>
  <v2-template :show-bottom-nav="false">
    <v2-header slot="header" title="Thông báo">
      <n-icon slot="left" icon="chevron-left" @click="$router.push({ path: '/' })"></n-icon>
      <template slot="right">
        <n-icon v-if="!isDelete" icon="trash" class="w-5 h-5" @click="$emit('update:is-delete', true)"></n-icon>
        <n-icon
          v-if="$store.get('userRole') === $const.ROLE.TEACHER"
          icon="send"
          class="w-5 h-5 ml-4"
          @click="$router.push({ name: 'announcement-teacher-new' })"
        ></n-icon>
      </template>
    </v2-header>
    <template slot="content">
      <div class="overflow-x-auto flex scrollbar">
        <ul class="announce-tabs" ref="announceTab">
          <template v-for="(tab, index) in tabs">
            <li
              :key="tab.key"
              ref="tab-item"
              :class="[
                'announce-tab',
                { hidden: role === $const.ROLE.TEACHER && tab.key === 'payment' },
                { hidden: role !== $const.ROLE.TEACHER && tab.key === 'sent' },
                { active: tab.key === router },
              ]"
              :style="
                `background-color: ${
                  role === $const.ROLE.PARENT
                    ? 'rgba(38, 128, 66, 0.1)'
                    : role === $const.ROLE.STUDENT
                    ? 'rgba(47, 39, 133, 0.1)'
                    : 'rgba(215, 33, 33, 0.1)'
                }`
              "
              @click="selectTab($event, tab, index)"
            >
              {{ tab.name }}
            </li>
          </template>
        </ul>
      </div>
      <div class="pr-4 pt-4" v-if="isLoading">
        <skeleton-announce-card />
      </div>
      <template v-else>
        <v2-announcement-empty v-if="announceList.length === 0" />
        <div v-else class="pr-4 pt-4">
          <slot name="headerContent" />
          <div v-if="isDelete" class="mb-4 font-medium text-red-teacher" @click="onSelectedAll">
            {{ selectedList.length === announceList.length ? 'Hủy tất cả' : 'Chọn tất cả' }}
          </div>
          <announcement-card
            v-for="announce in announceList"
            :key="announce.ID"
            :item="announce"
            :is-selected="selectedList.includes(announce.ID)"
            :is-delete.sync="isDelete"
            @selected-item="onSelectedItem(announce.ID)"
          />
          <div class="my-20 text-gray-4 text-center flex justify-center">
            <p class="w-1/2">
              {{ `Chỉ hiển thị thông báo trong vòng ${router === 'common' ? '30 ngày' : '1 năm'} gần đây` }}
            </p>
          </div>
        </div>
      </template>

      <div class="announce-noti" v-if="isDelete">
        <div v-if="selectedList.length !== 0" class="text-red-teacher" @click="$emit('remove')">
          {{ selectedList.length === announceList.length ? 'Xóa tất cả' : 'Xóa mục đã chọn' }}
        </div>
        <div class="flex flex-1 justify-end" @click="onCancel">Hủy</div>
      </div>
    </template>
  </v2-template>
</template>

<script>
import V2AnnouncementEmpty from '../v2/announcement/AnnouncementEmpty'
import SkeletonAnnounceCard from '../skeleton/SkeletonAnnounceCard'
import V2Template from './V2Template'
import AnnouncementCard from '@/components/v2/announcement/AnnouncementCard'

export default {
  name: 'V2AnnouncementLayout',
  props: {
    announceList: {
      type: Array,
      default: () => [],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    selectedList: {
      type: Array,
      default: () => [],
    },
  },
  provide() {
    return {
      router: this.router,
    }
  },
  data() {
    return {
      tabs: [
        { key: '', name: 'Nhà trường', routeName: 'v2-announcement' },
        { key: 'teacher', name: 'Giáo viên', routeName: 'v2-announcement-teacher' },
        { key: 'sent', name: 'Đã gửi', routeName: 'v2-announcement-sent' },
        { key: 'common', name: 'Chung', routeName: 'v2-announcement-common' },
        { key: 'payment', name: 'Khoản thu', routeName: 'v2-announcement-payment' },
      ],
      currentTab: '',
      tabIndex: 0,
    }
  },
  components: { SkeletonAnnounceCard, V2AnnouncementEmpty, V2Template, AnnouncementCard },
  computed: {
    router() {
      if (this.$route.name.split('v2-announcement-')[0] === 'v2-announcement') {
        return ''
      }
      return this.$route.name.split('v2-announcement-')[1]
    },
    userInfo() {
      return this.$store.get('userInfo')
    },
    role() {
      return this.$store.get('userRole')
    },
  },
  mounted() {
    console.log(this.$refs['tab-item'])
    this.$refs.announceTab.scrollLeft += this.$refs['tab-item'][4].offsetLeft
  },
  methods: {
    async selectTab(event, tab, index) {
      await this.$router.push({ name: tab.routeName })
      if (this.tabIndex === index) return
      let elem = event.target
      console.log('element', elem)
      while (!elem.className.includes('announce-tab')) {
        elem = elem.offsetParent
      }
      this.$refs.announceTab.scrollTo({
        top: 0,
        left: elem.offsetLeft,
        behavior: 'smooth',
      })
      this.tabIndex = index
    },
    onCancel() {
      if (this.$lodash.isEmpty(this.selectedList)) {
        this.$emit('update:is-delete', false)
        return
      }
      this.$emit('update:selected-list', [])
    },
    onSelectedItem(ID) {
      const findDup = this.selectedList.find(id => id === ID)
      if (findDup) {
        this.$emit('update:selected-list', [...this.selectedList.filter(id => id !== findDup)])
        return
      }
      this.$emit('update:selected-list', [...this.selectedList, ID])
    },
    onSelectedAll() {
      if (this.announceList.length === this.selectedList.length) {
        this.$emit('update:selected-list', [])
        return
      }
      this.$emit(
        'update:selected-list',
        this.announceList.map(item => item.ID),
      )
    },
  },
}
</script>

<style scoped>
.announce-tabs {
  @apply flex items-center w-max;
}
.announce-tab {
  @apply px-4 py-2 rounded text-[15px] mr-2 font-medium bg-gray-5 border border-solid border-[#AEAEB2] text-[#AEAEB2] w-[124px] flex-shrink-0 text-center;
}
.announce-tab.active {
  @apply font-semibold bg-primary text-primary border-primary;
}
.announce-noti {
  @apply w-full bg-white bg-opacity-90 absolute bottom-0 left-0 p-4 flex items-center justify-between z-20;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0.5;
}
</style>
