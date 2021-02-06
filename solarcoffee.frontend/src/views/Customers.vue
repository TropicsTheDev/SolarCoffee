<template>
  <div>
    <h1 id="customersTitle">
      Manage Customers
      <SolarButton @button:click="showCustomerModal">
        Add Customer
      </SolarButton>
    </h1>
    <table id="customers" class="table">
      <tr>
        <th>Customer</th>
        <th>Address</th>
        <th>State</th>
        <th>Since</th>
        <th>Delete</th>
      </tr>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ customer.firstName + " " + customer.lastName }}</td>
        <td>
          {{
            customer.primaryAddress.adressLine1 +
              " " +
              customer.primaryAddress.addressLine2
          }}
        </td>
        <td>{{ customer.primaryAddress.state }}</td>
        <td>{{ customer.createdOn | humanizeDate }}</td>
        <td>
          <div
            class="lni-cross-circle customer-delete"
            @click="deleteCustomer(customer.id)"
          ></div>
        </td>
      </tr>
    </table>

    <NewCustomerModal
      @save:customer="saveNewCustomer"
      @close="closeModal"
      v-if="isCustomerModalVisible"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ICustomer } from "@/types/Customer";
import SolarButton from "@/components/SolarButton.vue";
import NewCustomerModal from "@/components/modals/NewCustomerModal.vue";
import CustomerService from "@/services/customer-service";

const customerService = new CustomerService();

@Component({
  name: "Customers",
  components: { SolarButton },
})
export default class Customers extends Vue {
  isCustomerModalVisible: boolean = false;

  showCustomerModal() {
    this.isCustomerModalVisible = true;
  }

  closeModal() {
    this.isCustomerModalVisible = false;
  }

   async saveNewcustomer(customer: ICustomer) {
    await customerService.addCustomer(customer);
    await this.initialize();
  }

  async deleteCustomer(id: number) {
    await customerService.deleteCustomer(id);
    await this.initialize();
  }

  async initialize() {
    await customerService.getCustomers();
  }

  created() {
    this.initialize();
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
.customer-actions {
  display: flex;
  margin-bottom: 0.8rem;
  div {
    margin-right: 0.8rem;
  }
}
.customer-delete {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: $solar-red;
}
</style>
