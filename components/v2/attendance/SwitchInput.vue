<template>
  <div class="v-switch" :style="toggle ? `background: ${backgroundColor}` : ''" @click="toggle = !toggle">
    <div class="v-switch__toggle" :style="toggle ? `background: ${color};margin-left: 50%` : ''"></div>
  </div>
</template>

<script>
export default {
  name: 'SwitchInput',
  props: {
    backgroundColor: {
      type: String,
      default: 'rgba(238, 73, 61, 0.5)',
    },
    color: {
      type: String,
      default: '#EE493D',
    },
  },
  data() {
    return {
      toggle: false,
    }
  },
}
</script>

<style scoped>
.v-switch {
  display: flex;
  align-items: center;
  padding: 5px;
  width: 58px;
  height: 32px;
  border-radius: 24px;
  background-color: #d5d8df;
  transition: all 300ms ease-in-out;
}

.v-switch__toggle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ffffff;
  transition: all 300ms ease-in-out;
  margin-left: 0;
}
</style>
