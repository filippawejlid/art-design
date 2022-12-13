<template>
  <div class="main">
    <h1>Tavlor</h1>
    <div class="products">produkterna</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  h1 {
    color: rgb(105, 105, 105);
    font-weight: 100;
  }
  margin: 20px 0px;
  padding: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 3px;
  @include flex(column, flex-start, center, 2rem);
  @include tablet() {
    margin: 30px;
  }
}
</style>
