<template>
  <table class="v2-table">
    <thead v-if="headers">
      <tr>
        <th v-for="(h, i) in headers" :key="i" :colspan="h.colspan" class="font-medium" :style="{ width: h.width }">
          {{ h.name }}
        </th>
      </tr>
    </thead>
    <tr v-for="(row, index) in rows" :key="index">
      <td v-for="(r, i) in row" :key="i">{{ r }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'SummaryTable',
  props: {
    headers: {
      type: Array,
      default: null,
    },
    rows: {
      type: Array,
      default: null,
    },
  },
}
</script>
