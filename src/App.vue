<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="nav-menu">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            background-color="#1a237e"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/">天气概览</el-menu-item>
            <el-menu-item index="/trend">天气趋势</el-menu-item>
            <el-menu-item index="/analysis">天气分析</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const activeIndex = ref(route.path)

    watch(() => route.path, (newPath) => {
      activeIndex.value = newPath
    })

    return {
      activeIndex
    }
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #f5f7fa;
}

.el-container {
  height: 100vh;
}

.el-header {
  padding: 0;
  background-color: #1a237e;
}

.nav-menu {
  height: 60px;
}

.el-main {
  padding: 0;
  overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 覆盖 Element Plus 的默认样式 */
.el-menu--horizontal > .el-menu-item {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #ffd04b;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
  background-color: #283593;
}
</style>
