import { Sequelize, UpdatedAt } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";
import TransacationRepository from "./transacation.repository";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

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

    it('Deve salvar uma transação', async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        transaction.approve();

        const facade = PaymentFacadeFactory.create();

        const repository = new TransacationRepository();
        const result = await repository.save(transaction);

    
        expect(result.id).toBeDefined();
        expect(result.id.id).toBe(transaction.id.id);
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.status).toBe("approved");
    });

});