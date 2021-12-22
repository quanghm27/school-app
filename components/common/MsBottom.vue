<template>
  <ul class="footer">
    <li class="flex flex-col items-center" v-for="nav in listNavigations" :key="nav.key">
      <!--      <div @click="showDrawer" class="flex flex-col items-center" v-if="!nav.path">-->
      <!--        <n-icon v-if="path === nav.path" :icon="`${nav.icon}-${role}`" class="!w-6 !h-6 mb-2"></n-icon>-->
      <!--        <n-icon v-else :icon="`${nav.icon}`" class="!w-6 !h-6 mb-2"></n-icon>-->
      <!--        <p class="text-gray-AEAEB2 text-[12px]" :class="[{ '!text-primary': path === nav.path }]">-->
      <!--          {{ nav.name }}-->
      <!--        </p>-->
      <!--      </div>-->
      <div
        v-if="!nav.path || (nav.key === 'attendance' && role !== $const.ROLE.TEACHER)"
        class="flex flex-col items-center"
        @click="showPopupDevelop(nav.key)"
      >
        <n-icon :icon="`${nav.icon}`" class="!w-6 !h-6 mb-2"></n-icon>
        <p class="text-gray-AEAEB2 text-[12px]" :class="[{ '!text-primary': path === nav.path }]">
          {{ nav.name }}
        </p>
      </div>
      <n-link v-else :to="nav.path" class="flex flex-col items-center">
        <n-icon v-if="path === nav.path" :icon="`${nav.icon}-${role}`" class="!w-6 !h-6 mb-2"></n-icon>
        <n-icon v-else :icon="`${nav.icon}`" class="!w-6 !h-6 mb-2"></n-icon>
        <p class="text-gray-AEAEB2 text-[12px]" :class="[{ '!text-primary': path === nav.path }]">
          {{ nav.name }}
        </p>
      </n-link>
    </li>
    <v2-rating v-model="isDevelop" :name.sync="rateName" />
  </ul>
</template>

<script>
import { menuMixin } from '~/mixins/menu'
export default {
  name: 'MSBottom',
  mixins: [menuMixin],
  computed: {
    role() {
      return this.$store.get('userRole')
    },
    path() {
      return this.$route.path
    },
  },
  data() {
    return {
      isDevelop: false,
      rateName: '',
    }
  },
  methods: {
    showDrawer() {
      this.$utils.app.dispatch({ type: 'SET_BAR_STYLE', payload: 'light-content' })
      document.body.classList.toggle('is-showMenu')
    },
    showPopupDevelop(name) {
      this.rateName = name
      this.isDevelop = true
    },
  },
}
</script>

<style scoped>
.footer {
  @apply h-20 bg-white py-2 px-3 flex items-center justify-around;
  box-shadow: 0 4px 12px 2.29042px rgba(0, 0, 0, 0.04);
}
</style>
