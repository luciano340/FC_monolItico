export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacedeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacedeOutputDto>;
}