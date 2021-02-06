import axios from "axios";
import { ICustomer } from "@/types/Customer";
import { IServiceResponse } from "@/types/ServiceResponse";

export default class CustomerService {

  public async getCustomers(): Promise<ICustomer[]> {
    let result: any = await axios.get("/customer");
    return result.data;
  }

  public async addCustomer(newCustomer: ICustomer): Promise<IServiceResponse<ICustomer>> {
    let result: any = await axios.post("/customer", newCustomer);
    return result.data;
  }

  public async deleteCustomer(customerId: number): Promise<boolean> {
    let result : any = await axios.delete(`/customer/${customerId}`);
    return result.data;
  }
}