<template>
  <div class="landing-page">
    <div class="btn-container">
      <router-link
        class="link-button"
        v-slot="{ navigate }"
        custom
        :to="'/products'"
      >
        <button class="btn" @click="navigate">Vidare till konsten</button>
      </router-link>
    </div>
    <div class="text-container">
      <h1>Diana Bellange</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
</script>
<style scoped lang="scss">
.landing-page {
  background: url("../assets/Art&Design\ \(1\).gif") no-repeat center center
    fixed;
  background-size: cover;
  height: 100vh;
  @include flex(column, space-between, flex-start);

  .btn-container {
    width: 100%;
    padding: 90px 0px 0px 90px;
    @include flex(row, flex-start, flex-start);
    .btn {
      width: 250px;
      cursor: pointer;
      font-family: $base-font;
      font-size: large;
      padding: 20px;
      border: none;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.57);
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      &:hover {
        transform: scale(105%);
      }
    }
  }

  .text-container {
    width: 100%;
    padding: 0px 90px 90px 0px;

    @include flex(row, flex-end, flex-end);

    h1 {
      font-family: $base-font;
      font-weight: 100;
      color: white;
      font-size: 2.5rem;
    }
  }
}
</style>
<route lang="yaml">
meta:
  layout: none
</route>
