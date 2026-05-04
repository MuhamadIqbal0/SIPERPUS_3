<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Navbar -->
    <AppHeader/>

    <!-- Content -->
    <main>
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue';
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
