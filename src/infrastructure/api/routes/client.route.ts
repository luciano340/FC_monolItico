import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";


export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  
  try {

    /*const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUseCase,
      findUsecase: undefined,
    });*/

    const facade = ClientAdmFacadeFactory.create();

    const clientInputDto =  {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
      };

    await facade.add(clientInputDto);
    res.status(200).send();


    /*const useCase = new AddClientUseCase(new ClientRepository());
    const clientInputDto =  {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
      };

    const output = await useCase.execute(clientInputDto);
    res.send(output);*/
  } catch (err) {
    res.status(500).send(err);
  }
});
