import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice-items.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";


export default class InvoiceRepository implements InvoiceGateway {

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id: id }, include: [InvoiceItemsModel]
    });
    const address = new Address(invoice.street, invoice.number, invoice.complement, invoice.city, invoice.state, invoice.zipCode);
    const items = new Array<InvoiceItems>();
    invoice.items.forEach(item => {
      const invoiceItemProps = {
        id: new Id(item.id),
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      };
      const invoiceItem = new InvoiceItems(invoiceItemProps);
      items.push(invoiceItem)
    });
    return new Invoice(new Id(invoice.id), invoice.name, invoice.document, address, items, invoice.createdAt, invoice.updatedAt);
  }
  
  async generate(invoice: Invoice): Promise<void> {
   
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      city: invoice.address.city,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });

    for (const item of invoice.items) {
      await InvoiceItemsModel.create({
        id: item.id.id,
        name: item.name,
        price: item.price,
        invoiceID: invoice.id.id, 
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    }
    
  }
}
