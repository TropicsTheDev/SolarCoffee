<template>
  <SolarModal>
    <template v-slot:header>Add new Customer</template>
    <template v-slot:body>
      <ul class="new-customer">
        <label for="firstName">First Name</label>
        <input type="text" v-model="customer.firstName" id="firstName" />
        <label for="lastName">Last Name</label>
        <input type="text" v-model="customer.lastName" id="lastName" />
        <label for="address1">Address Line 1</label>
        <input
          type="text"
          v-model="customer.primaryAddress.addressLine1"
          id="address1"
        />
        <label for="address2">Address Line 2</label>
        <input
          type="text"
          v-model="customer.primaryAddress.addressLine2"
          id="address2"
        />
        <li>
          <label for="city">City</label>
          <input type="text" id="city" v-model="customer.primaryAddress.city" />
        </li>
        <li>
          <label for="state">State</label>
          <input
            type="text"
            id="state"
            v-model="customer.primaryAddress.state"
          />
        </li>
        <li>
          <label for="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            v-model="customer.primaryAddress.postalCode"
          />
        </li>
        <li>
          <label for="country">Country</label>
          <input
            type="text"
            id="country"
            v-model="customer.primaryAddress.country"
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
      </SolarButton></template
    >
  </SolarModal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SolarButton from "@/components/SolarButton.vue";
import SolarModal from "@/components/modals/SolarModal.vue";
import { ICustomer } from "@/types/Customer";

@Component({
  name: "NewCustomerModal",
  components: { SolarButton, SolarModal },
})
export default class NewCustomerModal extends Vue {
  customer: ICustomer = {
    primaryAddress: {},
    createdOn: new Date(),
    updatedOn: new Date(),
    firstName: "",
    lastName: ""
  };

  save() {
    this.$emit("save:customer", this.customer);
  }

  close() {
    this.$emit("close");
  }
}
</script>

<style scoped lang="scss">
.new-customer {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  input {
    width: 80%;
    height: 1.8rem;
    margin: 0.8rem 2rem 0.8rem 0.8rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    padding: 0.2rem;
    color: #555;
  }
  label {
    font-weight: bold;
    margin: 0.8rem;
    display: block;
  }
}
</style>
