export interface IInvoice {
  customerId: number;
  lineItems: ILineItems[];
  createdOn?: Date;
  updatedOn?: Date;
}

export interface ILineItem {
  product?: IProduct;
  quantity: number;
}