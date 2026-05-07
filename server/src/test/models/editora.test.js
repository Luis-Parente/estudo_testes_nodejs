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

    it('Deve criar uma editora no banco de dados', async () => {
        const editora = new Editora(objetoEditora);

        const resultado = await editora.salvar();
        const retornado = await Editora.pegarPeloId(resultado.id);

        expect(retornado).toEqual(expect.objectContaining({
            id: expect.any(Number),
            ...objetoEditora,
            created_at: expect.any(String),
            updated_at: expect.any(String),
        }));
    });
});