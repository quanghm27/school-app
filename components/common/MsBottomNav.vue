<template>
  <nav>
    <ul class="u-tb">
      <li class="menu-item" v-for="nav in listNavigations" :key="nav.key">
        <n-link :to="nav.path">
          <span class="menu-img">
            <i :class="nav.icon"></i>
          </span>
          <span class="menu-txt">{{ nav.name }}</span>
        </n-link>
        <portal-target :name="`tooltip-${nav.key}`" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { menuMixin } from '~/mixins/menu'

export default {
  name: 'MSBottomNav',
  mixins: [menuMixin],
}
</script>
