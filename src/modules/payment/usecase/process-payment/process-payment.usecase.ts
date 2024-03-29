import UseCaseInterface from "../../../@shared/domain/entity/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(private transactionRepository: PaymentGateway) {}

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.OrderId,
        });

        transaction.process();
        const persistTransaction = await this.transactionRepository.save(transaction);
        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        }
    }
}