import axios from "axios";
import { IProduct } from "@/types/Product";
export class ProductService {
  async archive(productId: number) {
    let result: any = await axios.delete(`/product/${productId}`);
    return result.data;
  }

  async save(newProduct: IProduct) {
    let result = await axios.post("/product",newProduct);
    return result.data;
  }
}
