<template>
  <section class="mb-6 p-0">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[22px] font-bold">
        {{ $store.get('userRole') === $const.ROLE.TEACHER ? 'Nhà trường' : 'Nhà trường - Lớp học' }}
      </h3>
    </div>
    <div class="grid grid-cols-4 gap-4 pr-4">
      <template v-for="service in value">
        <div
          :key="service.key"
          v-if="!service.path"
          @click="developing(service.key)"
          class="flex flex-col items-center justify-start"
        >
          <n-icon :icon="service.icon" class="w-14 h-14"></n-icon>
          <p class="text-center text-gray-v2-secondary text-[12px] mt-2">{{ service.title }}</p>
        </div>
        <n-link v-else :to="{ path: service.path }" :key="service.key" class="flex flex-col items-center justify-start">
          <n-icon :icon="service.icon" class="w-14 h-14"></n-icon>
          <p class="text-center text-gray-v2-secondary text-[12px] mt-2">{{ service.title }}</p>
        </n-link>
      </template>
      <v2-rating v-model="isDevelop" :name.sync="rateName" />
    </div>
  </section>
</template>

<script>
import NIcon from '../../common/NIcon'
// import V2Alert from '../../common/V2Alert'

export default {
  name: 'HomeService',
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
  components: { /*V2Alert,*/ NIcon },
  methods: {
    developing(name) {
      this.isDevelop = true
      this.rateName = name
    },
  },
}
</script>

<style scoped></style>
