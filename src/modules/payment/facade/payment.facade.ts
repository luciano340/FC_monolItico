import UseCaseInterface from "../../@shared/domain/entity/usecase/use-case.interface";
import PaymentFacadeInterface, {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private processPaymentUseCase: UseCaseInterface) {}
    process(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }
}