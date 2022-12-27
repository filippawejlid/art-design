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
          <span class="p-float-label">
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
          </span>
        </div>
        <br />
        <div class="field">
          <div class="p-float-label">
            <InputMask
              id="numbers"
              v-model="state.card.numbers"
              :hasError="v$.card.numbers.$error"
              :class="{ 'p-invalid': v$.card.numbers.$error }"
              mask="9999 9999 9999 9999"
              slotChar=""
            />
            <label for="numbers" :class="{ 'p-error': v$.card.numbers.$error }"
              >Kortnummer*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputText
              id="name"
              v-model="state.card.name"
              :hasError="v$.card.name.$error"
              :class="{ 'p-invalid': v$.card.name.$error }"
            />
            <label for="name" :class="{ 'p-error': v$.card.name.$error }"
              >Namn på kort*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputMask
              id="date"
              v-model="state.card.cardDate"
              :hasError="v$.card.cardDate.$error"
              :class="{ 'p-invalid': v$.card.cardDate.$error }"
              mask="99/99"
            />
            <label for="date" :class="{ 'p-error': v$.card.cardDate.$error }"
              >Giltigt till MM/ÅÅ*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputMask
              id="cvc"
              v-model="state.card.cvc"
              :hasError="v$.card.cvc.$error"
              :class="{ 'p-invalid': v$.card.cvc.$error }"
              mask="999?9"
              slotChar=""
            />
            <label for="cvc" :class="{ 'p-error': v$.card.cvc.$error }"
              >CVV/CVC*</label
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
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import { reactive } from "vue";
import { Customer } from "../models/Customer";

const state = reactive({
  customer: { firstName: "", lastName: "", email: "" },
  card: {
    numbers: undefined,
    name: "",
    cardDate: undefined,
    cvc: undefined,
  },
  accept: null,
});
const rules = {
  customer: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
  },
  card: {
    numbers: { required },
    name: { required },
    cardDate: { required },
    cvc: { required },
  },
  accept: { required },
};

const emit = defineEmits(["getCustomerInfo"]);

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  console.log(state.accept);
  if (!isValid) return;

  emit("getCustomerInfo", state.customer);
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
