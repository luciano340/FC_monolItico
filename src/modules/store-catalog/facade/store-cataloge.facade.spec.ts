import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogeFacadeFactory from "../factory/facade.factory";

describe("Teste fachada de product adm", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
            dialectOptions: { "requestTimeout": 300000}
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('Deve localizar um produto', async () => {
        const facade = StoreCatalogeFacadeFactory.create();
        await ProductModel.create({
            id: "1",
            name: "Teclado",
            description: "Teclado mecanico RGB",
            salesPrice: 680 
        })

        const result = await facade.find({id: "1"})

        expect(result.id).toBe("1");
        expect(result.name).toBe("Teclado");
        expect(result.description).toBe("Teclado mecanico RGB");
        expect(result.salesPrice).toBe(680);
    });
});