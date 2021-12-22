<template>
  <ms-template :page-title="$t('menu_children_management')">
    <section class="addChild">
      <h4 class="child-title">{{ $t('text_registered_childred') }}</h4>
      <ms-spinner v-if="$fetchState.pending"></ms-spinner>
      <div class="childList" v-else>
        <div class="u-box" v-for="child in childList" :key="child.CHILD_ID">
          <div class="childList-item">
            <ul class="u-tb">
              <li class="child-img">
                <div
                  class="u-pic"
                  :style="`background-image: url(${child.IMG_URL || '/img/default_student.jpg'})`"
                  title
                >
                  <i :class="`icoApp-${child.SEX === GENDER.MALE ? 'mc' : 'fc'}`" />
                </div>
              </li>
              <li>
                <h3 class="person-name">{{ child.CHILD_NAME }}</h3>
                <p class="person-sysID">{{ child.CHILD_ID }}</p>
                <p class="person-school">{{ child.CLASS_NAME }} {{ child.SCHOOL_NAME }}</p>
              </li>
              <li class="child-status">
                <a
                  v-if="childList.length > MIN_CHILD"
                  href="#"
                  class="icoApp-close"
                  @click.prevent="deleteChild(child.CHILD_ID)"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="addChild-more" v-if="childList.length < MAX_CHILD">
          <a href="#" class="icoApp-plus" @click.prevent="addChild"></a>
          <a href="#" class="u-link" @click.prevent="addChild">{{ $t('menu_children_add') }}</a>
        </div>
      </div>
    </section>
  </ms-template>
</template>

<script>
import { GENDER } from '@/constants'

const MAX_CHILD = 10
const MIN_CHILD = 1

export default {
  middleware({ store, redirect }) {},
  data() {
    return {
      MAX_CHILD,
      MIN_CHILD,
      GENDER,
      childList: [],
      deleteSuccess: true,
    }
  },
  watch: {
    deleteSuccess(value) {
      if (!value) {
        this.$notify.show(
          {
            title: 'Lỗi',
            message: 'Không được xóa!',
          },
          'confirm',
        )
        this.deleteSuccess = true
      }
    },
  },
  methods: {
    deleteChild(CHILD_ID) {
      this.$notify.show(
        {
          title: this.$t('pop_confirm_delete_title'),
          message: this.$t('pop_confirm_delete_msg'),
          cbConfirm: async () => {
            const { RESULT } = await this.$api.parent.DELETE_CHILD({ CHILD_ID })
            if (RESULT === 'FAIL') {
              setTimeout(() => {
                this.deleteSuccess = false
              }, 500)
              return
            }
            this.deleteSuccess = true
            await this.$fetch()
          },
        },
        'confirm',
      )
    },
    addChild() {
      this.$router.push({ name: 'setting-manage-children-add' })
    },
  },
  async fetch() {
    const { DATA } = await this.$api.parent.GET_CHILD_LIST()
    this.childList = DATA || []
  },
}
</script>
