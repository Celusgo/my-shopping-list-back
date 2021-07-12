import connection from '../src/database.js';
import supertest from 'supertest';

beforeEach(async () => {
    await connection.query(`DELETE FROM text`);
  });

afterAll(() => {
  connection.end();
});

describe("POST /post", async () => {
    it("returns 201 for valid params", () => {
        const body = {
          text: 'texto'
        };
        
        const result = await supertest(app).post("/post").send(body);
        
        expect(result.status).toEqual(201);
    });
});