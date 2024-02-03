import Id from "../../@shared/domain/entity/valeu-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import { GenerateInvoiceUseCaseInputDto } from "../usecase/generate-invoice/generate-invoice.dto";
import Address from "../value-object/address";



export default class InvoiceFactory {
  public static create(props: GenerateInvoiceUseCaseInputDto): Invoice {

    const invoiceItemsList = new Array<InvoiceItems>();
    props.items.forEach((item) => {
      let invoiceItemProps = {
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      };
      let invoiceItem = new InvoiceItems(invoiceItemProps);
      invoiceItemsList.push(invoiceItem);
    });

    const address = new Address(
        props.street, 
        props.number, 
        props.complement, 
        props.city, 
        props.state, 
        props.zipCode
        );

    return new Invoice(
        new Id(), 
        props.name,
        props.document, 
        address, 
        invoiceItemsList
        );

  }
}
