import UseCaseInterface from "../../@shared/domain/entity/usecase/use-case.interface";
import productAdmFacadeInterface, { AddProductFacedeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockuseCase: UseCaseInterface;
}

export default class productAdmFacade implements productAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._addUseCase = usecasesProps.addUseCase;
        this._checkStockUseCase = usecasesProps.stockuseCase;
    }
    addProduct(input: AddProductFacedeInputDTO): Promise<void> {
        return this._addUseCase.execute(input); 
    }

    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return this._checkStockUseCase.execute(input);
    }
}