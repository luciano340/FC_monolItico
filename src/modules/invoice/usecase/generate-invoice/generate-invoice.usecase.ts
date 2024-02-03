
import InvoiceFactory from "../../factory/invoice.factory";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";


export default class GenerateInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const invoice = InvoiceFactory.create(input);

    await this._invoiceRepository.generate(invoice);

 
    const itemsList = invoice.items.map((item) => {
      return {
        id: item.id.id,
        name: item.name,
        price: item.price,
      };
   
    });

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: itemsList,
      total: invoice.total(),
    };
  }
}
