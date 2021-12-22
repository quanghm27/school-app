<template>
  <fragment>
    <div class="flex-nowrap flex" v-for="(item, index) in count" :key="index">
      <div class="bg-white w-[168px] mr-2 rounded shadow-card-home p-2.5 flex flex-col justify-between">
        <div class="flex justify-between w-full">
          <div class="flex-1">
            <div class="text-[22px] font-bold mb-1">
              <pu-skeleton width="80px" />
            </div>
            <div class="font-medium"><pu-skeleton width="70px" /></div>
          </div>
          <pu-skeleton width="50px" height="22px" />
        </div>
        <div class="mt-10">
          <div class="flex items-center mb-1">
            <p class="text-gray-v2-secondary">
              <pu-skeleton width="100px" />
            </p>
          </div>
          <div class="flex items-center">
            <p class="text-gray-v2-secondary underline"><pu-skeleton width="80px" /></p>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'SkeletonHomeStatus',
  data() {
    return {
      count: 3,
    }
  },
}
</script>

<style scoped></style>
