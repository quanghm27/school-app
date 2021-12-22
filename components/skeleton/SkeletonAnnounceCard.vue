<template>
  <fragment>
    <div v-for="(_, index) in count" :key="index" class="bg-white rounded-md mb-4 relative shadow-card">
      <div class="p-4 border border-gray-6 border-solid border-l-0 border-t-0 border-r-0">
        <div class="flex items-center justify-between">
          <pu-skeleton width="80px" />
          <pu-skeleton width="30px" />
        </div>

        <div class="text-gray-4 text-xs mb-2"><pu-skeleton width="50px" /></div>
        <div class="text-gray-3 text-xs line-clamp-2 relative">
          <pu-skeleton :count="2" />
        </div>
      </div>
      <div class="p-4 flex items-center justify-between relative">
        <div class="flex items-center">
          <div class="flex items-center mr-4">
            <pu-skeleton width="15px" height="15px" />
          </div>
          <template>
            <div class="flex items-center mr-4">
              <pu-skeleton width="15px" height="15px" />
            </div>
            <div class="flex items-center mr-4">
              <pu-skeleton width="15px" height="15px" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'SkeletonAnnounceCard',
  data() {
    return {
      count: 3,
    }
  },
}
</script>

<style scoped></style>
