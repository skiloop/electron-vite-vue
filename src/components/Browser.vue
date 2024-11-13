<script setup lang="ts">

function openBrowser() {
  window.ipcRenderer.send('open-new-window');
}

function connectBrowser() {
  window.ipcRenderer.send('connect');
}
</script>

<template>
  <div>
    <button @click="openBrowser">Open Browser</button>
    <button @click="connectBrowser">Connect Browser</button>
  </div>
</template>

<style scoped>
</style>
