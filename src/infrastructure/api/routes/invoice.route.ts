import express, { Request, Response } from "express";

import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";


export const invoiceRoute = express.Router();


invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  try{
      const facade = InvoiceFacadeFactory.create();
      const input = {
        id: req.params.id
      }
      const invoice = await facade.find(input);
      res.status(200).send(invoice);
  } catch (err) {
    res.status(500).send(err);
  }
});


