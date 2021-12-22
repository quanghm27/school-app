<template>
  <v2-template>
    <v2-header slot="header" title="Sổ điểm" :show-back-button="false" />
    <template slot="content">
      <div class="pr-4 pt-4">
        <div class="flex items-center">
          <img
            :src="require(`~/assets/img/avatar-${$store.get('userRole')}.png`)"
            alt="avatar"
            class="w-16 h-16 mr-4"
          />
          <div>
            <div class="leading-6 text-[16px]">{{ $t('Quý thầy cô') }}</div>
            <div class="leading-6 text-[16px] font-bold line-clamp-1">{{ userInfo.FULL_NAME }}</div>
          </div>
        </div>
        <div class="text-[16px] font-medium text-gray-v2-secondary mt-6 mb-4">
          {{ $t('Vui lòng chọn thông tin để xem điểm') }}
        </div>
        <ScoreFilter
          :show-year="true"
          :show-whole-year-options="true"
          :default-year="+$route.query.year"
          :default-grade="+$route.query.grade"
          :default-term="+$route.query.term"
          :default-subject="+$route.query.subject"
          :default-clazz="+$route.query.clazz"
        >
          <template #action="{filters}">
            <div class="p-5 mt-3">
              <button class="bg-primary rounded-md text-white w-full p-4 text-[20px] font-bold" @click="next(filters)">
                Tiếp theo
              </button>
            </div>
          </template>
        </ScoreFilter>
      </div>
    </template>
  </v2-template>
</template>

<script>
import { mapState } from 'vuex'
import ScoreFilter from '@/components/v2/scoreboard/ScoreFilter'

export default {
  name: 'ScoreboardFilter',
  components: { ScoreFilter },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    next({ year, term, grade, subject, clazz }) {
      if (!term || !grade || !subject || !clazz) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      this.$router.push({
        name: 'v2-scoreboard-teacher-score',
        query: {
          year,
          term,
          grade,
          clazz,
          subject: subject.SUB_ID,
          specialSubject: subject.SPECIAL_SUBJECT,
        },
      })
    },
  },
}
</script>
