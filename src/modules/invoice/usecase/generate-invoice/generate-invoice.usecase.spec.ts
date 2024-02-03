import GenerateInvoiceUseCase from "./generate-invoice.usecase";


const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should generate an invoice", async () => {
    const invoiceRepository = MockRepository();
    const useCase = new GenerateInvoiceUseCase(invoiceRepository);

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

    

    const result = await useCase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
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
});
