import ClienteAdmFacade from "../facade/client-adm.facade";
import ClientReposiry from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/add-client/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {

    static create() {
        const repository = new ClientReposiry();
        const findUsecase = new FindClientUseCase(repository);
        const addusecase = new AddClientUseCase(repository);

        const facade = new ClienteAdmFacade({
            addUsecase: addusecase,
            findUsecase: findUsecase
        });

        return facade;
    }
}