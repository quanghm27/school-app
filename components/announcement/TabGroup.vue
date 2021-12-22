<template>
  <div class="overflow-auto h-full">
    <div class="mb-8">
      <div class="font-bold mb-2">{{ $t('Đã chọn') }} {{ selected.length }}</div>
      <template v-for="item of selected">
        <span class="text-orange-EE493D" :key="JSON.stringify(item.GROUP_ID)">
          <span v-if="item.GROUP_ID.TYPE_GROUP === 1">
            <span>{{ item.STUDENT_NAME || item.GROUP_NAME }}, </span>
          </span>
          <span v-else-if="item.GROUP_ID.TYPE_GROUP === 3">
            <span>{{ item.STUDENT_NAME ? `(P/H) ${item.STUDENT_NAME}` : item.GROUP_NAME }}, </span>
          </span>
          <span v-else>
            <span>{{ item.TEACHER_NAME ? `(GV) ${item.TEACHER_NAME}` : `(GV) ${item.GROUP_NAME}` }}, </span>
          </span>
        </span>
      </template>
    </div>
    <ul class="mb-40">
      <li class="pop-item" v-for="item of groupLocal" :key="JSON.stringify(item.GROUP_ID)">
        <span class="pop-item-title">
          {{ item.GROUP_NAME }}
        </span>
        <n-icon
          :icon="`check_rec${!checked(item) ? '_outline' : ''}`"
          color="#EE493D"
          class-name="icon-check ml-1"
          @click="onSelectItem(item)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabGroup',
  props: {
    groupStudent: {
      type: Array,
      default: () => [],
    },
    groupParent: {
      type: Array,
      default: () => [],
    },
    groupTeacher: {
      type: Array,
      default: () => [],
    },
    activeSubTab: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      groupLocal: this.groupStudent,
    }
  },

  watch: {
    groupStudent(list) {
      if (this.activeSubTab === 0) {
        this.groupLocal = list
      }
    },
    groupParent(list) {
      if (this.activeSubTab === 1) {
        this.groupLocal = list
      }
    },
    groupTeacher(list) {
      if (this.activeSubTab === 2) {
        this.groupLocal = list
      }
    },
  },

  methods: {
    onSelectItem(item) {
      const findSelected = this.selected.find(
        select => JSON.stringify(select.GROUP_ID) === JSON.stringify(item.GROUP_ID),
      )
      if (findSelected) {
        const select = this.selected.filter(i => {
          return JSON.stringify(i.GROUP_ID) !== JSON.stringify(item.GROUP_ID)
        })
        this.$emit('update:selected', select)
        return
      }
      this.$emit('update:selected', [...this.selected, item])
    },
    checked(itemCheck) {
      const findSelected = this.selected.find(item => {
        return JSON.stringify(item.GROUP_ID) === JSON.stringify(itemCheck.GROUP_ID)
      })
      return Boolean(findSelected)
    },
  },
}
</script>

<style scoped></style>
