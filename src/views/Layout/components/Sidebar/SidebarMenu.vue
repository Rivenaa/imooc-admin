<template>
  <!-- 一级菜单 -->
  <el-menu
    :uniqueOpened="true"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { filterRouter, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(routes.value)
</script>

<style lang="scss" scoped></style>
