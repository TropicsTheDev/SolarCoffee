<template>
  <div class="inventory-container">
    <h1 id="inventoryTitle">Inventory Dashboard</h1>
    <hr />

    <div class="inventory-actions">
      <SolarButton @button:click="showNewProductModal" id="addNewBtn">
        Add New Item
      </SolarButton>
      <SolarButton @button:click="showShipmentModal" id="receiveShipmentBtn">
        Receive Shipment
      </SolarButton>
    </div>

    <table id="inventoryTable" class="table">
      <tr>
        <th>Item</th>
        <th>Quantity On Hand</th>
        <th>Unit Price</th>
        <th>Taxable</th>
        <th>Delete</th>
      </tr>
      <tr v-for="item in inventory" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantityOnHand }}</td>
        <td />
        <td>{{ item.price }}</td>
        <td>
          <span v-if="item.product.isTaxible">Yes</span><span v-else>No</span>
        </td>
      </tr>
    </table>

    <NewProductModal v-if="isNewProductVisible" @close="closeModals" @save:product="saveNewProduct" />
    <ShipmentModal
      v-if="isShipmentVisible"
      :inventory="inventory"
      @close="closeModals"
      @save:shipment="saveNewShipment"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProduct, IProductInventory } from "../types/Product";
import SolarButton from "@/components/SolarButton.vue";
import NewProductModal from "@/components/modals/NewProductModal.vue";
import ShipmentModal from "@/components/modals/ShipmentModal.vue";
import { IShipment } from "@/types/Shipment";
import { InventoryService } from "@/services/inventory-service";


const inventoryService = new InventoryService();

@Component({
  name: "Inventory",
  components: { SolarButton, NewProductModal, ShipmentModal },
})
export default class extends Vue {
  isNewProductVisible: boolean = false;
  isShipmentVisible: boolean = false;

  inventory: IProductInventory[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: "Some product",
        description: "Good stuff",
        price: 100,
        isTaxable: true,
        isArchived: false,
        createdOn: new Date(),
        updatedOn: new Date(),
      },
      quantityOnHand: 100,
      idealQuantity: 100,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "Another product",
        description: "Good stuff",
        price: 100,
        isTaxable: true,
        isArchived: false,
        createdOn: new Date(),
        updatedOn: new Date(),
      },
      quantityOnHand: 40,
      idealQuantity: 20,
    },
  ];

  closeModal() {
    this.isShipmentVisible = false;
    this.isNewProductVisible = false;
  }


  showNewProductModal() {
    this.isNewProductVisible = true;
  }

  showShipmentModal() {
    this.isShipmentVisible = true;
  }

  saveNewProduct(newProduct: IProduct) {
    console.log("saveNewProduct: ", newProduct);
  }

  saveNewShipment(shipment: IShipment) {
    console.log("saveNewShipment: ", shipment);
  }

async initialize() {
  this.inventory = await inventoryService.getInventory();
}

  async created() {
    await this.initialize();
  }
}
</script>

<style scoped></style>
