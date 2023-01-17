<template>
  <div class="add">
    <div class="card">
      <form
        @submit.prevent="handleSubmit"
        class="p-fluid"
        enctype="multipart/form-data"
      >
        <div class="field file-field">
          <!-- <FileUpload
            mode="basic"
            name="demo[]"
            chooseLabel="Välj en bild"

            ref="fileInput"
            @upload-change="handleUploadChange"

          /> -->
          <span class="message">{{ message }}</span>
          <input
            id="file"
            type="file"
            @change="handleUploadChange"
            class="file-input"
          />
          <label for="file">Välj en bild</label>
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
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import useProductsQuery from "~/composables/queries/useProductsQuery";
import { Product } from "~/models/Product";
import useApi from "~/services/useApi";

const message = computed(() => {
  if (!file.value) {
    return "Du måste välja en bild";
  } else {
    return "";
  }
});
const file = ref();
const state = reactive({
  product: {
    name: "",
    img: undefined,
    price: 0,
    stock: 0,
    description: "",
  },
});
const rules = {
  product: {
    name: { required },
    img: { required },
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
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price.toString());
  formData.append("stock", product.stock.toString());
  console.log(formData);

  useApi()
    .post("/add-product", formData)
    .then((data) => {
      console.log(data);
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

      .file-input {
        border: none;
        outline: none;
      }
    }
    .file-field {
      @include flex(column, center, center);
    }
  }
}

.message {
  display: inline !important;
  font-size: 0.8rem;
  margin: 10px 0px;
  color: #e24c4c;
}

[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  background: $base-brown;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  outline: none;
  transition: all 0.3s;
  padding: 10px 18px;

  &:hover {
    background-color: darken($base-brown, 10%);
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
