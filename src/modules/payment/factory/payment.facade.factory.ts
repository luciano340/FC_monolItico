import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TransacationRepository from "../repository/transacation.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransacationRepository();
        const usecase = new ProcessPaymentUseCase(repository);
        const facade = new PaymentFacade(usecase);
        return facade;
    }
}