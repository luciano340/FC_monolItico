export interface CheckStockInputDto {
    id: string;
}

export interface CheckStockOutputDto {
    id: string;
    name: string;
    stock: number;
}