<template>
  <ms-popup-full
    v-model="showPopup"
    :title="$t('Thêm người nhận')"
    :close-icon="true"
    @close="closePopup"
    top-padding="50px"
    class-name="!p-0 !bg-transparent"
    :header-rounded="true"
  >
    <template slot="header-bottom">
      <ms-tabs v-model="currentTab" tab-name="announce">
        <ms-tab v-for="tab in tabs" :key="tab" :name="tab">
          <portal to="content-tab">
            <div class="h-[20px] bg-gray-F3F3F3"></div>
            <div class="popup-container">
              <ul class="sub-tabs">
                <li
                  v-for="(subTab, index) of subTabs"
                  :key="subTab"
                  class="sub-tab middle first:!border-0 last:!border-0"
                  :class="[{ active: activeSubTab === index }]"
                  @click="activeSubTab = index"
                >
                  {{ subTab }}
                </li>
              </ul>
              <div class="pop-input-container">
                <n-icon class="tag-clear" icon="search" class-name="pop-icon-search" />
                <input v-model="searchStr" :placeholder="$i18n.t('Tìm kiếm')" class="pop-input-search" />
              </div>
              <template v-if="!$fetchState.pending">
                <tab-group
                  v-if="currentTab === 0"
                  :selected.sync="selectSent"
                  :group-student="searchGroupStudent"
                  :group-parent="searchGroupParent"
                  :group-teacher="searchGroupTeacher"
                  :active-sub-tab="activeSubTab"
                />
                <tab-individual
                  v-else
                  :selected.sync="selectSent"
                  :students="searchIndiStudent"
                  :parents="searchIndiParent"
                  :teachers="searchIndiTeacher"
                  :active-sub-tab="activeSubTab"
                />
              </template>
            </div>
            <div class="pop-footer">
              <button class="pop-btn-submit" @click="onSendSelected">{{ $t('Tiếp tục') }}</button>
            </div>
          </portal>
        </ms-tab>
      </ms-tabs>
    </template>
    <portal-target name="content-tab" />
  </ms-popup-full>
</template>

<script>
import Fuse from 'fuse.js'
import MsTab from '../common/MsTab'
import NIcon from '../common/NIcon'
import TabGroup from './TabGroup'
import TabIndividual from './TabIndividual'

