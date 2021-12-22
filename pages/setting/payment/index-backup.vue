<template>
  <ms-template :page-title="$t('menu_payment_means_management')">
    <ms-back :to="{ name: 'setting' }" slot="headerLeft" />

    <template slot="content">
      <ms-spinner align="center" v-if="$fetchState.pending" />
      <section class="addCard" v-else-if="$lodash.isEmpty(cardInfo)">
        <div class="myCard">
          <div class="myCardArea">
            <div class="card">
              <div class="u-middle">
                <p class="card-txt">{{ $t('text_register_card_no') }}</p>
                <n-link :to="{ name: 'setting-payment-card-add' }" class="icoApp-plus"></n-link>
              </div>
            </div>
          </div>
        </div>
        <div class="main-action">
          <n-link :to="{ name: 'setting-payment-card-add' }" class="btn-default-S">{{
            $t('btn_card_register')
          }}</n-link>
        </div>
        <!--<ul class="u-sublist">-->
        <!--<li><p class="u-sublist-txt">Only prepaid cards issued by MSB can be registered.</p></li>-->
        <!--<li><p class="u-sublist-txt">Only one card can be registered.</p></li>-->
        <!--<li><p class="u-sublist-txt">If you want to change your card, please delete the existing card and lock the new card with your back.</p></li>-->
        <!--</ul>-->
        <p class="u-sublist-txt" v-html="$utils.common.nl2br($t('text_guide_register_card'))"></p>
      </section>
      <section class="addCard" v-else>
        <div class="myCard">
          <div class="myCardArea">
            <div class="card is-active">
              <img src="/../../img/card.png" class="card-logo" />
            </div>
          </div>
        </div>
        <!--<ul class="u-sublist">-->
        <!--<li><p class="u-sublist-txt">Only prepaid cards issued by MSB can be registered.</p></li>-->
        <!--<li><p class="u-sublist-txt">Only one card can be registered.</p></li>-->
        <!--<li><p class="u-sublist-txt">If you want to change your card, please delete the existing card and lock the new card with your back.</p></li>-->
        <!--</ul>-->
        <p class="u-sublist-txt" v-html="$utils.common.nl2br($t('text_guide_register_card'))"></p>
      </section>
    </template>
  </ms-template>
</template>

<script>
export default {
  data() {
    return {
      cardInfo: null,
      changeSuccess: false,
    }
  },
  computed: {
    notifyVisible() {
      return this.$store.state.popupInfo.visible
    },
  },
  watch: {
    notifyVisible(val) {
      if (!val && this.changeSuccess) {
        this.$router.push({ name: 'setting' })
      }
    },
  },
  async fetch() {
    const { DATA } = await this.$api.user.GET_CARD_INFO()
    if (DATA) {
      this.cardInfo = DATA
    }
  },
  methods: {
    async onSubmit() {
      if (!this.dataForm.NICKNAME) {
        this.$notify.error('pop_error_not_fill_required_item')
        return
      }
      const { RESULT } = await this.$api.setting.CHANGE_NICKNAME(this.dataForm)
      if (RESULT === 'SUCCESS') {
        this.changeSuccess = true
        this.$notify.show('pop_notify_complete_save')
      }
    },
  },
}
</script>
