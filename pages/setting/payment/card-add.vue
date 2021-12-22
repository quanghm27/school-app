<template>
  <ms-template :page-title="$t('menu_add_card')" default-header-left="" default-header-right="close">
    <div class="main-container">
      <section class="addCard">
        <div class="myCard">
          <div class="myCardArea">
            <div class="card is-active">
              <img src="/../../img/card.png" class="card-logo" />
            </div>
          </div>
        </div>
        <form class="u-form" v-if="activeScreen === 'card_add'" @submit.prevent="sendOTP">
          <div class="u-form-item">
            <label class="u-form-txt">{{ $t('text_card_number') }}<sup>*</sup></label>
            <div class="u-input-card">
              <input type="text" maxlength="4" v-model="cardInfo.oneSegment" />
              <input type="text" maxlength="4" v-model="cardInfo.twoSegment" />
              <input type="text" maxlength="4" v-model="cardInfo.threeSegment" />
              <input type="text" maxlength="4" v-model="cardInfo.fourSegment" />
            </div>
          </div>
          <div class="u-form-item">
            <label class="u-form-txt">{{ $t('text_phone') }}<sup>*</sup></label>
            <div class="u-input">
              <input type="tel" v-model="PHONE" />
            </div>
          </div>
          <div class="u-form-item">
            <div class="u-input-check">
              <div class="u-check">
                <input type="checkbox" id="check1" class="u-check-input" v-model="termOfUse" />
                <label for="check1" class="icoApp-check"></label>
                <label for="check1" class="u-check-txt"> I agree to the</label>
                <a href="#" class="u-link">terms and conditions.</a>
              </div>
              <div class="u-check">
                <input type="checkbox" id="check2" class="u-check-input" v-model="privacyPolicy" />
                <label for="check2" class="icoApp-check"></label>
                <label for="check2" class="u-check-txt">I agree with the</label>
                <a href="#" class="u-link">privacy policy.</a>
              </div>
            </div>
          </div>
          <div class="main-action">
            <a href="#" class="btn-default-S" @click.prevent="sendOTP">{{ $t('btn_register') }}</a>
          </div>
        </form>
        <div class="cardOtp" v-if="activeScreen === 'card_add_otp'">
          <h2 class="otp-title">{{ $t('text_enter_otp') }}</h2>
          <form class="u-form" @submit.prevent="registerCard">
            <div class="u-form-item">
              <label class="u-form-txt">{{ $t('text_otp') }}<sup>*</sup></label>
              <div class="u-input is-otpCheck">
                <p class="otpCheck">{{ $t('text_remain_time') }} {{ countdownOTP }}</p>
                <input type="number" v-model="VERIFY_CODE" />
              </div>
              <p class="otp-note">
                {{ $t('text_sms_received_no') }}
                <a href="#" class="otp-link" @click.prevent="sendOTP('resend')">{{ $t('btn_resending_otp') }}</a>
              </p>
            </div>
            <div class="main-action">
              <a href="#" class="btn-default-S" @click="registerCard">{{ $t('btn_register') }}</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  </ms-template>
</template>

<script>
export default {
  data() {
    return {
      cardInfo: {
        oneSegment: '1234',
        twoSegment: '4567',
        threeSegment: '7890',
        fourSegment: '9988',
      },
      PHONE: '09892020239',
      VERIFY_CODE: null,
      termOfUse: false,
      privacyPolicy: false,
      countdownOTP: '02:00',
      activeScreen: 'card_add',
      myTimer: null,
    }
  },
  computed: {
    cardNumber() {
      return Object.keys(this.cardInfo)
        .map(key => this.cardInfo[key])
        .join('')
    },
  },
  methods: {
    async sendOTP(type = 'send') {
      if (!this.validateForm()) {
        return
      }
      const { RESULT } = await this.$api.user.REQUEST_OTP_ADD_CARD({
        CARD_NO: this.cardNumber,
        PHONE: this.PHONE,
      })
      if (RESULT === 'SUCCESS') {
        if (type === 'resend') {
          this.$notify.show('pop_notify_complete_resend_otp')
        }
        this.startCountdown(10)
        this.activeScreen = 'card_add_otp'
      }
    },
    validateForm() {
      if (
        !this.cardInfo.oneSegment ||
        !this.cardInfo.twoSegment ||
        !this.cardInfo.threeSegment ||
        !this.cardInfo.fourSegment ||
        !this.PHONE ||
        !this.termOfUse ||
        !this.privacyPolicy
      ) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      return true
    },
    startCountdown(duration) {
      const self = this
      let timer = duration
      let minutes
      let seconds
      clearInterval(self.myTimer)
      self.myTimer = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)
        if (!minutes && !seconds) {
          clearInterval(self.myTimer)
        }

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        self.countdownOTP = minutes + ':' + seconds

        if (--timer < 0) {
          timer = duration
        }
      }, 1000)
    },
    async registerCard() {
      if (!this.VERIFY_CODE) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      const { RESULT } = await this.$api.user.REQUEST_OTP_ADD_CARD({
        CARD_NO: this.cardNumber,
        PHONE: this.PHONE,
        VERIFY_CODE: this.VERIFY_CODE,
      })
      if (RESULT === 'SUCCESS') {
        await this.$router.push({ name: 'setting-payment-card-add-complete' })
      }
    },
  },
}
</script>