export default {
  name: 'SelectReceiverPopup',
  components: { TabIndividual, TabGroup, NIcon, MsTab },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentTab: 0,
      activeSubTab: 0,
      tabs: [this.$t('btn_group'), this.$t('btn_individual')],
      subTabs: [this.$t('Học sinh'), this.$t('Phụ huynh'), this.$t('Giáo viên')],
      groupStudent: [],
      groupParent: [],
      groupTeacher: [],
      searchGroupStudent: [],
      searchGroupParent: [],
      searchGroupTeacher: [],
      indiStudent: [],
      indiParent: [],
      indiTeacher: [],
      searchIndiStudent: [],
      searchIndiParent: [],
      searchIndiTeacher: [],
      students: [],
      selectSent: this.selected,
      searchStr: '',
      search: null,
    }
  },
  watch: {
    searchStr(str) {
      if (this.currentTab === 0) {
        if (this.activeSubTab === 0) {
          const result = this.onSearchData({
            data: this.groupStudent,
            string: str,
            keys: ['GROUP_NAME', 'NUM_STUDENT'],
          })
          const queryResults = str === '' ? this.groupStudent : result.map(i => i.item)
          this.searchGroupStudent = queryResults
        }
        if (this.activeSubTab === 1) {
          const result = this.onSearchData({
            data: this.groupParent,
            string: str,
            keys: ['GROUP_NAME'],
          })
          const queryResults = str === '' ? this.groupParent : result.map(i => i.item)
          this.searchGroupParent = queryResults
        }
        if (this.activeSubTab === 2) {
          const result = this.onSearchData({
            data: this.groupTeacher,
            string: str,
            keys: ['SUBJECT_NAME', 'NUM_TEACHER'],
          })
          const queryResults = str === '' ? this.groupTeacher : result.map(i => i.item)
          this.searchGroupTeacher = queryResults
        }
      } else {
        if (this.activeSubTab === 0) {
          const result = this.onSearchData({
            data: this.indiStudent,
            string: str,
            keys: ['STUDENT_NAME', 'CLASS_NAME', 'BIRTH_DAY'],
          })
          const queryResults = str === '' ? this.indiStudent : result.map(i => i.item)
          this.searchIndiStudent = queryResults
        }
        if (this.activeSubTab === 1) {
          const result = this.onSearchData({
            data: this.indiParent,
            string: str,
            keys: ['STUDENT_NAME', 'CLASS_NAME', 'BIRTH_DAY'],
          })
          const queryResults = str === '' ? this.indiParent : result.map(i => i.item)
          this.searchIndiParent = queryResults
        }
        if (this.activeSubTab === 2) {
          const result = this.onSearchData({
            data: this.indiTeacher,
            string: str,
            keys: ['TEACHER_NAME', 'SUBJECT', 'BIRTH_DAY'],
          })
          const queryResults = str === '' ? this.indiTeacher : result.map(i => i.item)
          this.searchIndiTeacher = queryResults
        }
      }
    },
    selected(newValue) {
      this.selectSent = newValue
    },
    currentTab(tab) {
      this.activeSubTab = 0
      if (tab === 1) {
        this.fetchIndividualStudent()
      }
    },
    activeSubTab(tab) {
      this.searchStr = ''
      if (this.currentTab === 0) {
        if (tab === 0) {
          this.fetchGroupStudent() //tab Học sinh
        } else if (tab === 1) {
          this.fetchGroupParent() //tab Phụ huynh
        } else this.fetchGroupTeacher() //tab Giáo viên
      } else {
        if (tab === 0) {
          this.fetchIndividualStudent() //tab Học sinh
        } else if (tab === 1) {
          this.fetchIndividualParent() //tab Phụ huynh
        } else this.fetchIndividualTeacher() //tab Giáo viên
      }
    },
  },
  fetch() {
    this.fetchGroupStudent()
  },
  computed: {
    showPopup: {
      get() {
        return this.value
      },
      set(showPopup) {
        this.$emit('input', showPopup)
      },
    },
  },
  methods: {
    closePopup() {
      this.$emit('input', false)
    },
    onSendSelected() {
      this.$emit('update:selected', this.selectSent)
      this.$emit('input', false)
    },
    onSearchData({ data, string, keys }) {
      const fuse = new Fuse(data, {
        includeMatches: true,
        includeScore: false,
        threshold: 0.8,
        keys,
      })
      const result = fuse.search(string)
      return result
    },
    async fetchGroupStudent() {
      try {
        const { DATA } = await this.$api.announce.SEARCH_RECEIVER_GROUP_STUDENT({
          GROUP_NAME: '',
          MAIN_TEACHER: '',
        })
        this.groupStudent = DATA.ITEMS.map((item, index) => ({
          ID: JSON.stringify(item.GROUP_ID) + index,
          ...item,
        }))
        this.searchGroupStudent = this.groupStudent
      } catch (e) {
        console.log(e)
      }
    },
    async fetchGroupParent() {
      try {
        const params = {
          GROUP_NAME: '',
          MAIN_TEACHER: '',
        }
        const { DATA } = await this.$api.announce.SEARCH_RECEIVER_GROUP_PARENT(params)
        this.groupParent = DATA.ITEMS.map((item, index) => ({
          ID: JSON.stringify(item.GROUP_ID) + index,
          ...item,
          GROUP_NAME:
            index === 0
              ? `${item.GROUP_NAME} (${item.NUM_STUDENT})`
              : `P/H học sinh ${item.GROUP_NAME} (${item.NUM_STUDENT})`,
        }))
        this.searchGroupParent = this.groupParent
      } catch (e) {
        console.log(e)
      }
    },
    async fetchGroupTeacher() {
      try {
        const params = {
          DEPARTMENT_ID: '',
          DEPARTMENT_NAME: '',
          GROUP_NAME: '',
        }
        const { DATA } = await this.$api.announce.SEARCH_RECEIVER_GROUP_TEACHER(params)
        this.groupTeacher = DATA.ITEMS.map((item, index) => ({
          ID: JSON.stringify(item.GROUP_ID) + index,
          ...item,
        }))
        this.searchGroupTeacher = this.groupTeacher
      } catch (e) {
        console.log(e)
      }
    },
    async fetchIndividualStudent() {
      try {
        const { DATA } = await this.$api.announce.SEARCH_RECEIVER_STUDENT({
          BIRTHDAY: [],
          SEX: [],
          STUDENT_ID: '',
          STUDENT_NAME: '',
        })
        this.indiStudent = DATA.ITEMS.map((item, index) => ({
          ID: JSON.stringify(item.GROUP_ID) + index,
          ...item,
        }))
        this.searchIndiStudent = this.indiStudent
      } catch (e) {
        console.log(e)
      }
    },
    async fetchIndividualParent() {
      try {
        const { DATA } = await this.$api.announce.SEARCH_RECEIVER_PARENT({
          BIRTHDAY: [],
          SEX: [],
          STUDENT_ID: '',
          STUDENT_NAME: '',
        })
        this.indiParent = DATA.ITEMS.map((item, index) => ({
          ID: JSON.stringify(item.GROUP_ID) + index,
          ...item,
        }))
        this.searchIndiParent = this.indiParent
      } catch (e) {
        console.log(e)
      }
    },
    async fetchIndividualTeacher() {
      try {
        const { DATA } = await this.$api.announce.SEARCH_RECEIVER_TEACHER({
          BIRTHDAY: [],
          SEX: [],
          STUDENT_ID: '',
          STUDENT_NAME: '',
        })
        this.indiTeacher = DATA.ITEMS.map((item, index) => ({
          ID: JSON.stringify(item.GROUP_ID) + index,
          ...item,
        }))
        this.searchIndiTeacher = this.indiTeacher
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style>
.popup-container {
  @apply px-4 py-2 relative;
  font-size: 14px;
}
.sub-tabs {
  @apply flex border border-solid border-red-teacher rounded mb-[16px];
}
.sub-tab {
  @apply flex px-2 py-3 items-center justify-center w-full text-orange-EE493D;
}
.sub-tab.middle {
  @apply border-0 border-l border-r border-solid border-red-teacher;
}
.sub-tab.active {
  @apply bg-red-teacher text-white;
}
.pop-input-search {
  @apply bg-transparent w-full;
  font-size: 16px;
}
.pop-icon-search {
  @apply w-[19px] h-[19px] mr-4;
}
.pop-item {
  @apply border-t border-solid border-l-0 border-r-0 border-b-0 border-gray-F3F3F3 items-center flex justify-between;
  height: 60px;
}
.pop-item-title {
  @apply flex items-center relative flex-1;
}
.icon-check {
  @apply w-[24px] h-[24px];
}
.pop-footer {
  @apply absolute bottom-0 left-0 right-0 p-[20px] pt-0 fixed bg-white;
}
.pop-btn-submit {
  height: 50px;
  width: 100%;
  color: #fff;
  border-radius: 100px;
  background-color: #e0402a;
}
.pop-input-container {
  @apply bg-gray-F3F3F3 px-3 py-2 rounded flex items-center mb-4;
}
</style>
