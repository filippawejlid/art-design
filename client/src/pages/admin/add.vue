<template>
  <div class="add">
    <div class="card">
      <form
        @submit.prevent="handleSubmit"
        class="p-fluid"
        enctype="multipart/form-data"
      >
        <div class="field">
          <!-- <FileUpload
            mode="basic"
            name="demo[]"
            v-model="state.product.img"
            chooseLabel="Välj en bild"
            url="http://localhost:8000/add-product"
            ref="fileInput"
            @upload-change="handleUploadChange"
            @upload-error="handleUploadError"
            @upload-success="handleUploadSuccess"
          /> -->
          <input type="file" @change="handleUploadChange" />
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputText
              type="text"
              v-model="state.product.name"
              :hasError="v$.product.name.$error"
              :class="{ 'p-invalid': v$.product.name.$error }"
              id="name"
            />
            <label for="name" :class="{ 'p-error': v$.product.name.$error }"
              >Namn på produkt*</label
            >
          </div>
        </div>

        <div class="field">
          <div class="p-float-label">
            <Textarea
              rows="6"
              type="text"
              v-model="state.product.description"
              :hasError="v$.product.description.$error"
              :class="{ 'p-invalid': v$.product.description.$error }"
              id="description"
            />
            <label
              for="description"
              :class="{ 'p-error': v$.product.description.$error }"
              >Beskrivning av produkt*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputNumber
              v-model="state.product.price"
              :hasError="v$.product.price.$error"
              :class="{ 'p-invalid': v$.product.price.$error }"
              id="price"
            />
            <label for="price" :class="{ 'p-error': v$.product.price.$error }"
              >Pris på produkt*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <InputNumber
              v-model="state.product.stock"
              :hasError="v$.product.stock.$error"
              :class="{ 'p-invalid': v$.product.stock.$error }"
              id="stock"
            />
            <label for="stock" :class="{ 'p-error': v$.product.stock.$error }"
              >Lagerstatus på produkt*</label
            >
          </div>
        </div>
        <Button label="Spara" class="button" type="submit"></Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUpload from "primevue/fileupload";
import Textarea from "primevue/textarea";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { required, email } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import useProductsQuery from "~/composables/queries/useProductsQuery";
import { Product } from "~/models/Product";
import useApi from "~/services/useApi";

const { addProduct } = useProductsQuery();
const file = ref();
const state = reactive({
  product: {
    name: "",
    img: file.value,
    price: 0,
    stock: 0,
    description: "",
  },
});
const rules = {
  product: {
    name: { required },
    price: { required },
    stock: { required },
    description: { required },
  },
};

const v$ = useVuelidate(rules, state);

const handleUploadChange = (event: any) => {
  console.log(event.target.files[0]);
  file.value = event.target.files[0];
};

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  const product: Product = {
    name: state.product.name,
    img: file.value,
    price: state.product.price,
    stock: state.product.stock,
    description: state.product.description,
    _id: "",
    quantity: 0,
  };

  const formData = new FormData();

  formData.append("file", file.value);
  formData.append("prod", product);
  console.log(formData);

  useApi()
    .post("/admin/add-product", formData)
    .then((data) => {
      console.log(data);

      state.product = {
        name: "",
        img: "",
        price: 0,
        stock: 0,
        description: "",
      };
    });
  // Reset the form
};
</script>

<style lang="scss" scoped>
.add {
  height: 90vh;
  @include flex(row, center, center);

  .card {
    * {
      font-family: $secondary-font;
    }
    width: 300px;
    background-color: white;
    padding: 50px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    .field {
      margin-bottom: 1.5rem;

      .img-label {
        font-size: 12px;
      }
    }
    form {
      margin-top: 2rem;
    }
  }
}

:deep(.p-button-label) {
  font-family: $secondary-font;
}

:deep(.p-fileupload-choose) {
  background-color: white;
  color: #565d63;
  border: none;
}
</style>
<route lang="yaml">
meta:
  layout: adminLayout
</route>
