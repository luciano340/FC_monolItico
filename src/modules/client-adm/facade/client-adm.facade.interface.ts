import Address from "../../invoice/value-object/address";

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
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
    street: string;
    number: number;
    complement: string; 
    city: string;
    state: string; 
    zipCode: string; 
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacedeOutputDto>;
}