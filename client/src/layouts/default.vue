<template>
  <Header></Header>
  <main>
    <router-view />
  </main>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from "../../src/components/Header.vue";
import Footer from "../../src/components/Footer.vue";
</script>

<style lang="scss" scoped>
main {
  margin: 0px;
}
</style>
