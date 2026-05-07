import { expect, it } from '@jest/globals';
import app from '../../app';
import request from 'supertest';

let server;
let idResposta;

beforeEach(() => {
    const PORT = 3000;
    server = app.listen(PORT);
});

afterEach(() => {
    server.close();
});

describe('Testes das rotas de editoras', () => {
    it('Deve retornar uma lista de editoras', async () => {
        const resposta = await request(app)
            .get('/editoras')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body[0].email).toEqual('e@e.com');
    });

    it('Deve criar uma editora', async () => {
        const resposta = await request(app)
            .post('/editoras')
            .send({
                nome: 'Editora Teste',
                cidade: 'São Paulo',
                email: 'email@teste.com',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);

        idResposta = resposta.body.content.id;
    });

    it('Deve deletar uma editora', async () => {
        await request(app)
            .delete(`/editoras/${idResposta}`)
            .expect(200);
    });

    it('Deve retornar uma editora pelo id', async () => {
        await request(app)
            .get(`/editoras/${idResposta}`)
            .expect(200);
    });
});