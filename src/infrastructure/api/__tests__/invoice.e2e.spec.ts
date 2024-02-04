import { Sequelize } from "sequelize-typescript";
import InvoiceItems from "../../../modules/invoice/domain/invoice-items.entity";
import Invoice from "../../../modules/invoice/domain/invoice.entity";
import { InvoiceItemsModel } from "../../../modules/invoice/repository/invoice-items.model";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import Address from "../../../modules/invoice/value-object/address";
import { app } from "../express";
import request from "supertest";
import Id from "../../../modules/@shared/domain/entity/valeu-object/id.value-object";

describe("E2E test for invoice", () => {
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
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    it("should find an invoice by ID", async () => {
      const invoiceItemProps = {
        name: "Name 1",
        price: 100,
      };
      const invoiceItem1 = new InvoiceItems(invoiceItemProps);
      const address = new Address("Street 1", 123, "Complement 1", "City 1", "State 1", "12345");
      const invoice = new Invoice(new Id("1"), "Invoice 1","Document 1", address, [invoiceItem1]);
      

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
  
      
     const response = await request(app).get(`/invoice/${invoice.id.id}`).send();
  
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(invoice.id.id);
      expect(response.body.name).toBe(invoice.name);
      expect(response.body.address.city).toBe(invoice.address.city);
      expect(response.body.document).toBe(invoice.document);
      expect(response.body.items.length).toBe(invoice.items.length);
      expect(response.body.items[0].id).toBe(invoice.items[0].id.id);
  
    });

})