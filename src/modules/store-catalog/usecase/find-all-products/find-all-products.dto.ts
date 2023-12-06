export interface FindAllProducutsDTO {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}