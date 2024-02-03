import Id from "../../../@shared/domain/entity/valeu-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 99,
    orderId: "1"
})

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    };
};

describe('Processamento de pagament via Gateway', () => {

    it('Deve aprovar uma transação', async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            OrderId: "1",
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.status).toBe("approved");
        expect(result.createdAt ).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

});