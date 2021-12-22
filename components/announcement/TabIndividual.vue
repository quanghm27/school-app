<template>
  <div>
    <div class="mb-8">
      <p class="font-bold mb-2">{{ $t('Đã chọn') }}</p>
      <template v-for="item of selected">
        <span class="text-orange-EE493D" :key="JSON.stringify(item.GROUP_ID)">
          <span v-if="item.GROUP_ID.TYPE_GROUP === 1">
            <span>{{ item.STUDENT_NAME || item.GROUP_NAME }}, </span>
          </span>
          <span v-else-if="item.GROUP_ID.TYPE_GROUP === 3">
            <span>{{ item.STUDENT_NAME ? `(P/H) ${item.STUDENT_NAME}` : `(P/H) ${item.GROUP_NAME}` }}, </span>
          </span>
          <span v-else>
            <span>{{ item.TEACHER_NAME ? `(GV) ${item.TEACHER_NAME}` : `(GV) ${item.GROUP_NAME}` }}, </span>
          </span>
        </span>
      </template>
    </div>
    <ul class="mb-40">
      <template v-for="item of indiLocal" v-observe-visibility>
        <li class="pop-item" :key="JSON.stringify(item.GROUP_ID)">
          <div class="pop-item-title">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU"
              alt=""
              class="w-9 h-9 rounded-full"
            />
            <div class="ml-1">
              <template v-if="item.GROUP_ID.TYPE_GROUP === 1">
                <p class="font-bold line-clamp-1">
                  {{ `${item.STUDENT_NAME} (${item.CLASS_NAME})` }}
                </p>
                <p class="text-gray-3">{{ item.BIRTH_DAY | formatDates('DD/MM/YYYY') }}</p>
              </template>
              <template v-else-if="item.GROUP_ID.TYPE_GROUP === 3">
                <p class="font-bold line-clamp-1">
                  {{ `P/H em ${item.STUDENT_NAME} (${item.CLASS_NAME})` }}
                </p>
              </template>
              <template v-else>
                <p class="font-bold line-clamp-1">
                  {{ item.TEACHER_NAME }}
                </p>
                <p class="text-gray-3 w-full line-clamp-1">
                  GV {{ item.SUBJECT ? item.SUBJECT.replaceAll(',', ', ') : '' }}
                </p>
              </template>
            </div>
          </div>
          <n-icon
            :icon="`check_rec${!checked(item) ? '_outline' : ''}`"
            color="red"
            class-name="icon-check ml-1"
            @click="onSelectItem(item)"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabIndividual',
  props: {
    students: {
      type: Array,
      default: () => [],
    },
    parents: {
      type: Array,
      default: () => [],
    },
    teachers: {
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
      indiLocal: this.students,
    }
  },

  watch: {
    students(list) {
      if (this.activeSubTab === 0) {
        this.indiLocal = list
      }
    },
    parents(list) {
      if (this.activeSubTab === 1) {
        this.indiLocal = list
      }
    },
    teachers(list) {
      if (this.activeSubTab === 2) {
        this.indiLocal = list
      }
    },
  },

  methods: {
    onSelectItem(item) {
      const findSelected = this.selected.find(
        select => JSON.stringify(select.GROUP_ID) === JSON.stringify(item.GROUP_ID),
      )
      if (findSelected) {
        const select = this.selected.filter(i => JSON.stringify(i.GROUP_ID) !== JSON.stringify(item.GROUP_ID))
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
