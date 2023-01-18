<template>
  <div class="footer">
    <p class="footer-text">
      Tack för att du stöttar Art & Design, jag jobbar hårt för att säkerställa
      högsta kvalité och kundnöjdhet. Vill du se mer av mitt arbete och kommande
      konst, kika på någon av mina sociala medier.
    </p>
    <div class="icons">
      <i class="pi pi-instagram"></i>
      <i class="pi pi-facebook"></i>
      <i class="pi pi-twitter"></i>
    </div>
    <router-link v-slot="{ navigate }" custom :to="'/login'">
      <p class="link" @click="navigate">Logga in</p>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
  border: 1px solid #dee2e6;
  position: relative;
  background-color: white;
  padding: 30px;
  @include flex(column, center, center, 2rem);
  &-text {
    font-family: $secondary-font;
    text-align: center;

    @include tablet() {
      width: 80%;
    }
  }

  .icons {
    @include flex(row, space-evenly, center, 2rem);

    i {
      font-size: 2rem;
      cursor: pointer;
      color: $base-brown;
    }
  }

  .link {
    color: rgb(186, 186, 186);
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
