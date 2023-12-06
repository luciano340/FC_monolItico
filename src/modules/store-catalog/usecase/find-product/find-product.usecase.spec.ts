import Id from "../../../@shared/domain/entity/valeu-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./find-product.usecases";

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
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe('Teste de caso de uso de localização única de produto', () => {
    it('Deve localizar um produto', async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input);
        
        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Symbicort");
        expect(result.description).toBe("Remédio para asma top de linha");
        expect(result.salesPrice).toBe(180);
    })
})