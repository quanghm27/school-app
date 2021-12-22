<template>
  <ms-popup :show="value" :title="$t('text_announcement_search')" :close-icon="true" @close="closePopup" type="custom">
    <div class="search">
      <form class="u-form" @submit.prevent="search">
        <!-- Parent: Children Selected -->
        <div class="u-form-item" v-if="userRole === ROLE.PARENT">
          <div class="u-input-check">
            <div class="u-check" v-for="child in childList" :key="child.CHILD_ID">
              <input v-model="child.SELECTED" type="checkbox" :id="child.CHILD_ID" class="u-check-input" />
              <label :for="child.CHILD_ID" class="icoApp-check"></label>
              <label :for="child.CHILD_ID" class="u-check-txt">{{ child.CHILD_NAME }}</label>
            </div>
          </div>
        </div>

        <!-- Teacher: Receiver, Sent announcement -->
        <div class="u-form-item" v-if="userRole === ROLE.TEACHER">
          <div class="u-input-radio">
            <div class="u-radio">
              <input
                v-model="formData.isReceive"
                type="radio"
                id="radio1"
                class="u-radio-input"
                name="search"
                :value="true"
              />
              <label for="radio1" class="icoApp-radio"></label>
              <label for="radio1" class="u-radio-txt">{{ $t('btn_receive_announcement') }}</label>
            </div>
            <div class="u-radio">
              <input
                v-model="formData.isReceive"
                type="radio"
                id="radio2"
                class="u-radio-input"
                name="search"
                :value="false"
              />
              <label for="radio2" class="icoApp-radio"></label>
              <label for="radio2" class="u-radio-txt">{{ $t('btn_sent_announcement') }}</label>
            </div>
          </div>
        </div>

        <!-- Common: From - To -->
        <div class="u-form-item">
          <div class="u-input-fromto">
            <div class="from">
              <div class="u-fakeInput" data-click="0">
                <label for="inputFrom" class="icoApp-calendar"></label>
                <input type="date" v-model="formData.startDate" class="is-hidden inputDate" id="inputFrom" />
                <p class="u-fakeInput-val" v-if="formData.startDate">
                  {{ formData.startDate | formatDates('DD/MMM/YYYY') }}
                </p>
                <p class="u-fakeInput-val" v-else></p>
              </div>
            </div>
            <i class="fromto">~</i>
            <div class="to">
              <div class="u-fakeInput" data-click="0">
                <label for="inputTo" class="icoApp-calendar"></label>
                <input type="date" v-model="formData.endDate" class="is-hidden inputDate" id="inputTo" />
                <p class="u-fakeInput-val" v-if="formData.endDate">
                  {{ formData.endDate | formatDates('DD/MMM/YYYY') }}
                </p>
                <p class="u-fakeInput-val" v-else></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Common: Announcement Title -->
        <div class="u-form-item">
          <div class="u-input">
            <input v-model="formData.announceTitle" type="text" :placeholder="$t('text_announcement_title')" />
          </div>
        </div>

        <!-- Common: Announcement Sender -->
        <div class="u-form-item">
          <div class="u-input">
            <input v-model="formData.sender" type="text" :placeholder="$t('text_sender')" />
          </div>
        </div>

        <!-- Common: Clear Filter -->
        <div class="search-reset">
          <a @click.prevent="resetSearch" :class="['search-reset-link', { 'is-active': isReset }]">
            <i class="icoApp-reset"></i>
            {{ $t('btn_clear_filter') }}
          </a>
        </div>
        <button type="submit" stype="display: none"></button>
      </form>
    </div>
    <template slot="main-action">
      <a @click.prevent="search" class="btn-default-S">{{ $t('btn_search') }}</a>
    </template>
  </ms-popup>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { ROLE } from '@/constants'

const DEFAULT_DAY = 90

const DEFAULT_FORM_DATA = {
  children: [],
  isReceive: true,
  startDate: moment().subtract(DEFAULT_DAY, 'days'),
  endDate: moment(),
  announceTitle: '',
  sender: '',
}

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ROLE,
      childList: [],
      formData: this.$lodash.cloneDeep(DEFAULT_FORM_DATA),
      isReset: false,
    }
  },
  methods: {
    closePopup() {
      this.$emit('input', false)
    },
    search() {
      this.formData.children = this.childList.filter(el => el.SELECTED)

      this.$emit('search', this.formData)
      this.closePopup()
    },
    resetSearch() {
      this.isReset = true
      this.formData = this.$lodash.cloneDeep(DEFAULT_FORM_DATA)
      setTimeout(() => {
        this.isReset = false
      }, 1000)
    },
  },
  computed: {
    ...mapState(['userRole']),
  },
  async created() {
    if (this.userRole === ROLE.PARENT) {
      const { DATA } = await this.$api.parent.GET_CHILD_LIST()
      this.childList = DATA
    }
  },
}
</script>
