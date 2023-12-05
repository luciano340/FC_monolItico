import productAdmFacade from "../facade/product-admin.facede";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/add-product/check-stock.usecase";

export default class productAdmFacadeFactory {
    static create(){
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockUseCase = new CheckStockUseCase(productRepository);
        const productFacade = new productAdmFacade({
            addUseCase: addProductUseCase,
            stockuseCase: checkStockUseCase,
        });
        return productFacade;
    }
 
}