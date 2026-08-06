<template>
  <div class="app-scroll">
    <NuxtPage />
  </div>
</template>

<style>
html,
body {
  height: 100%;
  overflow: hidden;
}

.app-scroll {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
