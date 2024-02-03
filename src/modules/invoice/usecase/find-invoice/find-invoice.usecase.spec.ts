import Id from "../../../@shared/domain/entity/valeu-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoiceItemsPropList = [{
  id: new Id("1"),
  name: "item 1",
  price: 100,
},
{
  id: new Id("2"),
  name: "item 2",
  price: 500,
}]

const address = new Address("Street 1", 123, "Complement 1", "City 1", "State 1", "12345");
const invoiceItemList1 = new InvoiceItems(invoiceItemsPropList[0]);
const invoiceItemList2 = new InvoiceItems(invoiceItemsPropList[1]);

const invoiceMock = new Invoice(
    new Id("1"), 
    "Name 1",
    "Document 1", 
    address, 
    [invoiceItemList1,invoiceItemList2]
    );

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoiceMock)),
  };
};

describe("Find Invoice usecase unit test", () => {
  it("should generate an invoice", async () => {
    const invoiceRepository = MockRepository();
    const useCase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
        id: "1",
    };

    const result = await useCase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(invoiceMock.name).toEqual(result.name);
    expect(invoiceMock.document).toEqual(result.document);
    expect(invoiceMock.address.city).toEqual(result.address.city);
    expect(invoiceMock.address.complement).toEqual(result.address.complement);
    expect(invoiceMock.address.number).toEqual(result.address.number);
    expect(invoiceMock.address.state).toEqual(result.address.state);
    expect(invoiceMock.address.street).toEqual(result.address.street);
    expect(invoiceMock.address.zipCode).toEqual(result.address.zipCode);
    expect(invoiceMock.items.length).toBe(2);
    expect(invoiceMock.items[0].id.id).toEqual(result.items[0].id);
    expect(invoiceMock.items[0].name).toEqual(result.items[0].name);
    expect(invoiceMock.items[0].price).toEqual(result.items[0].price);
    expect(invoiceMock.items[1].id.id).toEqual(result.items[1].id);
    expect(invoiceMock.items[1].name).toEqual(result.items[1].name);
    expect(invoiceMock.items[1].price).toEqual(result.items[1].price);
    expect(invoiceMock.total()).toEqual(result.total);

  });
});
