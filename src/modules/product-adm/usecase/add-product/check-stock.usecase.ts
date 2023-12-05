import Id from "../../../@shared/domain/entity/valeu-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock-product.dto";

export default class CheckStockUseCase {

    private _productRepository: ProductGateway;

    constructor(_productRepository: ProductGateway) {
        this._productRepository = _productRepository;
    }
    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {

        const product = await this._productRepository.find(input.id);
        
        return {
            id: product.id.id,
            name: product.name,
            stock: product.stock,
        };
    }
}