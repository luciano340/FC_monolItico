import StoreCatalogeFacade from "../facade/store-cataloge.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecases";

export default class StoreCatalogeFacadeFactory {
    static create(): StoreCatalogeFacade {
        const productRepository = new ProductRepository();
        const findUseCase = new FindProductUsecase(productRepository);
        const findAllUseCase = new FindAllProductUsecase(productRepository);

        const facade = new StoreCatalogeFacade({
            findUsecase: findUseCase,
            findAllUseCase: findAllUseCase
        });
        return facade
    }
}