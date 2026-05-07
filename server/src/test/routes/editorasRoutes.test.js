import { describe, expect, it, jest } from '@jest/globals';
import app from '../../app';
import request from 'supertest';

let server;
let idResposta;
const nomeEditoraAtualizado = 'Editora Teste Atualizado';
const cidadeEditoraAtualizado = 'Rio de Janeiro Atualizado';
const emailEditoraAtualizado = 'emailAtualizado@email.com';

beforeEach(() => {
    const PORT = 3000;
    server = app.listen(PORT);
});

afterEach(() => {
    server.close();
});

describe('Testes das rotas de editoras', () => {

    describe('Requisições GET em /editoras', () => {
        it('Deve retornar uma lista de editoras', async () => {
            const resposta = await request(app)
                .get('/editoras')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(resposta.body[0].email).toEqual('e@e.com');
        });
    });

    describe('Requisições POST em /editoras', () => {
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

        it('Deve retornar erro ao tentar criar editora com body vazio', async () => {
            await request(app)
                .post('/editoras')
                .send({})
                .expect(400);
        });
    });

    describe('Requisições GET em /editoras/:id', () => {
        it('Deve retornar uma editora pelo id', async () => {
            await request(app)
                .get(`/editoras/${idResposta}`)
                .expect(200);
        });
    });

    describe('Requisições PUT em /editoras/:id', () => {
        it.each([
            ['nome', { nome: nomeEditoraAtualizado }],
            ['cidade', { cidade: cidadeEditoraAtualizado }],
            ['email', { email: emailEditoraAtualizado }]
        ])('Deve atualizar o campo %s de uma editora', async (chave, param) => {
            const requisicao = { request };
            const spy = jest.spyOn(requisicao, 'request');

            const resposta = await requisicao.request(app)
                .put(`/editoras/${idResposta}`)
                .send(param)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(spy).toHaveBeenCalled();
            expect(resposta.body.content[0].nome).toEqual(nomeEditoraAtualizado);
        });
    })

    describe('Requisições DELETE em /editoras/:id', () => {
        it('Deve deletar uma editora', async () => {
            await request(app)
                .delete(`/editoras/${idResposta}`)
                .expect(200);
        });
    });
});