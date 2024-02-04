import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";


export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  try {
    const facade = ProductAdmFacadeFactory.create();
    const productDto =  {
        name: req.body.name,
        description: req.body.description,
        purchasePrice: req.body.purchasePrice,
        stock: req.body.stock,
      };

    await facade.addProduct(productDto);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
