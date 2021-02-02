<template>
  <SolarModal>
    <template v-slot:header>Add New Product</template>
    <template v-slot:body>
      <ul class="new-product">
        <li>
          <label for="isTaxable">Is this Product taxable?</label>
          <input
            type="checkbox"
            name=""
            id="isTaxable"
            v-model="newProduct.isTaxable"
          />
        </li>
        <li>
          <label for="productName">Name</label>
          <input
            type="text"
            name=""
            id="productName"
            v-model="newProduct.name"
          />
        </li>
        <li>
          <label for="productDesc">Description</label>
          <input
            type="text"
            name=""
            id="productDesc"
            v-model="newProduct.description"
          />
        </li>
        <li>
          <label for="isTaxable">Price</label>
          <input
            type="checkbox"
            name=""
            id="productPrice"
            v-model="newProduct.price"
          />
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <SolarButton @click.native="save" aria-label="save new item">
        Save Product
      </SolarButton>
      <SolarButton @click.native="close" aria-label="close modal">
        Close
      </SolarButton>
    </template>
  </SolarModal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SolarButton from "../SolarButton.vue";
import SolarModal from "./SolarModal.vue";
import { IProduct } from "@/types/Product";

@Component({
  name: "ShipmentModal",
  components: { SolarModal, SolarButton },
})
export default class NewProductModal extends Vue {
  newProduct: IProduct = {
    createdOn: new Date(),
    updatedOn: new Date(),
    id: 0,
    description: "",
    isTaxable: false,
    name: "",
    price: 0,
    isArchived: false,
  };

  qtyReceived: number = 0;

  close() {
    this.$emit("close");
  }

  save() {
    this.$emit("save:product", this.newProduct);
  }
}
</script>

<style scoped lang="scss">
.newProduct {
  list-style: none;
  padding: 0;
  margin: 0;
}

input {
  width: 100%;
  height: 1.8rem;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  line-height: 1.3rem;
  padding: 0.2rem;
  color: #555;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.3rem;
}
</style>
