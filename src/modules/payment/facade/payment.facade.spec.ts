import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransacationRepository from "../repository/transacation.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("Teste PaymentRepository", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
            dialectOptions: { "requestTimeout": 300000}
        });
        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('Deve criar uma transação', async() => {
            const repository = new TransacationRepository();
            const usecase = new ProcessPaymentUseCase(repository);
            const facade = new PaymentFacade(usecase);

        const input = {
            OrderId: "Order1",
            amount: 1000,
        };

        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toBe(input.OrderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
    });
});