<template>
  <ms-template :page-title="$t('menu_add_service')" page-type="subpage" :show-drawer="false" :show-bottom-nav="false">
    <span slot="headerLeft" />
    <template slot="content">
      <section class="notice">
        <div class="u-middle">
          <div class="addService-select">
            <ul>
              <li v-for="role in roles" :key="role.id">
                <n-link
                  :to="{ name: 'user-service-role', params: { role: role.name } }"
                  :class="'icoApp-role' + $utils.common.ucfirst(role.name)"
                ></n-link>
                <p class="c-teacher">{{ $t(`btn_${role.name}`) }}</p>
              </li>
            </ul>
          </div>
          <h2 class="notice-title">{{ $t('msg_add_service') }}</h2>
          <p class="notice-txt ws-pre">{{ $t('msg_add_service_content') }}</p>
          <p class="notice-PS">{{ $t('msg_add_service_notice') }}</p>
        </div>
      </section>
    </template>
  </ms-template>
</template>

<script>
import { ROLES } from '~/constants'

export default {
  data() {
    return {
      roles: ROLES,
    }
  },
}
</script>
