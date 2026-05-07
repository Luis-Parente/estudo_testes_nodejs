import { describe, it, expect, jest } from '@jest/globals';
import Editora from "../../models/editora";

describe('Testes da model Editora', () => {
    const objetoEditora = {
        nome: 'Editora Teste',
        cidade: 'São Paulo',
        email: 'teste@email.com',
    };

    it('Deve instanciar uma editora', () => {
        const editora = new Editora(objetoEditora);

        expect(editora).toEqual(expect.objectContaining(objetoEditora));
    });

    it('Deve criar uma editora no banco de dados mockado', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar = jest.fn().mockReturnValue({
            id: 1,
            ...objetoEditora,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });

        const resultado = editora.salvar();

        expect(resultado).toEqual(expect.objectContaining({
            id: expect.any(Number),
            ...objetoEditora,
            created_at: expect.any(String),
            updated_at: expect.any(String),
        }));
    });
});