import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "./invoice-items.entity";




export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string
    private _document: string
    private _address: Address 
    private _items: InvoiceItems[] 
  
    constructor(id: Id, name: string, document: string, address: Address, items: InvoiceItems[], createdAt?: Date, updatedAt?: Date) {
      super(id, createdAt, updatedAt);
      this._name = name;
      this._document = document;
      this._address = address;
      this._items = items;
     
    }
  
    changeAddress(address: Address) {
        this._address = address;
    }

    addInvoiceItem(invoiceItem: InvoiceItems){
        this._items.push(invoiceItem);
    }

    get name() { return this._name; }

    get document() { return this._document; }

    get address() { return this._address; }

    get items() { return this._items; }

    total(): number { 
      let total = 0;
      this.items.forEach(item => {
        total += item.price
      });
      return total;
    }

  }