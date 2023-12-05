import { Sequelize, UpdatedAt } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import productAdmFacadeFactory from "../factory/facade.factory";


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

    it('Deve criar um produto', async () => {

        const productFacade = productAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Gato tool",
            description: "Um Brinquedo para gato",
            purchasePrice: 10,
            stock: 10,
        }

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({where: {id: "1"}});

        expect(product).toBeDefined();
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);

    });

    it('Deve consultar o stock de um produto', async() => {
        const productFacade = productAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Dog tool",
            description: "Um Brinquedo para cachorros",
            purchasePrice: 12,
            stock: 2023,
        }
        await productFacade.addProduct(input);

        const DTO = {
            id: input.id
        }
        
        const stock = await productFacade.checkStock(DTO)
        expect(stock).toBeDefined()
        expect(stock.stock).toBe(input.stock)
    });
});