import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import Address from '../../../invoice/value-object/address';
import StoreCatalogeInterface from '../../../store-catalog/facade/store-cataloge.facade.interface';
import UseCaseInterface from '../../../@shared/domain/entity/usecase/use-case.interface';
import Id from '../../../@shared/domain/entity/valeu-object/id.value-object';

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogeInterface;
    private _repository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;

    constructor(
        clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogeInterface,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
        ){
        this._clientFacade = clientFacade
        this._productFacade = productFacade
        this._catalogFacade = catalogFacade
        this._repository = repository
        this._invoiceFacade = invoiceFacade
        this._paymentFacade = paymentFacade
    }
    
    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {        
        const client = await this._clientFacade.find({ id: input.clientId })

        if (!client) throw new Error("Client not found")
        
        await this.validateProducts(input);
        
        const products = await Promise.all(input.products.map((p) => this.getProduct(p.productId))
        );

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
                client.street,
                client.number,
                client.complement,
                client.city,
                client.state,
                client.zipCode
            )
        })

        const order = new Order({
            client: myClient,
            products: products
        });

      
        const payment = await this._paymentFacade.process({
            OrderId: order.id.id,
            amount: order.total
        });

        const invoice = payment.status === "approved" ?
            await this._invoiceFacade.generate({
                name: myClient.name,
                document: myClient.document,
                street: myClient.address.street,
                number: myClient.address.number,
                complement: myClient.address.complement,
                city: myClient.address.city,
                state: myClient.address.state,
                zipCode: myClient.address.zipCode,
                items: products.map((p) => {
                    return {
                        id: p.id.id,
                        name: p.name,
                        price: p.salesPrice
                    };
                })
            }) : null;

        payment.status === "approved" && order.approved();
        this._repository.addOrder(order);

        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
                return {
                    productId: p.id.id
                }
            })
        }
    }    

    private async getProduct(productId: string): Promise<Product>{
        const product = await this._catalogFacade.find({ id: productId })

        if (!product) throw new Error("Product not found")

        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }

        return new Product(productProps)
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void>{
        if (input.products.length === 0) throw new Error("No products selected")

        for(const p of input.products){
            const product = await this._productFacade.checkStock({
                id: p.productId
            })

            if (product.stock <= 0) throw new Error(`Product ${product.id} is not available in stock`)
        }
    }
}