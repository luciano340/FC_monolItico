import UseCaseInterface from "../../@shared/domain/entity/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacedeOutputDto } from "./client-adm.facade.interface";


export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    addUsecase: UseCaseInterface;
}

export default class ClienteAdmFacade implements ClientAdmFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _addUsecase: UseCaseInterface;

    constructor(usecaseprops: UseCaseProps){
        this._addUsecase = usecaseprops.addUsecase;
        this._findUsecase = usecaseprops.findUsecase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacedeOutputDto> {
        return await this._findUsecase.execute(input);
    }
}