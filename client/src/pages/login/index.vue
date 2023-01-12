<template>
  <div class="login">
    <form @submit.prevent="login">
      <div class="field">
        <div class="p-float-label">
          <InputText
            id="username"
            v-model="state.username"
            :hasError="v$.username.$error"
            :class="{ 'p-invalid': v$.username.$error }"
          />
          <label for="username" :class="{ 'p-error': v$.username.$error }"
            >Användarnamn*</label
          >
        </div>
      </div>
      <div class="field">
        <div class="p-float-label">
          <InputText
            id="password"
            type="password"
            v-model="state.password"
            :hasError="v$.password.$error"
            :class="{ 'p-invalid': v$.password.$error }"
          />
          <label for="password" :class="{ 'p-error': v$.password.$error }"
            >Lösenord*</label
          >
        </div>
      </div>
      <div class="false">{{ message }}</div>
      <div class="button-container">
        <Button type="submit" label="Logga in" class="mt-2" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InputText from "primevue/inputtext";
import { reactive, ref } from "vue";
import Button from "primevue/button";
import useApi from "~/services/useApi";
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

const router = useRouter();

const message = ref("");

const state = reactive({
  username: "",
  password: "",
});
const rules = {
  username: { required },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const login = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  useApi()
    .post("/admin/get-admin", state)
    .then((data) => {
      if (data.data === "Success") {
        userStore.setIsAdmin(true);
        message.value = "";
        router.push("/admin/start");
      } else {
        message.value = "Felaktig inloggning";
      }
    });
};
</script>

<style lang="scss" scoped>
.login {
  @include flex(row, center, center);
  min-height: 78vh;

  * {
    font-family: $secondary-font;
  }

  form {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    border-radius: 5px;
    padding: 50px;
    margin: 2rem;
    .field {
      margin-bottom: 1.5rem;
    }
    .button-container {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
    h3 {
      margin: 25px 0px;
      font-weight: normal;
      font-family: $base-font;
    }
    .false {
      color: red;
      margin-top: 10px;
      text-align: center;
    }
  }
}

:deep(.p-button) {
  width: 150px;
  margin-top: 10px;
}
</style>
