import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoice-items.model";
import Invoice from "../domain/invoice.entity";
import Address from "../value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const invoiceItemProps1 = {
      name: "Name 1",
      price: 100,
    };
    const invoiceItemProps2 = {
      name: "Name 2",
      price: 200,
    };
    const invoiceItem1 = new InvoiceItems(invoiceItemProps1);
    const invoiceItem2 = new InvoiceItems(invoiceItemProps2);
    const address = new Address("Street 1", 123, "Complement 1", "City 1", "State 1", "12345");

    const invoice = new Invoice(new Id("1"), "Invoice 1","Document 1", address, [invoiceItem1,invoiceItem2]);
    
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id }, include: [InvoiceItemsModel]
    });

    expect(invoice.id.id).toEqual(result.id);
    expect(invoice.name).toEqual(result.name);
    expect(invoice.document).toEqual(result.document);
    expect(invoice.createdAt).toEqual(result.createdAt);
    expect(invoice.updatedAt).toEqual(result.updatedAt);
    expect(invoice.address.city).toEqual(result.city);
    expect(invoice.address.complement).toEqual(result.complement);
    expect(invoice.address.number).toEqual(result.number);
    expect(invoice.address.state).toEqual(result.state);
    expect(invoice.address.street).toEqual(result.street);
    expect(invoice.address.zipCode).toEqual(result.zipCode);
    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0].id.id).toEqual(result.items[0].id);
    expect(invoice.items[0].name).toEqual(result.items[0].name);
    expect(invoice.items[0].price).toEqual(result.items[0].price);
    expect(invoice.items[0].createdAt).toEqual(result.items[0].createdAt);
    expect(invoice.items[0].updatedAt).toEqual(result.items[0].updatedAt);
    expect(invoice.items[1].id.id).toEqual(result.items[1].id);
    expect(invoice.items[1].name).toEqual(result.items[1].name);
    expect(invoice.items[1].price).toEqual(result.items[1].price);
    expect(invoice.items[1].createdAt).toEqual(result.items[1].createdAt);
    expect(invoice.items[1].updatedAt).toEqual(result.items[1].updatedAt);
    expect(invoice.total()).toEqual(300);
  
  });


  it("should find an invoice", async () => {
    const invoiceItemProps = {
      name: "Name 1",
      price: 100,
    };
    const invoiceItem1 = new InvoiceItems(invoiceItemProps);
    const address = new Address("Street 1", 123, "Complement 1", "City 1", "State 1", "12345");

    const invoice = new Invoice(new Id("1"), "Invoice 1","Document 1", address, [invoiceItem1]);
    
    const invoiceRepository = new InvoiceRepository();
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
  
    invoice.items.forEach(async (item) => {
       await InvoiceItemsModel.create({
        id: item.id.id,
        name: item.name,
        price: item.price,
        invoiceID: invoice.id.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });

    const result = await invoiceRepository.find(invoice.id.id);

    expect(invoice.id.id).toEqual(result.id.id);
    expect(invoice.name).toEqual(result.name);
    expect(invoice.document).toEqual(result.document);
    expect(invoice.createdAt).toEqual(result.createdAt);
    expect(invoice.updatedAt).toEqual(result.updatedAt);
    expect(invoice.address.city).toEqual(result.address.city);
    expect(invoice.address.complement).toEqual(result.address.complement);
    expect(invoice.address.number).toEqual(result.address.number);
    expect(invoice.address.state).toEqual(result.address.state);
    expect(invoice.address.street).toEqual(result.address.street);
    expect(invoice.address.zipCode).toEqual(result.address.zipCode);
    expect(invoice.items.length).toBe(1);
    expect(invoice.items[0].name).toEqual(result.items[0].name);
    expect(invoice.items[0].price).toEqual(result.items[0].price);
    expect(invoice.items[0].createdAt).toEqual(result.items[0].createdAt);
    expect(invoice.items[0].updatedAt).toEqual(result.items[0].updatedAt);
  
  });

  
});
