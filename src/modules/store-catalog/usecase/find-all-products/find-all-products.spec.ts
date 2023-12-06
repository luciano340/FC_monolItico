import Id from "../../../@shared/domain/entity/valeu-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductUsecase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Symbicort",
    description: "Remédio para asma top de linha",
    salesPrice: 180,
})

const product2 = new Product({
    id: new Id("2"),
    name: "aerolin",
    description: "Remédio para asma para emergências",
    salesPrice: 20,
})

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
    }
}

describe("Teste para localizar produtos", () => {
    it("Deve localizar todos os produtos", async() => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductUsecase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id.id).toBe("1");
        expect(result.products[0].name).toBe("Symbicort");
        expect(result.products[0].description).toBe("Remédio para asma top de linha");
        expect(result.products[0].salesPrice).toBe(180);
        expect(result.products[1].id.id).toBe("2");
        expect(result.products[1].name).toBe("aerolin");
        expect(result.products[1].description).toBe("Remédio para asma para emergências");
        expect(result.products[1].salesPrice).toBe(20);
    })
})