<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { reactive } from 'vue'
const themeVars = reactive({
  PrimaryColor: '#ff5913',
  TextColor: '#343B4D',
  ButtonPrimaryBackground: '#ff5913',
  ButtonPrimaryBorderColor: '#ff5913'
})
const cacheList = ['info001', 'info002', 'info003', 'info004', 'info005', 'info006']
</script>

<template>
  <van-config-provider theme-vars-scope="global" :theme-vars="themeVars">
    <router-view v-slot="{ Component, route }">
      <!-- <div>{{ route.meta.keepAlive }}</div> -->
      <keep-alive v-if="route.meta.keepAlive" :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component :is="Component" v-else :key="route.fullPath" />
    </router-view>
  </van-config-provider>
</template>

<style scoped></style>
