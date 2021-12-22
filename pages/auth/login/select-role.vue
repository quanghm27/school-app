<template>
  <div class="px-4 h-full overflow-y-auto">
    <n-header leftDefault="" rightDefault=""> </n-header>
    <div class="overflow-y-auto py-10">
      <div class="px-4">
        <h1 class="text-2xl font-bold">{{ $t('Đăng nhập') }}</h1>
        <p class="mb-6">{{ $t('với vai trò') }}</p>
      </div>

      <div
        v-for="item in items"
        :key="item.theme"
        :class="[
          'flex justify-between items-center rounded-2xl pl-4 mb-6 shadow-lg last:mb-0 min-h-[124px]',
          `${item.bgColor}`,
        ]"
        @click="handleSelectRole(item.value, item.theme)"
      >
        <span :class="['font-bold text-3xl text-white']">{{ $t(item.label) }}</span>
        <img class="max-w-[50%]" :src="require(`~/assets/img/next/${item.bgImg}`)" :alt="item.text" />
      </div>

      <div class="fixed bottom-4 right-4">
        <n-icon icon="help_outline" class="w-10 h-10" @click="$router.push({ name: 'inquiry-new-guest' })"></n-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectRole',
  layout: 'auth',
  created() {
    this.$store.commit('login/reset')
  },
  data() {
    return {
      items: [
        {
          label: 'Giáo viên',
          bgImg: 'teacher.png',
          value: this.$const.USER_TYPE.TEACHER,
          bgColor: 'bg-teacher',
          theme: 'role-teacher',
        },
        {
          label: 'Phụ huynh',
          bgColor: 'bg-parent',
          bgImg: 'parent.png',
          value: this.$const.USER_TYPE.PARENT,
          theme: 'role-parents',
        },
        {
          label: 'Học sinh',
          bgColor: 'bg-student',
          bgImg: 'student.png',
          value: this.$const.USER_TYPE.STUDENT,
          theme: 'role-student',
        },
      ],
    }
  },
  methods: {
    handleSelectRole(role, clas) {
      this.$cookiz.set('theme_class', clas, { path: '/' })
      this.$store.set('login/themeClass', clas)
      this.$store.set('login/type', role)
      this.$router.push({
        name: 'auth-login',
      })
    },
  },
}
</script>
