import Carrinho from "../carrinho.js";
import Item from "../item.js";

describe("Testes para classe Carrinho", () => {
    let carrinho;
    let item1;
    let item2;
    let valorFrete;
    let subtotal;
    let total;

    beforeAll(() => {
        item1 = new Item("Laranja", 3.5, 10);
        item2 = new Item("Banana", 2.0, 5);
        valorFrete = 10.0;
        subtotal = item1.pegaValorTotalItem() + item2.pegaValorTotalItem();
        total = subtotal + valorFrete;
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

    it("Deve adicionar frete ao carrinho", () => {
        carrinho.adicionaFrete(valorFrete);

        expect(carrinho.frete).toBe(valorFrete);
    });

    it("Deve calcular o total corretamente", () => {
        carrinho.adiciona(item1);
        carrinho.adiciona(item2);
        carrinho.adicionaFrete(valorFrete);
        const totalCalculado = carrinho.calculaTotal();

        expect(totalCalculado).toBeCloseTo(total);
    });

    it("Deve finalizar compra e retornar resumo com subtotal, frete e total", () => {
        carrinho.adiciona(item1);
        carrinho.adiciona(item2);
        carrinho.adicionaFrete(valorFrete);
        const resumo = carrinho.finalizaCompra();

        expect(resumo.subtotal).toBeCloseTo(subtotal);
        expect(resumo.frete).toBeCloseTo(valorFrete);
        expect(resumo.total).toBeCloseTo(total);
    });

    it("Deve lançar erro ao finalizar compra com carrinho vazio", () => {
        expect(() => carrinho.finalizaCompra()).toThrow("Carrinho de compras vazio");
    });
});