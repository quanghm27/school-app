<template>
  <fragment>
    <div v-for="(item, index) in count" :key="index" class="bg-white w-[290px] mr-2 rounded shadow-card-home p-2.5">
      <div class="flex h-full">
        <div class="w-18 h-18 mr-2">
          <pu-skeleton height="72px" width="72px" />
        </div>
        <div class="flex-1 overflow-x-hidden flex flex-col justify-between">
          <div>
            <p class="font-medium mb-1 line-clamp-2">
              <pu-skeleton :count="1" />
            </p>
            <span class="text-[10px] text-[#5A5A5A] line-clamp-2 leading-[150%]">
              <pu-skeleton :count="2" />
            </span>
          </div>
          <div class="flex items-center justify-between">
            <pu-skeleton width="80px" />
            <pu-skeleton width="30px" />
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'SkeletonHomeNotification',
  data() {
    return {
      count: 2,
    }
  },
}
</script>

<style scoped></style>
