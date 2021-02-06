import axios from "axios";
import { IInvoice } from "@/types/Invoice";

export default class InvoiceService {
  public async makeNewInvoice(invoice: IInvoice): Promise<boolean> {
    let now = new Date();
    invoice.createdOn = now;
    invoice.updatedOn = now;
    let result: any = await axios.post("/invoice", invoice);
    return result.data;
  }
}
