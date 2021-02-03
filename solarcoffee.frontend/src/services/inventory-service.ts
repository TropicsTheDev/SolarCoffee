import { IProductInventory } from "@/types/Product";
import { IShipment } from "@/types/Shipment";
import axios from "axios";


export class InventoryService {

  public async getInventory(): Promise<IProductInventory[]> {
    console.log();
    let result = await axios.get("/inventory");
    return result.data;
  }

  public async updateInventoryQuantity(shipment: IShipment) {
    let result = await axios.patch("/inventory/", shipment);
    return result.data;
  }
}