import AddProductUseCase from "./add-product.usecase";

const MockRepository = ()=> {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Testes unitários de adição de produtos", () => {

    it("Deve adicionar um produto", async () => {
        const productRepository = MockRepository();
        const usecase = new AddProductUseCase(productRepository);

        const input = {
            name: "Produto 1",
            description: "Esse é um teste unitário",
            purchasePrice: 100,
            stock: 10,
        }
        
        const result = await usecase.execute(input);

        expect(productRepository.add).toBeCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name)
        expect(result.description).toBe(input.description)
        expect(result.purchasePrice).toBe(input.purchasePrice)
        expect(result.stock).toBe(input.stock)
    });
})