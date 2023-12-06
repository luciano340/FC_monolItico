import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Teste de repositório de Produto", () => {
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

    it('Deve localizar todos os produtos!', async () => {
        await ProductModel.create({
            id: "1",
            name: "Creatina",
            description: "Creatina creapure 300g",
            salesPrice: 90
        });

        await ProductModel.create({
            id: "2",
            name: "pre-treino",
            description: "pre-treino 300g",
            salesPrice: 120
        });

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2)
        expect(products[0].id.id).toBe("1")
        expect(products[0].name).toBe("Creatina")
        expect(products[0].description).toBe("Creatina creapure 300g")
        expect(products[0].salesPrice).toBe(90)
        expect(products[1].id.id).toBe("2")
        expect(products[1].name).toBe("pre-treino")
        expect(products[1].description).toBe("pre-treino 300g")
        expect(products[1].salesPrice).toBe(120)
    });

    it('Deve localizar apenas um produto', async () =>{
        await ProductModel.create({
            id: "1",
            name: "Whey",
            description: "Whey 100%",
            salesPrice: 99
        });

        const productRepository = new ProductRepository();
        const product = await productRepository.find("1");

        expect(product.id.id).toBe("1");
        expect(product.name).toBe("Whey");
        expect(product.description).toBe("Whey 100%");
        expect(product.salesPrice).toBe(99);

    });
});