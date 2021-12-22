<template>
  <v2-template>
    <template slot="header">
      <attendance-header title="Điểm danh theo tiết"> </attendance-header>
    </template>

    <template slot="content">
      Điểm danh theo tiết
    </template>
  </v2-template>
</template>

<script>
import V2Template from '@/components/common/V2Template'
import AttendanceHeader from '@/components/common/V2Header'
export default {
  components: { V2Template, AttendanceHeader },
  name: 'Index',
  data() {
    return {
      getListDayOffApplication: [],
    }
  },
}
</script>

<style scoped></style>
