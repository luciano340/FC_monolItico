export interface ProcessPaymentInputDto { 
    OrderId: string;
    amount: number;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    amount: number;
    orderId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface PaymentFacadeInterface {
    process(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto>;
}