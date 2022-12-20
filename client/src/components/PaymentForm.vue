<template>
  <div class="flex justify-content-center">
    <div class="card">
      <form @submit.prevent="handleSubmit" class="p-fluid">
        <div class="field">
          <div class="p-float-label">
            <InputText
              id="name"
              v-model="state.customer.firstName"
              :hasError="v$.customer.firstName.$error"
              :class="{ 'p-invalid': v$.customer.firstName.$error }"
            />
            <label
              for="name"
              :class="{ 'p-error': v$.customer.firstName.$error }"
              >Förnamn*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputText
              id="lastName"
              v-model="state.customer.lastName"
              :hasError="v$.customer.lastName.$error"
              :class="{ 'p-invalid': v$.customer.lastName.$error }"
            />
            <label
              for="lastName"
              :class="{ 'p-error': v$.customer.lastName.$error }"
              >Efternamn*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label p-input-icon-right">
            <InputText
              id="email"
              v-model="state.customer.email"
              :hasError="v$.customer.email.$error"
              :class="{ 'p-invalid': v$.customer.email.$error }"
              aria-describedby="email-error"
            />
            <label for="email" :class="{ 'p-error': v$.customer.email.$error }"
              >Email*</label
            >
          </div>
        </div>
        <div class="field-checkbox">
          <Checkbox
            id="accept"
            name="accept"
            value="Accept"
            v-model="state.accept"
            :class="{ 'p-invalid': v$.accept.$error }"
          />
          <label for="accept" :class="{ 'p-error': v$.accept.$invalid }">
            Jag samtycker till att ni får lagra mina personuppgifter*</label
          >
        </div>
        <div class="button-container">
          <Button type="submit" label="Submit" class="mt-2" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const state = reactive({
  customer: { firstName: "", lastName: "", email: "" },
  accept: null,
});
const rules = {
  customer: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
  },
  accept: { required },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  console.log(state.accept);
  if (!isValid) return;

  console.log("hej");
};
</script>

<style lang="scss" scoped>
.card {
  * {
    font-family: $secondary-font;
  }
  .field {
    margin-bottom: 1.5rem;
  }
  form {
    margin-top: 2rem;
    .button-container {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

:deep(.p-button) {
  width: 100px;
}
</style>
