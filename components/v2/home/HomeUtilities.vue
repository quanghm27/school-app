<template>
  <section class="mb-6 p-0">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[22px] font-bold">Tiện ích</h3>
    </div>
    <div class="grid grid-cols-4 gap-4 pr-4">
      <template v-for="utility in value">
        <!--        ybm-->
        <n-link
          v-if="utility.key === 'ybm'"
          :key="utility.key"
          to="#"
          @click.native="redirect"
          class="flex flex-col items-center justify-start"
        >
          <template v-if="utility.img">
            <img :src="require(`~/assets/img/${utility.icon}.png`)" :alt="utility.icon" class="w-14 h-14" />
          </template>
          <n-icon v-else :icon="utility.icon" class="w-14 h-14"></n-icon>
          <p class="text-center text-gray-v2-secondary text-[12px] mt-2">{{ utility.title }}</p>
        </n-link>

        <div
          :key="utility.key"
          v-else-if="!utility.path"
          @click="developing(utility.key)"
          class="flex flex-col items-center justify-start"
        >
          <template v-if="utility.img">
            <img :src="require(`~/assets/img/${utility.icon}.png`)" :alt="utility.icon" class="w-14 h-14" />
          </template>
          <n-icon v-else :icon="utility.icon" class="w-14 h-14"></n-icon>
          <p class="text-center text-gray-v2-secondary text-[12px] mt-2">{{ utility.title }}</p>
        </div>

        <n-link v-else :key="utility.key" :to="{ path: utility.path }" class="flex flex-col items-center justify-start">
          <template v-if="utility.img">
            <img :src="require(`~/assets/img/${utility.icon}.png`)" :alt="utility.icon" class="w-14 h-14" />
          </template>
          <n-icon v-else :icon="utility.icon" class="w-14 h-14"></n-icon>
          <p class="text-center text-gray-v2-secondary text-[12px] mt-2">{{ utility.title }}</p>
        </n-link>
      </template>
      <v2-rating v-model="isDevelop" :name.sync="rateName" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeUtilities',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isDevelop: false,
      rating: 0,
      rateName: '',
    }
  },
  methods: {
    async redirect() {
      const { DATA, RESULT } = await this.$api.auth.GET_YBM_TOKEN()

      if (RESULT !== 'SUCCESS') {
        console.error('GET_YBM_TOKEN FAIL!')
        return
      }

      window.location.href = `${this.$config.ybmSite}?jwt=${DATA.JWT}`
    },
    developing(name) {
      this.rateName = name
      this.isDevelop = true
    },
  },
}
</script>

<style scoped></style>
