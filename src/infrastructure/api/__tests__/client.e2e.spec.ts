import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    it("should create a client", async () => {
      
      const response = await request(app)
        .post("/clients")
        .send({
            name: "Client 1",
            email: "client@example.com",
            address: "Street 1",
          });
  
      expect(response.status).toBe(200);
      /*expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe("Client 1");
  
      expect(response.body.email).toBe("client@example.com");
      expect(response.body.address).toBe("Street 1");*/
  
    });


})