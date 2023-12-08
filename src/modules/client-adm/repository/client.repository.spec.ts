import { Sequelize, UpdatedAt } from "sequelize-typescript";
import ClientModel from "./client.model";
import ClientReposiry from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";
import { response } from "express";

describe("Teste ClientRepository", () => {

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

    it('Deve criar um client', async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Taynara",
            email: "t@t.com.br",
            address: "rua publica, 650"
        });

        const repository = new ClientReposiry();
        await repository.add(client);

        const result = await ClientModel.findOne({where: {id: "1"}});

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);

    });

    it('Deve localizar um cliente', async() => {
        const client = await ClientModel.create({
            id: "1",
            name: "Luciano",
            email: "abc@vbn.com.br",
            address: "rua publica, 130",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repositoty = new ClientReposiry();
        const result = await repositoty.find(client.id);

        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);

    });
});