<template>
  <div class="app-wrapper">
    <!-- 左侧的menu -->
    <sidebar id="guide-siderbar" class="sidebar-container" />
    <div class="main-container">
      <!-- 顶部的navbar -->
      <div class="fixed-header">
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
