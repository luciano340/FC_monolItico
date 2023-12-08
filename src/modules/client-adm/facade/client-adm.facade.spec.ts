import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientReposiry from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClienteAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Teste de facade para cliente adm", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
            dialectOptions: { "requestTimeout": 300000}
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Deve criar um cliente", async() => {
        const facade = ClientAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Luciano",
            email: "x@com.br",
            address: "Rua"
        }

        await facade.add(input)

        const result = await ClientModel.findOne({where: {id: "1"}});

        expect(result).toBeDefined();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    });

    it('Deve localizar um cliente', async() => {
        const facade = ClientAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Luciano",
            email: "x@com.br",
            address: "Rua"
        }

        await facade.add(input)

        const client = await facade.find({id: "1"});

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);

    })
});
