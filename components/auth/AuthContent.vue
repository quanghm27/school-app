<template>
  <div
    class="z-10 rounded-t-[2em] mt-16 p-9 pt-20 overflow-y-auto bg-center bg-cover bg-white flex-grow"
    :style="{ backgroundImage: `url(${require(`~/assets/img/login/${contentBg}`)})` }"
  >
    <slot />
  </div>
</template>

<script>
import { themeMixin } from '@/mixins'

export default {
  name: 'AuthContent',
  mixins: [themeMixin],
}
</script>
