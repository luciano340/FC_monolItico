import { Sequelize, UpdatedAt } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/entity/valeu-object/id.value-object";
import ProductRepository from "./product.repository";

describe("Teste ProductRepository", () => {

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

    it("Deve criar um produto!", async () => {

        const props = {
            id: new Id("1"),
            name: "GPU",
            description: "GPU Muito louco",
            purchasePrice: 3000,
            stock: 10,
        }

        const product = new Product(props);
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({
            where: {id: props.id.id},
        })
        
        expect(props.id.id).toEqual(productDb.id);
        expect(props.name).toEqual(productDb.name);
        expect(props.description).toEqual(productDb.description);
        expect(props.purchasePrice).toEqual(productDb.purchasePrice);
        expect(props.stock).toEqual(productDb.stock);
    });

    it("Deve localizar um produto!", async () => {
        const productRepository = new ProductRepository();
        ProductModel.create({
            id: "1",
            name: "Vaca",
            description: "Uma vaca para produzir leite.",
            purchasePrice: 2000,
            stock: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Vaca");
        expect(product.description).toEqual("Uma vaca para produzir leite.");
        expect(product.purchasePrice).toEqual(2000);
        expect(product.stock).toEqual(1);
    });
    
})