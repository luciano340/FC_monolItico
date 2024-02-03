import Id from "../../@shared/domain/entity/valeu-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";


export default class TransacationRepository implements PaymentGateway {
    async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.id.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updateAt: input.updatedAt,
        });
        

        return new Transaction({
            id: new Id(input.id.id),
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.createdAt,
        });

    }
}