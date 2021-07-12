import connection from '../src/database.js';
import supertest from 'supertest';
import app from '../src/app.js';
import database from '../src/database.js';

beforeEach(async () => {
    await connection.query(`DELETE FROM text`);
  });

afterAll(() => {
  database.end();
});

describe("POST /post", () => {
    it("returns 400 for invalid params", async () => {
        const body = {
          text: ''
        };
        
        const result = await supertest(app).post("/post").send(body);
        
        expect(result.status).toEqual(400);
    });

    it("returns 201 for valid params", async () => {
        const body = {
          text: 'validtext'
        };
        
        const result = await supertest(app).post("/post").send(body);
        
        expect(result.status).toEqual(201);
    });

});