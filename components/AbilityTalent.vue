<template>
  <section class="report">
    <div class="reportBook">
      <div class="reportBookTop">
        <p class="report-subj">
          {{ $t('text_ability') }}
          <!-- <i class="icoApp-up" v-if="observation.IS_CLOSE_TASK && observation.UPDATED_APTITUDE_AT - lastSeen > 0"></i> -->
          <span class="icon-up" v-if="observation.IS_CLOSE_TASK && observation.UPDATED_APTITUDE_AT - lastSeen > 0">
            Updated
          </span>
        </p>
        <a
          @click.prevent="
            observation.IS_CLOSE_TASK && observation.COMMENT_APTITUDE && openComment(observation.COMMENT_APTITUDE)
          "
          :class="[
            'report-comment',
            `is-${observation.IS_CLOSE_TASK && observation.COMMENT_APTITUDE ? 'active' : 'disable'}`,
          ]"
        >
          <i class="icoApp-com"></i>
          {{ $t('btn_check_comment') }}
        </a>
      </div>
      <div class="row">
        <div class="col-1-2" v-for="ab in ability" :key="ab.id">
          <div class="u-box">
            <a href="#" class="u-box-link">
              <ul class="u-tbr">
                <li>
                  <p class="report-subj">{{ ab.title }}</p>
                </li>
                <li v-if="ab.value">
                  <p class="report-point">{{ $option.get('EVALUATE', ab.value).slice(0, 1) }}</p>
                </li>
                <li v-if="!ab.value">
                  <i class="icoApp-alert-S"></i>
                  <p class="report-comment">
                    {{ $t('text_score_no') }}
                  </p>
                </li>
              </ul>
            </a>
            <i :class="ab.icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="reportBook">
      <div class="reportBookTop">
        <p class="report-subj">
          {{ $t('text_quality') }}
          <!-- <i class="icoApp-up" v-if="observation.IS_CLOSE_TASK && observation.UPDATED_ATTITUDE_AT - lastSeen > 0"></i> -->
          <span class="icon-up" v-if="observation.IS_CLOSE_TASK && observation.UPDATED_ATTITUDE_AT - lastSeen > 0">
            Updated
          </span>
        </p>
        <a
          @click.prevent="
            observation.IS_CLOSE_TASK && observation.COMMENT_ATTITUDE && openComment(observation.COMMENT_ATTITUDE)
          "
          :class="[
            'report-comment',
            `is-${observation.IS_CLOSE_TASK && observation.COMMENT_ATTITUDE ? 'active' : 'disable'}`,
          ]"
        >
          <i class="icoApp-com"></i>
          {{ $t('btn_check_comment') }}
        </a>
      </div>
      <div class="row">
        <div class="col-1-2" v-for="qua in quality" :key="qua.id">
          <div class="u-box">
            <a href="#" class="u-box-link">
              <ul class="u-tbr">
                <li>
                  <p class="report-subj">{{ qua.title }}</p>
                </li>
                <li v-if="qua.value">
                  <p class="report-point">{{ $option.get('EVALUATE', qua.value).slice(0, 1) }}</p>
                </li>
                <li v-if="!qua.value">
                  <i class="icoApp-alert-S"></i>
                  <p class="report-comment">
                    {{ $t('text_score_no') }}
                  </p>
                </li>
              </ul>
            </a>
            <i :class="qua.icon"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AbilityTalent',
  props: {
    observation: {
      type: Object,
      default: Object,
      required: true,
    },
    lastSeen: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ability() {
      return [
        {
          id: 'SELF_MANAGE',
          title: this.$t('text_selfmanagement'),
          value: this.observation.IS_CLOSE_TASK && this.observation.SELF_MANAGE,
          icon: 'icoRep-time',
        },
        {
          id: 'COOPERATE',
          title: this.$t('text_ability_2'),
          value: this.observation.IS_CLOSE_TASK && this.observation.COOPERATE,
          icon: 'icoRep-commu',
        },
        {
          id: 'PROBLEM_SOLVING',
          title: this.$t('text_ability_3'),
          value: this.observation.IS_CLOSE_TASK && this.observation.PROBLEM_SOLVING,
          icon: 'icoRep-tutor',
        },
      ]
    },
    quality() {
      return [
        {
          id: 'STUDY_HARD',
          title: this.$t('text_talent_1'),
          value: this.observation.IS_CLOSE_TASK && this.observation.STUDY_HARD,
          icon: 'icoRep-study',
        },
        {
          id: 'RESPONSIBILITY',
          title: this.$t('text_talent_2'),
          value: this.observation.IS_CLOSE_TASK && this.observation.RESPONSIBILITY,
          icon: 'icoRep-confid',
        },
        {
          id: 'HONEST',
          title: this.$t('text_talent_3'),
          value: this.observation.IS_CLOSE_TASK && this.observation.HONEST,
          icon: 'icoRep-honest',
        },
        {
          id: 'UNITE',
          title: this.$t('text_talent_4'),
          value: this.observation.IS_CLOSE_TASK && this.observation.UNITE,
          icon: 'icoRep-love',
        },
      ]
    },
  },
  methods: {
    openComment(cmt) {
      this.$emit('is-show-comment', { open: true, cmt })
    },
  },
}
</script>
