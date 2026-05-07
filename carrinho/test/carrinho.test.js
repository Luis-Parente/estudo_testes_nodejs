import Carrinho from "../carrinho.js";
import Item from "../item.js";

describe("Testes para classe Carrinho", () => {
    let carrinho;
    let item1;
    let item2;

    beforeAll(() => {
        item1 = new Item("Laranja", 3.5, 10);
        item2 = new Item("Banana", 2.0, 5);
    });

    beforeEach(() => {
        carrinho = new Carrinho();
    });

    it("Deve iniciar vazio", () => {
        expect(carrinho.itens).toEqual([]);
        expect(carrinho.subtotal).toBeNull();
        expect(carrinho.frete).toBeNull();
        expect(carrinho.total).toBeNull();
    });

    it("Deve adicionar itens ao carrinho ", () => {
        carrinho.adiciona(item1);
        carrinho.adiciona(item2);

        expect(carrinho.itens).toContain(item1);
        expect(carrinho.itens).toContain(item2);
    });
});