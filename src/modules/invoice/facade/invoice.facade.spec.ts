import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemsModel } from "../repository/invoice-items.model";
import Invoice from "../domain/invoice.entity";
import Address from "../value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";



describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel,InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
  

    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Name 1",
      document: "Document 1",
      street: "Street 1",
      number: 123,
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "555555",
      items: [{
        id: "1",
        name: "item 1",
        price: 100,
      },
      {
        id: "2",
        name: "item 2",
        price: 500,
      }],
  };

    const result = await invoiceFacade.generate(input);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined;
    expect(input.name).toEqual(result.name);
    expect(input.document).toEqual(result.document);
    expect(input.city).toEqual(result.city);
    expect(input.complement).toEqual(result.complement);
    expect(input.number).toEqual(result.number);
    expect(input.state).toEqual(result.state);
    expect(input.street).toEqual(result.street);
    expect(input.zipCode).toEqual(result.zipCode);
    expect(input.items.length).toBe(2);
    expect(input.items[0].id).toEqual(result.items[0].id);
    expect(input.items[0].name).toEqual(result.items[0].name);
    expect(input.items[0].price).toEqual(result.items[0].price);
    expect(input.items[1].id).toEqual(result.items[1].id);
    expect(input.items[1].name).toEqual(result.items[1].name);
    expect(input.items[1].price).toEqual(result.items[1].price);
    expect(result.total).toEqual(600);
  });

// it("should find invoice", async () => {
//     const invoiceItem1Props = {
//       name: "Name 1",
//       price: 100,
//     };
//     const invoiceItem2Props = {
//       name: "Name 2",
//       price: 200,
//     };
//     const invoiceItem1 = new InvoiceItems(invoiceItem1Props);
//     const invoiceItem2 = new InvoiceItems(invoiceItem2Props);
//     const address = new Address("Street 1", 123, "Complement 1", "City 1", "State 1", "12345");

//     const invoice = new Invoice(new Id("1"), "Invoice 1","Document 1", address, [invoiceItem1]);
    
//     await InvoiceModel.create({
//       id: invoice.id.id,
//       name: invoice.name,
//       document: invoice.document,
//       city: invoice.address.city,
//       street: invoice.address.street,
//       number: invoice.address.number,
//       complement: invoice.address.complement,
//       state: invoice.address.state,
//       zipCode: invoice.address.zipCode,
//       createdAt: invoice.createdAt,
//       updatedAt: invoice.updatedAt,
//     });
//     console.log(invoice.items)
//     invoice.items.forEach(async (item) => {
//        await InvoiceItemsModel.create({
//         id: item.id.id,
//         name: item.name,
//         price: item.price,
//         invoiceID: invoice.id.id,
//         createdAt: item.createdAt,
//         updatedAt: item.updatedAt,
//       });
//     });
    
//     const invoiceFacade = InvoiceFacadeFactory.create();
//     const input = {
//       id: "1",

//     };
//     const result = await invoiceFacade.find(input);

  
//     expect(invoice.id.id).toEqual(result.id);
//     expect(invoice.name).toEqual(result.name);
//     expect(invoice.document).toEqual(result.document);
//     expect(invoice.createdAt).toEqual(result.createdAt);
//     expect(invoice.address.city).toEqual(result.address.city);
//     expect(invoice.address.complement).toEqual(result.address.complement);
//     expect(invoice.address.number).toEqual(result.address.number);
//     expect(invoice.address.state).toEqual(result.address.state);
//     expect(invoice.address.street).toEqual(result.address.street);
//     expect(invoice.address.zipCode).toEqual(result.address.zipCode);
//     expect(invoice.items.length).toBe(1);
//     expect(invoice.items[0].name).toEqual(result.items[0].name);
//     expect(invoice.items[0].price).toEqual(result.items[0].price);
//   });
});
