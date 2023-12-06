import FindAllProductUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecases";
import StoreCatalogeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-cataloge.facade.interface";

export interface UseCaseProps {
    findUsecase: FindProductUsecase;
    findAllUseCase: FindAllProductUsecase;
}

export default class StoreCatalogeFacade implements StoreCatalogeInterface {
    private _findUseCase: FindProductUsecase;
    private _findAllUseCase: FindAllProductUsecase;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUsecase;
        this._findAllUseCase = props.findAllUseCase
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(id);

    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute();
    }
}