export default interface FindClientUsecaseInputDto {
    id: string;
}

export interface FindClientUsecaseOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}