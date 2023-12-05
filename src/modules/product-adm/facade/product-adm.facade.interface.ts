export interface AddProductFacedeInputDTO{
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDTO{
    id: string;
}

export interface CheckStockFacadeOutputDTO{
    id: string;
    stock: number;
}

export default interface productAdmFacadeInterface {
    addProduct(input: AddProductFacedeInputDTO): Promise<void>;
    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO>;
}