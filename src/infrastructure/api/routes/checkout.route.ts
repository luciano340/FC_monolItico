import express, { Request, Response } from "express";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";


export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  
  try {

    const facade = PaymentFacadeFactory.create();

    const paymentDto =  {
      OrderId: req.body.orderId,
      amount: req.body.amount,
      };

    const output = await facade.process(paymentDto);
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
