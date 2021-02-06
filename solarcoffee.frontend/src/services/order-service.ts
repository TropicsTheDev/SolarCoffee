import axios from "axios";

/**
 * Order Service.
 * Provides UI business logic associated with sales orders.
 */
export class OrderService {
  public async getOrders(): Promise<any> {
    let result: any = await axios.get("/order");
    return result.data;
  }

  public async markOrderComplete(id: number): Promise<any> {
    let result: any = await axios.patch(`/order/complete/${id}`);
    return result.data;
  }
}
